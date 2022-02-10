import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import * as moment from "moment";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { QuanLyThongBaoService } from "../quan-ly-thong-bao-service/quan-ly-thong-bao.service";
import { ISysNotifyMaster } from "../quan-ly-thong-bao-model/quan-ly-thong-bao-model";
import { AuthService, UserModel } from "src/app/modules/auth";

const EMPTY_DATA: ISysNotifyMaster = {
  id: undefined,
  data: undefined,
  status: undefined,
  Id: undefined,
  Title: "",
  Content: "",
  CreateDate: "",
  ModifiedDate: "",
  CreateBy: undefined,
  NotifyIcon: "",
  Type:undefined,
  Disabled: undefined,
};

@Component({
  selector: "app-quan-ly-thong-bao-create",
  templateUrl: "./quan-ly-thong-bao-create.component.html",
  styleUrls: ["./quan-ly-thong-bao-create.component.scss"],
})
export class QuanLyThongBaoCreateComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  public Editor = ClassicEditor;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: ISysNotifyMaster;
  formGroup: FormGroup;
  //Thông tin chương môn học
  listChuongMonHoc: any[] = [];
  /*
 public class ChuongMonHoc
   {
       public long Id { get; set; }
       public long IdMonHoc { get; set; }
       public int SoThuTu { get; set; }
       public string MaChuong { get; set; }
       public string TenChuong { get; set; }
       public byte Lop  { get; set; }
       public long NguoiTao { get; set; }
       public DateTime NgayTao { get; set; }
       public long NguoiSua { get; set; }
       public DateTime NgaySua { get; set; }
       public bool IsDisabled { get; set; }
   }
  */
  filteredListChuongMonHoc: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listChuongMonHocFilterd: any[] = [];
  listChuongMonHocFilterCtrl: string = "";

  //Thông tin bài học
  listBaiHoc: any[] = [];
  listFullBaiHoc: any[] = [];
  /*
 public class ChuongMonHoc
   {
       public long Id { get; set; }
       public long IdMonHoc { get; set; }
       public int SoThuTu { get; set; }
       public string MaChuong { get; set; }
       public string TenChuong { get; set; }
       public byte Lop  { get; set; }
       public long NguoiTao { get; set; }
       public DateTime NgayTao { get; set; }
       public long NguoiSua { get; set; }
       public DateTime NgaySua { get; set; }
       public bool IsDisabled { get; set; }
   }
  */
  filteredListBaiHoc: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listBaiHocFilterCtrl: string = "";

  user:any;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];


  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/

  constructor(
    private service: QuanLyThongBaoService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    public userService: AuthService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private changeDetectorRefs: ChangeDetectorRef
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
    this.isLoading$ = this.service.isLoading$;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  loadData() {
    this.data = EMPTY_DATA;
    this.loadForm();
  }
  loadForm() {
    this.formGroup = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      content: ["", Validators.compose([Validators.required])],
    });
  }

  /* -----------------------------------------------------------------------*/

  /*------------------------- CÁC THAO TÁC TRÊN FORM ----------------------*/
  prepareNotifiCation(): ISysNotifyMaster {
    let newNotification: ISysNotifyMaster = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      Title: this.formGroup.controls["title"].value,
      Content: this.formGroup.controls["content"].value,
      CreateDate: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      ModifiedDate: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      CreateBy: this.user.id,
      NotifyIcon: "",
      Type:1,
      Disabled: false,
    };
    return newNotification;
  }

  create() {
    const newData = this.prepareNotifiCation();
    const sbCreate = this.service
      .create(newData)
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
        this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
      });
    this.subscriptions.push(sbCreate);
  }
  /* -----------------------------------------------------------------------*/

  /*
 ----------------------------- Inject Event Data ---------------------------
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
