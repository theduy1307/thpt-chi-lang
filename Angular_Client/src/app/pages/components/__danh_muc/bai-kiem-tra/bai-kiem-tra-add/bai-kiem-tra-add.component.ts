import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import * as moment from "moment";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IBaiHoc, IBaiKiemTra_Group } from "./../bai-kiem-tra-model/bai-kiem-tra.model";
import { BaiKiemTraService } from "../bai-kiem-tra-service/bai-kiem-tra.service";
import { Router } from "@angular/router";
import { AuthService, UserModel } from "src/app/modules/auth";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

const source = "src/assets/SAMPLE.docx";
const EMPTY_DATA: IBaiKiemTra_Group = {
  id: undefined,
  data: undefined,
  status: undefined,
  Id: undefined,
  TenBaiKiemTra: "",
  TenNguoiTao: "",
  SoLuongDe: undefined,
  CauBiet: undefined,
  CauHieu: undefined,
  CauVanDungThap: undefined,
  CauVanDungCao: undefined,
  ThoiGianLamBai: undefined,
  NamHoc: "",
  IdMonHoc: undefined,
  HocKy: undefined,
  Lop: undefined,
  NguoiTao: undefined,
  NgayTao: "",
  NguoiSua: undefined,
  NgaySua: "",
  TrangThai: undefined,
  IsDisabled: undefined,
  IsCustom:undefined,
  DanhSachBaiHoc: [],
};

@Component({
  selector: "app-bai-kiem-tra-add",
  templateUrl: "./bai-kiem-tra-add.component.html",
  styleUrls: ["./bai-kiem-tra-add.component.css"],
})
export class BaiKiemTraAddComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  public Editor = ClassicEditor;
  /* ------------------------------------------------------------------*/
  isLinear = false;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IBaiKiemTra_Group;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  user:any;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];

  //Th??ng tin khi t???o m???i th??nh c??ng
  flagSuccess:boolean = false
  backUrl:string = "/danh-muc/danh-sach-bai-kiem-tra"
  createUrl:string = "/danh-muc/danh-sach-bai-kiem-tra/them-moi"

  //Th??ng tin ch????ng m??n h???c
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
  listChuongMonHocFilterCtrl: string = "";

  //Th??ng tin b??i h???c
  listBaiHoc: any[] = [];
  listFullBaiHoc: any[] = [];
  listBaiHocDeleted: any[] = [];
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

  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/

  constructor(
    private services: BaiKiemTraService,
    private commonService: DungChungService,
    public userService: AuthService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private fb: FormBuilder,
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
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
    // this.loadListChuongMonHoc();
    this.loadListBaiHoc();
    this.loadForm();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  loadData() {
    this.data = EMPTY_DATA;
  }
  loadForm() {
    this.firstFormGroup = this.fb.group({
      tenBaiKiemTra: ["", Validators.required],
      namHoc: ["", Validators.required],
      soLuongDe: [1, [Validators.required, Validators.min(1)]],
      thoiGianLamBai: [1, [Validators.required, Validators.min(1)]],
      hocKy: [""],
      lop: ["", Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      cauBiet: [1, Validators.required],
      cauHieu: [1, Validators.required],
      cauVanDungThap: [1, Validators.required],
      cauVanDungCao: [1, Validators.required],
      soLuongTong: [0],
    });
    this.secondFormGroup.controls["soLuongTong"].disable();
  }
  getSum() {
    let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
      this.getsecondFormGroup("cauBiet"),
      this.getsecondFormGroup("cauHieu"),
      this.getsecondFormGroup("cauVanDungThap"),
      this.getsecondFormGroup("cauVanDungCao"),
    ];
    let sum: number = cauBiet + cauHieu + cauVanDungThap + cauVanDungCao;
    return sum;
  }
  getsecondFormGroup(controlName: string): any {
    return this.secondFormGroup.controls[controlName].value;
  }
  getfirstFormGroup(controlName: string): any {
    return this.firstFormGroup.controls[controlName].value;
  }
  // //#region DROPDOWN T??n ch????ng
  // loadListChuongMonHoc() {
  //   this.commonService.getListChuongMonHoc().subscribe((res) => {
  //     if (res && res.status === 1) {
  //       this.listChuongMonHoc = res.data;
  //       this.filteredListChuongMonHoc.next(this.listChuongMonHoc.slice());
  //       this.changeDetectorRefs.detectChanges();
  //     }
  //   });
  // }
  // filterListChuongMonHoc() {
  //   if (!this.listChuongMonHoc) {
  //     return;
  //   }
  //   let search = this.listChuongMonHocFilterCtrl;
  //   if (!search) {
  //     this.filteredListChuongMonHoc.next(this.listChuongMonHoc.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   this.filteredListChuongMonHoc.next(
  //     this.listChuongMonHoc.filter((ts) => ts.TenLoai.toLowerCase().indexOf(search) > -1)
  //   );
  //   this.changeDetectorRefs.detectChanges();
  // }
  // getNameChuongMonHoc() {
  //   var item = this.listChuongMonHoc.find((res) => res.Id == +this.formGroup.controls.chuongMonHoc.value);
  //   if (item) {
  //     return item.TenChuong;
  //   }
  //   return "";
  // }
  // setValueChuongMonHoc(event: any) {
  //   let item = this.listChuongMonHoc.find((x) => x.Id == Number(event.value));
  //   this.loadListBaiHoc(item.Id);
  // }
  // //#endregion

  // //#region DROPDOWN T??n ch????ng
  loadListBaiHoc() {
    //n???u kh??ng l???c theo ch????ng m??n h???c th?? load t???t c???
    this.commonService.getListBaiHoc().subscribe((res) => {
      if (res && res.status === 1) {
        this.listBaiHoc = res.data;
        this.listFullBaiHoc = res.data;
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  locDanhSachBaiHoc(event: any) {
    this.listBaiHoc = [...this.listFullBaiHoc];
    let newList = this.listFullBaiHoc.filter((x) => x.HocKy == Number(event.value));
    this.listBaiHoc = [...newList];
  }
  deleteItem(id: number) {
    if (this.listBaiHoc.length == 1) {
      this.layoutUtilsService.openSnackBar("Danh s??ch t???i thi???u ph???i c?? m???t b??i h???c", "????ng");
    } else {
      //ch??? l???y v??? tr?? ph???n t??? trong m???ng
      let index = this.listBaiHoc.findIndex((item) => item.Id == id);
      //l???y lu??n ph???n t???
      let item = this.listBaiHoc.find((item) => item.Id == id);
      if (index < 0) return;
      const newList = [...this.listBaiHoc];
      newList.splice(index, 1);
      this.listBaiHoc = [...newList];
      this.listBaiHocDeleted.push(item);
    }
  }
  restore(item: any) {
    //ch??? l???y v??? tr?? ph???n t??? trong m???ng
    let index = this.listBaiHocDeleted.findIndex((it) => it.Id == item.Id);
    if (index < 0) return;
    const newList = [...this.listBaiHocDeleted];
    newList.splice(index, 1);
    this.listBaiHocDeleted = [...newList];
    this.listBaiHoc.push(item);
  }
  // }
  // filterListBaiHoc() {
  //   if (!this.listBaiHoc) {
  //     return;
  //   }
  //   let search = this.listBaiHocFilterCtrl;
  //   if (!search) {
  //     this.filteredListBaiHoc.next(this.listBaiHoc.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   this.filteredListBaiHoc.next(this.listBaiHoc.filter((ts) => ts.TenLoai.toLowerCase().indexOf(search) > -1));
  //   this.changeDetectorRefs.detectChanges();
  // }
  // getNameBaiHoc() {
  //   var item = this.listBaiHoc.find((res) => res.Id == +this.formGroup.controls.baiHoc.value);
  //   if (item) {
  //     return item.TenBaiHoc;
  //   }
  //   return "";
  // }
  // setValueBaiHoc(event: any) {
  //   let item = this.listBaiHoc.find((x) => x.Id === Number(event.value));
  // }
  // //#endregion
  // /* -----------------------------------------------------------------------*/

  // /*------------------------- C??C THAO T??C TR??N FORM ----------------------*/
  prepareData(): IBaiKiemTra_Group {
    let result: IBaiKiemTra_Group = {
      //Empty data
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenBaiKiemTra: this.getfirstFormGroup("tenBaiKiemTra"),
      TenNguoiTao: "",
      SoLuongDe: this.getfirstFormGroup("soLuongDe"),
      CauBiet: this.getsecondFormGroup("cauBiet"),
      CauHieu: this.getsecondFormGroup("cauHieu"),
      CauVanDungThap: this.getsecondFormGroup("cauVanDungThap"),
      CauVanDungCao: this.getsecondFormGroup("cauVanDungCao"),
      ThoiGianLamBai: this.getfirstFormGroup("thoiGianLamBai"),
      HocKy: Number(this.getfirstFormGroup("hocKy")),
      Lop: Number(this.getfirstFormGroup("lop")),
      NamHoc: this.getfirstFormGroup("namHoc"),
      IdMonHoc: this.user.groupId,
      NguoiTao: this.user.id,
      NgayTao: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      NguoiSua: 0,
      NgaySua: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      TrangThai: 1,
      IsDisabled: false,
      IsCustom: false,
      DanhSachBaiHoc: this.prepareDanhSachBaiHoc(),
    };
    return result;
  }
  prepareDanhSachBaiHoc(): IBaiHoc[] {
    let result: IBaiHoc[] = [];
    this.listBaiHoc.forEach((item) => {
      let temp: IBaiHoc = {
        Id: item.Id,
        IdChuong: item.IdChuong,
        SoThuTu: item.SoThuTu,
        MaBaiHoc: "",
        TenBaiHoc: item.TenBaiHoc,
      };
      result.push(temp);
    });
    return result;
  }
  create() {
    let dataItems = this.prepareData();
    const sbCreate = this.services
      .create(dataItems)
      .pipe(
        tap(() => {}),
        catchError((errorMessage) => {
          console.error("UPDATE ERROR", errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res) => {
        if (res && res.status == 1) {
          this.data = res.data;
          this.flagSuccess = !this.flagSuccess;
          //this.router.navigate(["/danh-muc/danh-sach-bai-kiem-tra/thanh-cong"]);
        } else {
          this.router.navigate(["/danh-muc/danh-sach-bai-kiem-tra/"]);
          this.layoutUtilsService.openSnackBar(res.error.message, "????ng");
        }
      });
    this.subscriptions.push(sbCreate);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  // onCloseMember() {
  //   this.data = EMPTY_DATA;
  //   //this.c.reset();
  //   this.loadData();
  //   this.services.fetch();
  //   this.changeDetectorRefs.detectChanges();
  // }
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
