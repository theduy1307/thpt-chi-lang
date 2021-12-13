import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, ReplaySubject, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { EMPTY_DATA, IBaiKiemTra_Group } from '../bai-kiem-tra-model/bai-kiem-tra.model';
import { BaiKiemTraService } from '../bai-kiem-tra-service/bai-kiem-tra.service';

@Component({
  selector: 'app-bai-kiem-tra-edit',
  templateUrl: './bai-kiem-tra-edit.component.html',
  styleUrls: ['./bai-kiem-tra-edit.component.scss']
})
export class BaiKiemTraEditComponent implements OnInit {
/* ------------------------ Inject Event Data -----------------------*/
@Input() id: number;
/* ------------------------------------------------------------------*/

/* --------------------------- Loading.... --------------------------*/
isLoading$;
data: IBaiKiemTra_Group;
formGroup: FormGroup;

private subscriptions: Subscription[] = [];
/* ------------------------------------------------------------------*/

constructor(
  private modifyService: BaiKiemTraService,
  private commonService: DungChungService,
  private layoutUtilsService: LayoutUtilsService,
  private fb: FormBuilder,
  public modal: NgbActiveModal,
  private changeDetectorRefs: ChangeDetectorRef
) {}

/*---------------------------- LOAD DATA --------------------------------*/
ngOnInit(): void {
  this.isLoading$ = this.modifyService.isLoading$;
  this.loadData();
}
ngOnDestroy(): void {
  this.subscriptions.forEach((sb) => sb.unsubscribe());
}
loadData() {
  if (!this.id) {
    this.data = EMPTY_DATA;
    this.loadForm();
  } else {
    const sb = this.modifyService
      .getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_DATA);
        })
      )
      .subscribe((result: IBaiKiemTra_Group) => {
        this.data = result.data;
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }
}
loadForm() {

  this.formGroup = this.fb.group({
    tenBaiKiemTra: [this.data.TenBaiKiemTra, Validators.compose([Validators.required])],
    thoiGianLamBai: [this.data.ThoiGianLamBai, Validators.compose([Validators.required])],
    namHoc: [this.data.NamHoc, Validators.compose([Validators.required])],
  });
}


/* -----------------------------------------------------------------------*/

/*------------------------- CÁC THAO TÁC TRÊN FORM ----------------------*/
private prepareData():IBaiKiemTra_Group {
  let newData:IBaiKiemTra_Group = {...this.data}
  newData.TenBaiKiemTra = this.formGroup.controls['tenBaiKiemTra'].value;
  newData.ThoiGianLamBai = this.formGroup.controls['thoiGianLamBai'].value;
  newData.NamHoc = this.formGroup.controls['namHoc'].value;
  return newData;
}

edit() {
  let newData = this.prepareData()
  const sbUpdate = this.modifyService
    .update(newData)
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
        this.layoutUtilsService.openSnackBar("Chỉnh sửa thành công", "Đóng");
      } else {
        this.layoutUtilsService.openSnackBar("Chỉnh sửa thất bại, vui lòng kiểm tra thông tin", "Đóng");
      }
    });
  this.subscriptions.push(sbUpdate);
}
/* -----------------------------------------------------------------------*/

/*
----------------------------- Inject Event Data ---------------------------
@Type:
  0: isControlValid()
  1: isControlInvalid()
  2: isControlTouched()
  3: controlHasError()*/

ValidateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = "") {
  return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
}

/* -----------------------------------------------------------------------*/
}
