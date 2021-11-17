import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { IHanMucChietKhau } from "../han-muc-chiet-khau-model/han-muc-chiet-khau.model";
import { HanMucChietKhauService } from "../han-muc-chiet-khau-service/han-muc-chiet-khau.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from "@angular/router";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
@Component({
  selector: "han-muc-chiet-khau-edit",
  templateUrl: "han-muc-chiet-khau-edit.component.html",
})
export class HanMucChietKhauEditComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IHanMucChietKhau;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  public Editor = ClassicEditor;
  /* ------------------------------------------------------------------*/

  constructor(
    private services: HanMucChietKhauService,
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
  initData(): IHanMucChietKhau {
    const EMPTY_Data: IHanMucChietKhau = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenHanMuc: "",
      GiaTriMacDinh: undefined,
      IsDisable: undefined,
      NguoiTao: undefined,
      TenNguoiTao: "",
      NgayTao: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
      MoTa: "",
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
      .subscribe((result: IHanMucChietKhau) => {
        this.data = result.data;
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      tenHanMuc: [this.data.TenHanMuc + "", Validators.compose([Validators.required])],
      giaTriMacDinh: [
        FunctionPublic.f_currency(`${this.data.GiaTriMacDinh}`),
        Validators.compose([Validators.required]),
      ],
      moTa: [this.data.MoTa],
    });
  }
  prepareData(): IHanMucChietKhau {
    let result: IHanMucChietKhau = {
      //empty data
      id: undefined,
      data: undefined,
      status: undefined,
      Id: this.data.Id,
      TenHanMuc: this.formGroup.controls.tenHanMuc.value,
      GiaTriMacDinh: this.changeValueStringToNumber(this.formGroup.controls.giaTriMacDinh.value),
      IsDisable: undefined,
      NguoiTao: undefined,
      TenNguoiTao: "",
      NgayTao: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
      MoTa: this.formGroup.controls.moTa.value,
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
  //format đơn vị của giá trị mặc định
  keyUpInputNumber(event) {
    return FunctionPublic.preventAlpha(event);
  }
  changeValueOfFormGroup(controlName, event) {
    event.stopPropagation();
    var a = this.formGroup.controls[controlName].value;
    var k = FunctionPublic.f_currency(a);
    return this.formGroup.controls[controlName].setValue(k);
  }
  changeValueStringToNumber(a) {
    a = a.replaceAll(",", "");
    return (a = Number(a));
  }

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
