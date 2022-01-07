import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { DungChungService } from 'src/app/pages/components/_common/_services/dung-chung.service';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { EMPTY_DATA_BAIHOC, EMPTY_DATA_CHUONG, EMPTY_DATA_CHUONGMONHOC, IBaiHoc, IChuongMonHoc } from '../../../quan-li-mon-hoc-model/mon-hoc.model';
import { MonHocService } from '../../../quan-li-mon-hoc-service/quan-li-mon-hoc.service';

@Component({
  selector: 'app-danh-sach-bai-hoc-modify',
  templateUrl: './danh-sach-bai-hoc-modify.component.html',
  styleUrls: ['./danh-sach-bai-hoc-modify.component.scss']
})
export class DanhSachBaiHocModifyComponent implements OnInit {
  @Input() id:number;
  @Input() listBaiHoc:any

  data:IBaiHoc[] = [];

  formGroup: FormGroup
  formBaiHoc: FormArray

  private subscriptions: Subscription[] = [];

  constructor(
    private services: MonHocService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData():void {
    this.loadForm()
    const sb = this.services
    .getBaiHoc(this.id)
    .pipe(
      first(),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(EMPTY_DATA_BAIHOC);
      })
    )
    .subscribe((result: IBaiHoc) => {
      this.data = [...result.data];
      this.loadForm();
    });
  this.subscriptions.push(sb);
  }

  initialData() {
    const emtpy_data:IBaiHoc = {...EMPTY_DATA_BAIHOC}
    emtpy_data.IdChuong = this.id
    emtpy_data.NguoiTao = 0;
    emtpy_data.NguoiSua = 0
    return emtpy_data;
  }
  
  loadForm() {
    this.formBaiHoc = this.fb.array([])
    if(this.data.length != 0)
    {
      this.data.forEach(item=>{
        const group = this.fb.group({
          id: [item.Id],
          idChuong: [item.IdChuong],
          tenBaiHoc: [item.TenBaiHoc],
          hocKy: [item.HocKy+'']
        })
        this.formBaiHoc.push(group)
      })  
    } 
    else {
      this.addItem()
    }     
  }

  addItem() {
    const group = this.fb.group({
      id: [0],
      idChuong: [this.id],
      tenBaiHoc: [""],
      hocKy: ["1"]
    })
    this.formBaiHoc.push(group)
  }

  create() {
    const data_post:IBaiHoc[] = this.prepareData()
    const sbUpdate = this.services
      .updateBaiHoc(data_post)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res) => {
        if (res && res.status == 1) {
          this.data = res.data;
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        }
      });
    this.subscriptions.push(sbUpdate);
  }
  prepareData() {
    let array:any[] = this.formBaiHoc.value
    let list:any[] = []
    array.forEach(data=> {
      let temp:IBaiHoc = this.initialData()
      temp.Id = data.id
      temp.TenBaiHoc = data.tenBaiHoc
      temp.HocKy = data.hocKy      
      list.push(temp)
    })
    return list;
  }
  deleteBaiHoc(index) {
    this.formBaiHoc.removeAt(index)
  }
}
