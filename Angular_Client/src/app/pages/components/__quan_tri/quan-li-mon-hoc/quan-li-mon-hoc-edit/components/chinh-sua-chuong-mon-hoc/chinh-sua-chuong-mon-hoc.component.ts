import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DungChungService } from 'src/app/pages/components/_common/_services/dung-chung.service';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { EMPTY_DATA_CHUONG, EMPTY_DATA_CHUONGMONHOC, IChuongMonHoc } from '../../../quan-li-mon-hoc-model/mon-hoc.model';
import { MonHocService } from '../../../quan-li-mon-hoc-service/quan-li-mon-hoc.service';

@Component({
  selector: 'app-chinh-sua-chuong-mon-hoc',
  templateUrl: './chinh-sua-chuong-mon-hoc.component.html',
  styleUrls: ['./chinh-sua-chuong-mon-hoc.component.scss']
})
export class ChinhSuaChuongMonHocComponent implements OnInit {
  @Input() name: string;
  @Input() id:number
  formGroup: FormGroup;

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
    this.loadForm()
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: [`${this.name}`, Validators.compose([Validators.required]) ]
    })
  }
  close() {
    this.modal.dismiss()
  }
  save(){
    const data:IChuongMonHoc = EMPTY_DATA_CHUONG
    data.status = 1;
    data.Id = this.id;
    data.TenChuong = this.formGroup.controls["name"].value;
    data.NgayTao= moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS")
    data.NgaySua= moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS")
    const sbCreate = this.services
      .updateChuong(data)
      .pipe(
        tap(() => {
          this.modal.close(data);
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(data);
        })
      )
      .subscribe((res: any) => {
        if (res && res.status == 1) {
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        }
      });
    this.subscriptions.push(sbCreate);
  }
}
