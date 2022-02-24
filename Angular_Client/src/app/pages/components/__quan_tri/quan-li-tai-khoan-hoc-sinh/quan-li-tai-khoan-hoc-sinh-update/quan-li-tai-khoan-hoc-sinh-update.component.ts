import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, first, tap } from "rxjs/operators";
import { AuthService, UserModel } from "src/app/modules/auth";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { FileImport } from "../../../__danh_muc/hop-dong-mau/hop-dong-mau-model/hop-dong-mau.model";
import { IAccount } from "../quan-li-tai-khoan-hoc-sinh-model/quan-li-tai-khoan-hoc-sinh-model";
import { AccountStudentService } from "../quan-li-tai-khoan-hoc-sinh-services/quan-li-tai-khoan-hoc-sinh-services";

@Component({
  selector: "app-quan-li-tai-khoan-hoc-sinh-update",
  templateUrl: "./quan-li-tai-khoan-hoc-sinh-update.component.html",
  styleUrls: ["./quan-li-tai-khoan-hoc-sinh-update.component.scss"],
})
export class QuanLiTaiKhoanHocSinhUpdateComponent implements OnInit {
  @Input() id: number;
  /* ------------------------------------------------------------------*/
  isLinear = false;
  imageUrl = "assets/media/users/blank.png";
  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IAccount;
  informationFormGroup: FormGroup;

  user: UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];

  //Thông tin bài học
  listLopHoc: any[] = [];
  listFullLopHoc: any[] = [];
  filteredListLopHoc: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listLopHocFilterCtrl: string = "";

  private subscriptions: Subscription[] = [];

  constructor(
    private services: AccountStudentService,
    private commonService: DungChungService,
    private router: Router,
    public userService: AuthService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.user = Object.assign({}, user);
        this.firstUserState = Object.assign({}, user);
        this.LIST_ROLES_USER = this.user.roles;
      });
  }

  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadListLopHoc();
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  //#region DROPDOWN Tên chương
  loadListLopHoc() {
    this.commonService.getListLopHoc().subscribe((res) => {
      if (res && res.status === 1) {
        this.listLopHoc = res.data;
        this.listFullLopHoc = res.data;
        this.filteredListLopHoc.next(this.listLopHoc.slice());
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  filterListLopHoc() {
    if (!this.listLopHoc) {
      return;
    }
    let search = this.listLopHocFilterCtrl;
    if (!search) {
      this.filteredListLopHoc.next(this.listLopHoc.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredListLopHoc.next(this.listLopHoc.filter((ts) => ts.TenLoai.toLowerCase().indexOf(search) > -1));
    this.changeDetectorRefs.detectChanges();
  }
  getNameLopHoc() {
    var item = this.listLopHoc.find((res) => res.Id == +this.informationFormGroup.controls.lopHoc.value);
    if (item) {
      return item.TenLop;
    }
    return "";
  }
  setValueLopHoc(event: any) {
    let item = this.listLopHoc.find((x) => x.Id === Number(event.value));
    this.informationFormGroup.controls["lopHoc"].setValue(item.Id.toString());
  }
  //#endregion

  loadData() {
    this.data = this.initialData();
    this.loadForm();
    const sb = this.services
      .getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.initialData());
        })
      )
      .subscribe((result: IAccount) => {
        this.data = result.data;
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }

  initialData(): IAccount {
    const INIT_DATA: IAccount = {
      id: undefined,
      status: undefined,
      data: undefined,
      Id: undefined,
      IdNv: undefined,
      Manv: "",
      Holot: "",
      Ten: "",
      HoTen: "",
      Phai: "",
      Ngaysinh: "",
      Email: "",
      IdChucdanh: undefined,
      TenChucDanh: "",
      LoaiTaiKhoan: undefined,
      Disable: undefined,
      SodienthoaiNguoilienhe: "",
      Cocauid: undefined,
      TenCoCau: "",
      Username: "",
      Password: "",
      FileImport: undefined,
      Picture: "",
      Lop: "",
      Role: [],
      IdLop:0,
    };
    return INIT_DATA;
  }

  loadForm() {
    this.informationFormGroup = this.fb.group({
      hoLot: [this.data.Holot, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      ten: [this.data.Ten, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      gioiTinh: [this.data.Phai, Validators.required],
      ngaySinh: [this.formatDateAngular(this.data.Ngaysinh), Validators.required],
      lopHoc: [this.data.IdLop.toString(), Validators.compose([Validators.required])],
      soDienThoai: [this.data.SodienthoaiNguoilienhe, Validators.compose([Validators.required, Validators.maxLength(10)])],
    });
  }

  edit() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = undefined;
    modalRef.componentInstance.title = "Lưu thông tin";
    modalRef.componentInstance.message = "Xác nhận cập nhật thông tin tài khoản?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Xác nhận";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
    modalRef.result.then(
      (result) => {
        if (result) {
          let dataItems = this.prepareData();
          const sbCreate = this.services
            .update(dataItems)
            .pipe(
              tap(() => this.modal.close()),
              catchError((errorMessage) => {
                this.modal.dismiss(errorMessage);
                return of(this.data);
              })
            )
            .subscribe((res: any) => {
              this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
            });
          this.subscriptions.push(sbCreate);
        }
      },
      () => {}
    );
  }

  prepareData(): IAccount {
    const formData = this.informationFormGroup.value;
    const data: IAccount = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: this.data.Id,
      IdNv: this.data.IdNv,
      Manv: "",
      Holot: this.upperCaseFirstCharacter(formData.hoLot),
      Ten: this.upperCaseFirstCharacter(formData.ten),
      HoTen: "",
      Phai: formData.gioiTinh,
      Ngaysinh: this.formatDateApi(formData.ngaySinh),
      Email: "Không có",
      IdChucdanh: 0,
      LoaiTaiKhoan: 0,
      TenChucDanh: "",
      Disable: 0,
      Cocauid: 0,
      TenCoCau: "",
      SodienthoaiNguoilienhe: formData.soDienThoai,
      Username:  this.data.Username.replace(/[0-9]/g, '') === this.setUsername() ? this.data.Username : this.setUsername(),
      Password: "thptchilang@123",
      Picture: "123",
      Lop: formData.lopHoc,
      FileImport: new FileImport(),
      Role: [],
      IdLop: +formData.lopHoc,
    };
    return data;
  }

  setUsername(): string {
    const formData = this.informationFormGroup.value;
    let firstName = this.splitFirstName(formData.hoLot);
    let lastName = FunctionPublic.removeVietnameseTones(formData.ten);
    const username = `${firstName}.${lastName}`;
    return username.toLowerCase();
  }

  splitFirstName(str: string): string {
    let firstName = FunctionPublic.removeVietnameseTones(str);
    let newString: string = "";
    firstName.split(" ").map((x) => {
      newString += x.charAt(0);
    });
    return newString;
  }

  upperCaseFirstCharacter(str: string) {
    if (str.length == 0) return "";
    let arrName = str.split(" ");
    let newString = "";
    arrName.map((elm) => {
      elm = elm.charAt(0).toUpperCase() + elm.slice(1);
      newString += elm + " ";
    });
    return newString.trim();
  }

  formatDateApi(date) {
    return moment(new Date(date)).format("YYYY-MM-DD[T]HH:mm:ss.SSS");
  }
  formatDateAngular(date) {
    return moment(new Date(date)).format("MM/DD/YYYY");
  }
  validateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = "") {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
  }
}
