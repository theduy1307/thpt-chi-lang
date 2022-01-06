import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { DeleteModalComponent } from '../../../_common/_components/delete-modal/delete-modal.component';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { INienKhoa } from '../quan-li-nien-khoa-model/quan-li-nien-khoa.model';
import { NienKhoaService } from '../quan-li-nien-khoa-services/quan-li-nien-khoa.service';

@Component({
  selector: 'app-quan-li-nien-khoa-add',
  templateUrl: './quan-li-nien-khoa-add.component.html',
  styles: [
  ]
})
export class QuanLiNienKhoaAddComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: INienKhoa;
  user: UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/

  constructor(
    private services: NienKhoaService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private fb: FormBuilder, public modal: NgbActiveModal,
    public userService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.userService.currentUserSubject.asObservable().pipe(
      first(user => !!user)
    ).subscribe(user => {
      this.user = Object.assign({}, user);
      this.firstUserState = Object.assign({}, user);
      this.LIST_ROLES_USER = this.user.roles;
    })
   }

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
  initData(): INienKhoa {
    const EMPTY_Data: INienKhoa = {
      id: undefined, data: undefined, status: undefined,
      Id: undefined,
      TenNienKhoa: '',
      IsDisable: undefined,
      NguoiTao: undefined,
      TenNguoiTao: '',
      NgayTao: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
    };
    return EMPTY_Data;
  }
  loadData() {
    this.data = this.initData()
    this.loadForm()
  }
  loadForm() {
    this.formGroup = this.fb.group({
      TenNienKhoa: [(FunctionPublic.getFullYear()).toString(), Validators.compose([Validators.required])],
      TenNguoiTao: [this.user.fullname, Validators.compose([Validators.required])]
    });
    this.formGroup.controls.TenNguoiTao.disable();
  }
  prepareData(): INienKhoa {
    let result: INienKhoa = {
      //empty data
      id: undefined, data: undefined, status: undefined,
      Id: undefined,
      TenNienKhoa: this.formGroup.controls.TenNienKhoa.value,
      IsDisable: false,
      NguoiTao: this.user.id,
      TenNguoiTao: '',
      NgayTao: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
    }
    return result
  }
  create() {
      if (this.formGroup.invalid) {
          let snackBarRef = this.snackBar.open('Trường bắt buộc nhập đang bị trống', 'Đóng');
      }
      else {
          const modalRef = this.modalService.open(DeleteModalComponent);
          modalRef.componentInstance.id = undefined;
          modalRef.componentInstance.title = "Lưu thông tin";
          modalRef.componentInstance.message = "Xác nhận lưu thông tin hạn mục chiết khấu?";
          modalRef.componentInstance.loadingMsg = "";
          modalRef.componentInstance.submitButtonMsg = "Xác nhận";
          modalRef.componentInstance.cancelButtonMsg = "Đóng";
          modalRef.result.then((result) => {
              if (result) {
                  let dataItems = this.prepareData()
                  const sbCreate = this.services.create(dataItems).pipe(
                      tap(() => {
                          this.modal.close();
                      }),
                      catchError((errorMessage) => {
                          this.modal.dismiss(errorMessage);
                          return of(this.data);
                      }),
                  ).subscribe((res: INienKhoa) => {
                      if (res && res.status == 1) {
                          this.data = res.data
                          this.layoutUtilsService.openSnackBar("Thêm mới thành công", "Đóng");
                      } else {
                          this.layoutUtilsService.openSnackBar("Thêm mới thất bại, vui lòng kiểm tra thông tin", "Đóng");
                      }
                  }
                  );
                  this.subscriptions.push(sbCreate);
              }
          },
              () => { });
      }

  }
  saveAndCreate() {
      if (this.formGroup.invalid) {
          let snackBarRef = this.snackBar.open('Trường bắt buộc nhập đang bị trống', 'Đóng');
      }
      else {
          const modalRef = this.modalService.open(DeleteModalComponent);
          modalRef.componentInstance.id = undefined;
          modalRef.componentInstance.title = "Lưu thông tin";
          modalRef.componentInstance.message = "Xác nhận lưu thông tin?";
          modalRef.componentInstance.loadingMsg = "";
          modalRef.componentInstance.submitButtonMsg = "Xác nhận";
          modalRef.componentInstance.cancelButtonMsg = "Đóng";
          modalRef.result.then((result) => {
              if (result) {
                  let dataItems = this.prepareData()
                  const sbCreate = this.services.create(dataItems).pipe(
                      tap(() => {
                          this.loadForm()
                      }),
                      catchError((errorMessage) => {
                          this.modal.dismiss(errorMessage);
                          return of(this.data);
                      }),
                  ).subscribe((res: INienKhoa) => {
                      if (res && res.status == 1) {
                          this.data = res.data
                          this.layoutUtilsService.openSnackBar("Thêm mới thành công", "Đóng");
                      } else {
                          this.layoutUtilsService.openSnackBar("Thêm mới thất bại, vui lòng nhập lại thông tin", "Đóng");
                      }
                  }
                  );
                  this.subscriptions.push(sbCreate);
              }
          },
              () => { });
      }
  }

  /* ----------------------------- Inject Event Data ---------------------------
  @Type:
  0: isControlValid()
  1: isControlInvalid()
  2: isControlTouched()
  3: controlHasError()*/

  ValidateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = '') {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation)
  }

  /* -----------------------------------------------------------------------*/

}
