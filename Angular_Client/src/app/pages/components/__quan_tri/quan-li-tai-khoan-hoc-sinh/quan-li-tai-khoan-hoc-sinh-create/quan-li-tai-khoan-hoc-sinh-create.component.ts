import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
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
  selector: "app-quan-li-tai-khoan-hoc-sinh-create",
  templateUrl: "./quan-li-tai-khoan-hoc-sinh-create.component.html",
  styleUrls: ["./quan-li-tai-khoan-hoc-sinh-create.component.scss"],
})
export class QuanLiTaiKhoanHocSinhCreateComponent implements OnInit {
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

  //Thông tin chương môn học
  listBoMon: any[] = [];
  filteredListBoMon: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listBoMonFilterCtrl: string = "";

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
    this.loadData();
    // this.loadListChuongMonHoc();
    //this.loadListBoMon();
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadData() {
    this.data = this.initialData();
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
    };
    return INIT_DATA;
  }

  loadForm() {
    this.informationFormGroup = this.fb.group({
      hoLot: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      ten: ["", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      gioiTinh: ["1", Validators.required],
      ngaySinh: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      sodienthoai: ["", Validators.compose([Validators.required, Validators.maxLength(10)])],
    });
  }

  create() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = undefined;
    modalRef.componentInstance.title = "Lưu thông tin";
    modalRef.componentInstance.message = "Xác nhận lưu thông tin tài khoản?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Xác nhận";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
    modalRef.result.then(
      (result) => {
        if (result) {
          let dataItems = this.prepareData();
          const sbCreate = this.services
            .create(dataItems)
            .pipe(
              tap(() => this.modal.close()),
              catchError((errorMessage) => {
                this.modal.dismiss(errorMessage);
                return of(this.data);
              })
            )
            .subscribe((res: any) => {
              if (res && res.status == 1) {
                this.data = res.data;
                this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
              } else {
                this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
              }
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
      Id: undefined,
      IdNv: undefined,
      Manv: "",
      Holot: formData.hoLot,
      Ten: formData.ten,
      HoTen: "",
      Phai: formData.gioiTinh,
      Ngaysinh: this.formatDateApi(formData.ngaySinh),
      Email: formData.email,
      IdChucdanh: 0,
      LoaiTaiKhoan: 0,
      TenChucDanh: "",
      Disable: 0,
      Cocauid: 0,
      TenCoCau: "",
      SodienthoaiNguoilienhe: formData.sodienthoai,
      Username: this.setUsername(),
      Password: "thptchilang@123",
      Picture: "123",
      Lop: "",
      FileImport: new FileImport(),
      Role: [],
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

  formatDateApi(date) {
    return moment(new Date(date)).format("YYYY-MM-DD[T]HH:mm:ss.SSS");
  }
  validateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = "") {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
  }
}
