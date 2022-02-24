import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { IMauDieuKhoan } from "../dieu-khoan-mau-model/dieu-khoan-mau.model";
import { DieuKhoanMauService } from "../dieu-khoan-mau-service/dieu-khoan-mau.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from "@angular/router";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
@Component({
  selector: "dieu-khoan-mau-edit",
  templateUrl: "dieu-khoan-mau-edit.component.html",
})
export class DieuKhoanMauEditComponent implements OnInit, OnDestroy {
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
    private modalService: NgbModal,
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
      NhomHopDong: Number(this.formGroup.controls["nhomHopDong"].value),
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
  close() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = undefined;
    modalRef.componentInstance.title = "Cảnh báo";
    modalRef.componentInstance.message = "Những thông tin thay đổi sẽ không được lưu. Bạn có muốn tiếp tục ?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Xác nhận";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
    modalRef.result.then(
      (result) => {
        if (result) {
          this.modal.close();
        }
      },
      () => {}
    );
  }
  /* -----------------------------------------------------------------------*/

  /* ----------------------------- Inject Event Data ---------------------------
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
