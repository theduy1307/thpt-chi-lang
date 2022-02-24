import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, ReplaySubject, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { DeleteModalComponent } from '../../../_common/_components/delete-modal/delete-modal.component';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { ILop } from '../quan-li-lop-model/quan-li-lop.model';
import { LopService } from '../quan-li-lop-service/quan-li-lop.service';

@Component({
  selector: 'app-quan-li-lop-add',
  templateUrl: './quan-li-lop-add.component.html',
  styles: [
  ]
})
export class QuanLiLopAddComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: ILop;
  user: UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  // thông tin niên khóa
  listNienKhoa: any[] = [];
  filteredListNienKhoa: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listNienKhoaFilterCtrl: string = '';
  // thông tin chủ nhiệm
  listChuNhiem: any[] = [];
  filteredListChuNhiem: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listChuNhiemFilterCtrl: string = '';
  /* ------------------------------------------------------------------*/

  constructor(
    private services: LopService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private fb: FormBuilder, public modal: NgbActiveModal,
    public userService: AuthService,
    private snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
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
  initData(): ILop {
    const EMPTY_Data: ILop = {
      id: undefined, data: undefined, status: undefined,
      Id: undefined,
      TenLop: undefined,
      Loai: undefined,
      IdNienKhoa: undefined,
      TenNienKhoa: '',
      IdChuNhiem: undefined,
      TenChuNhiem: '',
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
    this.loadForm();
    this.loadListNienKhoa();
    this.loadListChuNhiem();
  }
  loadForm() {
    this.formGroup = this.fb.group({
      TenLop: ['', Validators.compose([Validators.required])],
      IdNienKhoa: [],
      TenNienKhoa: [, Validators.compose([Validators.required])],
      IdChuNhiem: [],
      TenChuNhiem: [, Validators.compose([Validators.required])],
      TenNguoiTao: [this.user.fullname, Validators.compose([Validators.required])]
    });
    this.formGroup.controls.TenNguoiTao.disable();
  }
  prepareData(): ILop {
    let result: ILop = {
      //empty data
      id: undefined, data: undefined, status: undefined,
      Id: undefined,
      TenLop: this.formGroup.controls.TenLop.value,
      Loai: undefined,
      IdNienKhoa: this.formGroup.controls.IdNienKhoa.value,
      TenNienKhoa: undefined,
      IdChuNhiem: this.formGroup.controls.IdChuNhiem.value,
      TenChuNhiem: undefined,
      IsDisable: undefined,
      NguoiTao: this.user.id,
      TenNguoiTao: '',
      NgayTao: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
    }
    return result
  }
  // Niên khóa
  loadListNienKhoa() {
    this.commonService.getListNienKhoa().subscribe((res) => {
      if (res && res.status === 1) {
        this.listNienKhoa = res.data;
        this.filteredListNienKhoa.next(this.listNienKhoa.slice());
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  filterListNienKhoa() {
    if (!this.listNienKhoa) {
      return;
    }
    let search = this.listNienKhoaFilterCtrl;
    if (!search) {
      this.filteredListNienKhoa.next(this.listNienKhoa.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredListNienKhoa.next(
      this.listNienKhoa.filter(
        (ts) => ts.TenNienKhoa.toLowerCase().indexOf(search) > -1
      )
    );
    this.changeDetectorRefs.detectChanges();
  }
  getNameNienKhoa() {
    var item = this.listNienKhoa.find(
      (res) => res.Id == +this.formGroup.controls.TenNienKhoa.value
    );
    if (item) {
      return item.TenNienKhoa;
    }
    return "";
  }
  setValueNienKhoa(event: any) {
    let item = this.listNienKhoa.find((x) => x.Id === Number(event.value));
    this.formGroup.controls.IdNienKhoa.setValue(item.Id+"");
  }
  // Chủ nhiệm
  loadListChuNhiem() {
    this.commonService.getListChuNhiem().subscribe((res) => {
      if (res && res.status === 1) {
        this.listChuNhiem = res.data;
        this.filteredListChuNhiem.next(this.listChuNhiem.slice());
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  filterListChuNhiem() {
    if (!this.listChuNhiem) {
      return;
    }
    let search = this.listChuNhiemFilterCtrl;
    if (!search) {
      this.filteredListChuNhiem.next(this.listChuNhiem.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredListChuNhiem.next(
      this.listChuNhiem.filter(
        (ts) => ts.TenNV.toLowerCase().indexOf(search) > -1
      )
    );
    this.changeDetectorRefs.detectChanges();
  }
  getNameChuNhiem() {
    var item = this.listChuNhiem.find(
      (res) => res.Id_NV == +this.formGroup.controls.IdChuNhiem.value
    );
    if (item) {
      return item.TenNV;
    }
    return "";
  }
  setValueChuNhiem(event: any) {
    let item = this.listChuNhiem.find((x) => x.Id_NV === Number(event.value));
    this.formGroup.controls.IdChuNhiem.setValue(item.Id_NV+"");
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
                  ).subscribe((res: ILop) => {
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
                  ).subscribe((res: ILop) => {
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
