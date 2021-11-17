import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { IMauDieuKhoan } from "../dieu-khoan-mau-model/dieu-khoan-mau.model";
import { DieuKhoanMauService } from "../dieu-khoan-mau-service/dieu-khoan-mau.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from "@angular/router";
@Component({
  selector: "dieu-khoan-mau-detail",
  templateUrl: "dieu-khoan-mau-detail.component.html",
})
export class DieuKhoanMauDetailComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IMauDieuKhoan;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  public Editor = ClassicEditor;
  /* ------------------------------------------------------------------*/

  constructor(
    private services: DieuKhoanMauService,
    private commonService: DungChungService,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  initData(): IMauDieuKhoan {
    const EMPTY_Data: IMauDieuKhoan = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenDieuKhoan: "",
      ChiTietDieuKhoan: "",
      NguoiTao: undefined,
      TenNguoiTao: "",
      NgayTao: "",
      NhomHopDong: undefined,
      GhiChu: "",
      NguoiSua: undefined,
      TenNguoiSua: "",
      NgaySua: "",
      IsDisable: undefined,
    };
    return EMPTY_Data;
  }
  loadData() {
    this.data = this.initData();
    this.loadForm();
    const sb = this.services
      .getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.initData());
        })
      )
      .subscribe((result: IMauDieuKhoan) => {
        this.data = result.data;
        console.log(this.data);
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      nhomHopDong: [this.data.NhomHopDong + "", Validators.compose([Validators.required])],
      tenDieuKhoan: [this.data.TenDieuKhoan, Validators.compose([Validators.required])],
      chiTietDieuKhoan: [this.data.ChiTietDieuKhoan, Validators.compose([Validators.required])],
      ghiChu: [this.data.GhiChu],
    });
    this.formGroup.disable();
  }
  setValueRule(event: any) {
    this.formGroup.controls["nhomHopDong"].setValue(`${event.value}`);
    console.log(this.formGroup.controls["nhomHopDong"].value);
  }
  save() {
    console.log();
    console.log();
    console.log();
    console.log();
  }
  prepareData(): IMauDieuKhoan {
    let result: IMauDieuKhoan = {
      //empty data
      id: undefined,
      data: undefined,
      status: undefined,
      Id: this.data.Id,
      TenDieuKhoan: this.formGroup.controls["tenDieuKhoan"].value,
      ChiTietDieuKhoan: this.formGroup.controls["chiTietDieuKhoan"].value,
      NguoiTao: 10174,
      TenNguoiTao: undefined,
      NgayTao: undefined,
      NhomHopDong: parseInt(this.formGroup.controls["nhomHopDong"].value),
      GhiChu: this.formGroup.controls["ghiChu"].value,
      NguoiSua: undefined,
      TenNguoiSua: undefined,
      NgaySua: undefined,
      IsDisable: false,
    };
    return result;
  }
  edit() {
    let newData = this.prepareData();
    const sbUpdate = this.services
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

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
