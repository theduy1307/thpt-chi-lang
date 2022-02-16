import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, first, tap } from "rxjs/operators";
import { AuthService, UserModel } from "src/app/modules/auth";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { FileImport, IAccount } from "../quan-li-tai-khoan-model/quan-li-tai-khoan-model";
import { AccountService } from "../quan-li-tai-khoan-services/quan-li-tai-khoan-services";
import { EMPTY_DATA } from "../quan-li-tai-khoan-model/quan-li-tai-khoan-model";

@Component({
  selector: "app-quan-li-tai-khoan-create",
  templateUrl: "./quan-li-tai-khoan-create.component.html",
  styleUrls: ["./quan-li-tai-khoan-create.component.scss"],
})
export class QuanLiTaiKhoanCreateComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  @ViewChild("fileUpload", { static: true }) fileUpload;
  /* ------------------------------------------------------------------*/
  isLinear = false;
  imageUrl = "assets/media/users/blank.png";
  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IAccount;
  informationFormGroup: FormGroup;

  fileToUpload: File | null = null;
  fileToUpLoadName: string | "";
  flagFileImport: FileImport = new FileImport();
  flagFileDownload: any;

  user: UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];

  giaoVienCN:boolean = true;
  quanTri:boolean;

  //Thông tin chương môn học
  listBoMon: any[] = [];
  filteredListBoMon: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listBoMonFilterCtrl: string = "";

  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/
  constructor(
    private services: AccountService,
    private commonService: DungChungService,
    private router: Router,
    public userService: AuthService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
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
    this.loadListBoMon();
    this.loadForm();
    this.services.data_import.subscribe((res) => {
      if (res != null && res != undefined) {
        for (let i = 0; i < res.length; i++) {
          this.flagFileImport = new FileImport();
          this.flagFileImport.clear();
          this.flagFileImport.filename = res[i].fileName;
          this.flagFileImport.extension = res[i].extension;
          this.flagFileImport.base64 = res[i].base64;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  loadData() {
    this.data = EMPTY_DATA;
  }

  loadForm() {
    this.informationFormGroup = this.fb.group({
      hoLot: ["",  Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      ten: ["",  Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      gioiTinh: ["1", Validators.required],
      ngaySinh: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      giaoVienCN: [false],
      quanTri: [false],
      sodienthoai: ["",  Validators.compose([Validators.required, Validators.maxLength(10)])],
      boMon: ["", Validators.required],
      uploadFileName: ["", Validators.required],
    });
  }

  setUsername():string
  {
    const formData = this.informationFormGroup.value;
    let firstName = this.splitFirstName(formData.hoLot)
    let lastName = FunctionPublic.removeVietnameseTones(formData.ten);
    const username = `${firstName}.${lastName}`;
    return username.toLowerCase()
  }

  splitFirstName(str:string):string
  {
    let firstName = FunctionPublic.removeVietnameseTones(str)
    let newString:string = "";
    firstName.split(" ").map(x=>{newString += x.charAt(0)})
    return newString;
  }

  selectFile() {
    let el: HTMLElement = this.fileUpload.nativeElement as HTMLElement;
    el.click();
  }
  selectFileUpload(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      this.FileSelected(event)
    }
  }

  FileSelected(evt: any) {
    if (evt.target.files && evt.target.files.length) {
      let fileNameList = [];
      for (let i = 0; i < evt.target.files.length; i++) {
        let file = evt.target.files[i];
        this.flagFileDownload = file;
        let fileName = file.name;
        fileNameList.push(fileName);
      }
      let listFileNameStr = fileNameList[0];
      for (var i = 1; i < fileNameList.length; i++) {
        listFileNameStr += ", " + fileNameList[i];
      }

      let el: any = this.fileUpload.nativeElement;
      var service = this.services;
      var useBase64: boolean = true;
      let tmpDataArray: any = [];

      for (var idx = 0; idx < el.files.length; idx++) {
        var extension = el.files[idx].name.split(".").pop();
        var fileName = el.files[idx].name.substring(0, el.files[idx].name.indexOf(extension) - 1);

        let reader = new FileReader();
        reader.readAsDataURL(el.files[idx]);
        reader.onload = function () {
          let base64Str = reader.result as String;
          var metaIdx = base64Str.indexOf(";base64,");

          base64Str = base64Str.substr(metaIdx + 8);
          var data = {
            fileName: fileName,
            base64: base64Str,
            extension: extension,
          };

          tmpDataArray.push(data);
          service.data_import.next(tmpDataArray);
        };
      }
    }
    evt.target.type = "text";
    evt.target.type = "file";
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
              tap(() => this.router.navigate(["/quan-tri/quan-li-tai-khoan"])),
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

  back(){
    if(this.informationFormGroup.dirty)
    {
      const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.title = "Trở về trang chủ";
    modalRef.componentInstance.message = "Dữ liệu chưa được lưu, thầy cô có muốn trở về không?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Trở về";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
    modalRef.result.then(
      (result) => {
        if (result) {
          this.router.navigate(["/quan-tri/quan-li-tai-khoan"])
        }
      },
      () => {}
    );
    }
    else
    {
      this.router.navigate(["/quan-tri/quan-li-tai-khoan"])
    }
  }

  //#region DROPDOWN Tên chương
  loadListBoMon() {
    this.commonService.getListBoMon().subscribe((res) => {
      if (res && res.status === 1) {
        this.listBoMon = res.data;
        this.filteredListBoMon.next(this.listBoMon.slice());
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  filterListBoMon() {
    if (!this.listBoMon) {
      return;
    }
    let search = this.listBoMonFilterCtrl;
    if (!search) {
      this.filteredListBoMon.next(this.listBoMon.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredListBoMon.next(
      this.listBoMon.filter((ts) => ts.TenMonHoc.toLowerCase().indexOf(search) > -1)
    );
    this.changeDetectorRefs.detectChanges();
  }
  getNameBoMon() {
    var item = this.listBoMon.find((res) => res.Id == +this.informationFormGroup.controls.boMon.value);
    if (item) {
      return item.TenMonHoc;
    }
    return "";
  }
  setValueBoMon(event: any) {
    let item = this.listBoMon.find((x) => x.Id == parseInt(event.value));
  }
  //#endregion
  
  prepareData(): IAccount {
    const formData = this.informationFormGroup.value;
    const data: IAccount = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id:undefined,
      IdNv: undefined,
      Manv: "",
      Holot: FunctionPublic.upperCaseFirstCharacter(formData.hoLot),
      Ten: FunctionPublic.upperCaseFirstCharacter(formData.ten),
      HoTen: "",
      Phai: formData.gioiTinh,
      Ngaysinh: this.formatDate(formData.ngaySinh),
      Email: formData.email,
      IdChucdanh: undefined,
      LoaiTaiKhoan: undefined,
      TenChucDanh: "",
      Disable: 0,
      Cocauid: parseInt(formData.boMon),
      TenCoCau:"",
      SodienthoaiNguoilienhe: formData.sodienthoai,
      Username: this.setUsername(),
      Password: "thptchilang@123",
      Picture: "aaa",
      FileImport: this.flagFileImport,
      Role:[],
      AllowCode: this.setQuyen()
    };
    return data
  }
  setQuyen():number
  {
    const giaoVienCN = this.informationFormGroup.controls["giaoVienCN"].value
    const quanTri = this.informationFormGroup.controls["quanTri"].value
    let allowCode:string = "1"
    if(giaoVienCN) allowCode += "3"
    if(quanTri) allowCode += "2"
    return +allowCode
    /*
      1: Giáo viên bộ môn
      2: Quản trị
      3: Chủ nhiệm
      4: Học sinh
    */
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
  formatDate(date)
  {
    return moment(new Date(date)).format("YYYY-MM-DD[T]HH:mm:ss.SSS")
  }
  /* -----------------------------------------------------------------------*/
}
