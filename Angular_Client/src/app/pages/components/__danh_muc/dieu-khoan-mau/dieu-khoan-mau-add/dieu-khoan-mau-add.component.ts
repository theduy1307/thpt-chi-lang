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
  selector: "dieu-khoan-mau-add",
  templateUrl: "dieu-khoan-mau-add.component.html",
})
export class DieuKhoanMauAddComponent implements OnInit, OnDestroy {
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
  }
  loadForm() {
    this.formGroup = this.fb.group({
      nhomHopDong: ["", Validators.compose([Validators.required])],
      tenDieuKhoan: ["", Validators.compose([Validators.required])],
      chiTietDieuKhoan: ["", Validators.compose([Validators.required])],
      ghiChu: [""],
    });
  }
  setValueRule(event: any) {
    this.formGroup.controls["nhomHopDong"].setValue(`${event.value}`);
    console.log(this.formGroup.controls["nhomHopDong"].value);
  }
  prepareData(): IMauDieuKhoan {
    let result: IMauDieuKhoan = {
      //empty data
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
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
  create() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = undefined;
    modalRef.componentInstance.title = "L??u th??ng tin";
    modalRef.componentInstance.message = "X??c nh???n l??u th??ng tin ??i???u kho???n m???u?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "X??c nh???n";
    modalRef.componentInstance.cancelButtonMsg = "????ng";
    modalRef.result.then(
      (result) => {
        if (result) {
          let dataItems = this.prepareData();
          const sbCreate = this.services
            .create(dataItems)
            .pipe(
              tap(() => {
                this.modal.close();
              }),
              catchError((errorMessage) => {
                this.modal.dismiss(errorMessage);
                return of(this.data);
              })
            )
            .subscribe((res: any) => {
              if (res && res.status == 1) {
                this.data = res.data;
                this.layoutUtilsService.openSnackBar(res.error.message, "????ng");
              } else {
                this.layoutUtilsService.openSnackBar(res.error.message, "????ng");
              }
            });
          this.subscriptions.push(sbCreate);
        }
      },
      () => {}
    );
  }
  saveAndCreate() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = undefined;
    modalRef.componentInstance.title = "L??u th??ng tin";
    modalRef.componentInstance.message = "X??c nh???n l??u th??ng tin ??i???u kho???n m???u?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "X??c nh???n";
    modalRef.componentInstance.cancelButtonMsg = "????ng";
    modalRef.result.then(
      (result) => {
        if (result) {
          let dataItems = this.prepareData();
          const sbCreate = this.services
            .create(dataItems)
            .pipe(
              tap(() => {
                this.formGroup.reset();
              }),
              catchError((errorMessage) => {
                this.modal.dismiss(errorMessage);
                return of(this.data);
              })
            )
            .subscribe((res: any) => {
              if (res && res.status == 1) {
                this.data = res.data;
                this.layoutUtilsService.openSnackBar(res.error.message, "????ng");
              } else {
                this.layoutUtilsService.openSnackBar("Th??m m???i th???t b???i, vui l??ng nh???p l???i th??ng tin", "????ng");
              }
            });
          this.subscriptions.push(sbCreate);
        }
      },
      () => {}
    );
  }
  close() {
    const formValue = this.formGroup.value;
    if (
      formValue.nhomHopDong.length === 0 &&
      formValue.tenDieuKhoan.length === 0 &&
      formValue.chiTietDieuKhoan.length === 0 &&
      formValue.ghiChu.length === 0
    ) {
      this.modal.close();
    } else {
      const modalRef = this.modalService.open(DeleteModalComponent);
      modalRef.componentInstance.id = undefined;
      modalRef.componentInstance.title = "C???nh b??o";
      modalRef.componentInstance.message = "Nh???ng th??ng tin ???? nh???p s??? kh??ng ???????c l??u. B???n c?? mu???n ti???p t???c ?";
      modalRef.componentInstance.loadingMsg = "";
      modalRef.componentInstance.submitButtonMsg = "X??c nh???n";
      modalRef.componentInstance.cancelButtonMsg = "????ng";
      modalRef.result.then(
        (result) => {
          if (result) {
            this.modal.close();
          }
        },
        () => {}
      );
    }
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
