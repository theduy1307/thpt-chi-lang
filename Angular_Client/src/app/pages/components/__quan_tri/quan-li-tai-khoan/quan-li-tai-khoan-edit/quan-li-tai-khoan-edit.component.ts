import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, first, switchMap, tap } from "rxjs/operators";
import { UserModel } from "src/app/modules/auth";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { environment } from "src/environments/environment";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { EMPTY_DATA, FileImport, IAccount } from "../quan-li-tai-khoan-model/quan-li-tai-khoan-model";
import { AccountService } from "../quan-li-tai-khoan-services/quan-li-tai-khoan-services";

@Component({
  selector: "app-quan-li-tai-khoan-edit",
  templateUrl: "./quan-li-tai-khoan-edit.component.html",
  styleUrls: ["./quan-li-tai-khoan-edit.component.scss"],
})
export class QuanLiTaiKhoanEditComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  @ViewChild("fileUpload", { static: true }) fileUpload;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  env = environment.plainApi;
  isLoading$;
  data: IAccount;
  informationFormGroup: FormGroup;

  fileToUpload: File | null = null;
  fileToUpLoadName: string | "";
  flagFileImport: FileImport = new FileImport();
  flagFileDownload: any;
  imageUrl = "";

  user: any;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];

  //Thông tin chương môn học
  listBoMon: any[] = [];
  filteredListBoMon: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listBoMonFilterCtrl: string = "";

  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/

  constructor(
    private services: AccountService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
    this.loadListBoMon();
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
    this.loadForm()
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get("id"));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of(EMPTY_DATA);
        }),
        catchError(() => {
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(["/hop-dong-mau"], { relativeTo: this.route });
        }
        this.data = res.data;
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }

  loadForm() {
    this.informationFormGroup = this.fb.group({
      hoLot: [this.data.Holot, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      ten: [this.data.Ten, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      gioiTinh: [this.data.Phai, Validators.required],
      ngaySinh: [this.formatDateAngular(this.data.Ngaysinh), Validators.required],
      email: [this.data.Email, Validators.compose([Validators.required, Validators.email])],
      quyen: ["", Validators.required],
      sodienthoai: [this.data.SodienthoaiNguoilienhe, Validators.compose([Validators.required, Validators.maxLength(10)])],
      boMon: [this.data.Cocauid+'', Validators.required],
      uploadFileName: [this.data.Picture, Validators.required],
      quanTri: [(this.data.AllowCode+'').indexOf('2')>-1 ? true : false, Validators.required],
      giaoVienCN: [(this.data.AllowCode+'').indexOf('3')>-1 ? true : false, Validators.required]
    });
    this.imageUrl = this.env+this.data.Picture
  }
  getQuyenQuanTri(allowCode:number) {

  }
  //#region DROPDOWN Bộ môn
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
    this.filteredListBoMon.next(this.listBoMon.filter((ts) => ts.TenMonHoc.toLowerCase().indexOf(search) > -1));
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
            .update(dataItems)
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

  back() {
    if (this.informationFormGroup.dirty) {
      const modalRef = this.modalService.open(DeleteModalComponent);
      modalRef.componentInstance.title = "Trở về trang chủ";
      modalRef.componentInstance.message = "Dữ liệu chưa được lưu, thầy cô có muốn trở về không?";
      modalRef.componentInstance.loadingMsg = "";
      modalRef.componentInstance.submitButtonMsg = "Trở về";
      modalRef.componentInstance.cancelButtonMsg = "Đóng";
      modalRef.result.then(
        (result) => {
          if (result) {
            this.router.navigate(["/quan-tri/quan-li-tai-khoan"]);
          }
        },
        () => {}
      );
    } else {
      this.router.navigate(["/quan-tri/quan-li-tai-khoan"]);
    }
  }

  prepareData(): IAccount {
    const formData = this.informationFormGroup.value;
    const data: IAccount = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: this.data.Id,
      IdNv: this.data.IdNv,
      Manv: this.data.Manv,
      Holot: formData.hoLot,
      Ten: formData.ten,
      HoTen: "",
      Phai: formData.gioiTinh,
      Ngaysinh: this.formatDateApi(formData.ngaySinh),
      Email: formData.email,
      IdChucdanh: undefined,
      LoaiTaiKhoan: undefined,
      TenChucDanh: "",
      Disable: this.data.Disable,
      Cocauid: parseInt(formData.boMon),
      TenCoCau: "",
      SodienthoaiNguoilienhe: formData.sodienthoai,
      /*
        * Nếu họ tên có thay đổi thì set lại username
        * Còn không thì không làm gì hết
      */
      Username: this.data.Username.replace(/[0-9]/g, '') === this.setUsername() ? this.data.Username : this.setUsername(),
      Password: "",
      Picture: this.data.Picture,
      FileImport: this.flagFileImport,
      Role:[],
      AllowCode: this.getAllowCode()
    };
    return data;
  }
  getAllowCode():number {
    const [admin, manager] = [this.informationFormGroup.controls['quanTri'].value, this.informationFormGroup.controls['giaoVienCN'].value]
    let allowCode:string = "1"
    if(admin) allowCode += '2'
    if(manager) allowCode += '3'
    return +allowCode
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
  /* ------------------*/

  formatDateAngular(date: string) {
    return moment(new Date(date)).format("MM/DD/YYYY");
  }
  formatDateApi(date) {
    return moment(new Date(date)).format("YYYY-MM-DD[T]HH:mm:ss.SSS");
  }
  validateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = "") {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
  }
  /* -----------------------------------------------------------------------*/
}
