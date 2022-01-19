import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
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
import { FileImport } from "../../quan-li-tai-khoan/quan-li-tai-khoan-model/quan-li-tai-khoan-model";
import { Account, AccountImport, IAccount } from "../quan-li-tai-khoan-hoc-sinh-model/quan-li-tai-khoan-hoc-sinh-model";
import { EMPTY_DATA } from "../quan-li-tai-khoan-hoc-sinh-model/quan-li-tai-khoan-hoc-sinh-model";
import { AccountStudentService } from "../quan-li-tai-khoan-hoc-sinh-services/quan-li-tai-khoan-hoc-sinh-services";

@Component({
  selector: "app-quan-li-tai-khoan-hoc-sinh-import",
  templateUrl: "./quan-li-tai-khoan-hoc-sinh-import.component.html",
  styleUrls: ["./quan-li-tai-khoan-hoc-sinh-import.component.scss"],
})
export class QuanLiTaiKhoanHocSinhImportComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  @ViewChild("fileUpload", { static: true }) fileUpload;
  /* ------------------------------------------------------------------*/

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

  listAccountImport: any[] = [];

  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  loadData() {
    this.data = EMPTY_DATA;
  }

  setUsername(hoLot: string, ten: string): string {
    let firstName = this.splitFirstName(hoLot);
    let lastName = FunctionPublic.removeVietnameseTones(ten);
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

  FileSelected(evt: any) {
    if (evt.target.files && evt.target.files.length) {
      this.services.importExcel(evt.target.files).subscribe((res) => {
        evt.target.type = "text";
        evt.target.type = "file";
        if (res.status == 1 && res.data) {
          res.data.forEach((element) => {
            let account = new Account();
            let accountImport = new AccountImport();
            accountImport.clear();
            account.copy(element);
            account.isError = false;
            this.listAccountImport.push(account);
          });
          // console.log("this.tmpNCCsResult",this.tmpNCCsResult);

          this.listAccountImport = [...this.listAccountImport];
          this.changeDetectorRefs.detectChanges();
        }
      });
    }
  }

  download() {
		let linkdownload = this.services.downloadTemplate();
		window.open(linkdownload);
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
            .createImport(dataItems)
            .pipe(
              tap(() => this.modal.close()),
              catchError((errorMessage) => {
                console.error("UPDATE ERROR", errorMessage);
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

  prepareData(): IAccount[] {
    let listData: IAccount[] = [];
    this.listAccountImport.map((item) => {
      const data: IAccount = {
        id: undefined,
        data: undefined,
        status: undefined,
        Id: undefined,
        IdNv: undefined,
        Manv: "",
        Holot: item.Holot,
        Ten: item.Ten,
        HoTen: "",
        Phai: this.getGender(item.Phai),
        Ngaysinh: this.formatDate(item.Ngaysinh),
        Email: "",
        IdChucdanh: undefined,
        LoaiTaiKhoan: undefined,
        TenChucDanh: "",
        Disable: 0,
        Cocauid: 0,
        TenCoCau: "",
        SodienthoaiNguoilienhe: item.SodienthoaiNguoilienhe ,
        Username: this.setUsername(item.Holot, item.Ten),
        Password: "thptchilang@123",
        Picture: "aaa",
        Lop: item.Lop,
        FileImport: new FileImport(),
        Role: [],
      };
      listData.push(data)
    });
    return listData;
  }
  /* ----------------------------- Inject Event Data ---------------------------
    @Type:
    0: isControlValid()
    1: isControlInvalid()
    2: isControlTouched()
    3: controlHasError()*/
  getGender(input:string):string {
    let gender:string = "";
    let newInput = (FunctionPublic.removeVietnameseTones(input)).toLowerCase()
    if(newInput === 'nam')
    {
      gender = '1';
    }
    else if (newInput === "nu") 
    {
      gender = '2';
    }
    else gender = '-1';
    return gender;
  }
  ValidateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = "") {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
  }
  formatDate(date) {
    return moment(new Date(date)).format("YYYY-MM-DD[T]HH:mm:ss.SSS");
  }
  /* -----------------------------------------------------------------------*/
}
