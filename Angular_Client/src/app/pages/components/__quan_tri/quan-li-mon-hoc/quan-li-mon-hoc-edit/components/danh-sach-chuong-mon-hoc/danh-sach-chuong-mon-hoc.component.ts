import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DeleteModalComponent } from 'src/app/pages/components/_common/_components/delete-modal/delete-modal.component';
import { DungChungService } from 'src/app/pages/components/_common/_services/dung-chung.service';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { IChuongMonHoc } from '../../../quan-li-mon-hoc-model/mon-hoc.model';
import { MonHocService } from '../../../quan-li-mon-hoc-service/quan-li-mon-hoc.service';
import { ChinhSuaChuongMonHocComponent } from '../chinh-sua-chuong-mon-hoc/chinh-sua-chuong-mon-hoc.component';
import { DanhSachBaiHocModifyComponent } from '../danh-sach-bai-hoc-modify/danh-sach-bai-hoc-modify.component';

@Component({
  selector: 'app-danh-sach-chuong-mon-hoc',
  templateUrl: './danh-sach-chuong-mon-hoc.component.html',
  styleUrls: ['./danh-sach-chuong-mon-hoc.component.scss']
})
export class DanhSachChuongMonHocComponent implements OnInit {
  @Input() danhSachChuong: IChuongMonHoc[]
  @Input() lop:number

  @Output() editNameEvent = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  private subscriptions: Subscription[] = [];
  
  chuongMonHocForm = new FormArray([]);
  
  constructor(
    private services: MonHocService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.danhSachChuong = [...this.danhSachChuong.filter(x=>x.Lop == this.lop)]
    this.loadData()
  }

  loadData() { }

  detail(name:string, id:number) {
    const modalRef = this.modalService.open(ChinhSuaChuongMonHocComponent, {
      size: "lg",
      centered: true
    });
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      (data) => {
        if(data.status)
        {
          const item = this.danhSachChuong.find(x=>x.Id == id)
          item.TenChuong = data.TenChuong
          this.sendResultChange()
        }
      },
      () => {}
    );
  }
  sendResultChange() {
    this.editNameEvent.emit(this.danhSachChuong)
  }
  subject(id:number) {
    const modalRef = this.modalService.open(DanhSachBaiHocModifyComponent, {
      size: "xl",
      centered: true
    });
    modalRef.componentInstance.id = id;
  }
  delete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = "Xóa dữ liệu";
    modalRef.componentInstance.message = "Tất cả các câu hỏi trong chương này sẽ bị xóa tất cả. Bạn có chắc muốn chương này? ";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Xác nhận";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
    modalRef.result.then(
      (result) => {
        if (result) {
          const sb = this.services
            .delete(id)
            .pipe(
              tap(() => {
                const index = this.danhSachChuong.findIndex(x=>x.Id == id)
                this.danhSachChuong.splice(index, 1)
              }),
              catchError((err) => {
                return of(undefined);
              })
            )
            .subscribe((res) => {
              if (res && res.status == 1) {
                this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
                this.deleteItem.emit(this.danhSachChuong)
              } else {
                this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
                this.deleteItem.emit(this.danhSachChuong)
              }
            });
          this.subscriptions.push(sb);
        }
      },
      () => {}
    );
  }
}
