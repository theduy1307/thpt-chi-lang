import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { IAccount } from '../quan-li-tai-khoan-model/quan-li-tai-khoan-model';
import { AccountService } from '../quan-li-tai-khoan-services/quan-li-tai-khoan-services';

const EMPTY_DATA: IAccount = {
  id: undefined,
  data: undefined,
  status: undefined,
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
    Disable: undefined,
    Cocauid:undefined,
    SodienthoaiNguoilienhe:"",
    Username: "",
    Password: "",
    Picture: "",
};

@Component({
  selector: 'app-quan-li-tai-khoan-create',
  templateUrl: './quan-li-tai-khoan-create.component.html',
  styleUrls: ['./quan-li-tai-khoan-create.component.scss']
})
export class QuanLiTaiKhoanCreateComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  /* ------------------------------------------------------------------*/
  isLinear = false;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IAccount;
  informationFormGroup: FormGroup;

  user:UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];

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
  listChuongMonHocFilterCtrl: string = "";

  //Thông tin bài học
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
    private services: AccountService,
    private commonService: DungChungService,
    private router: Router,
    public userService: AuthService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
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

  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
    // this.loadListChuongMonHoc();
    //this.loadListBaiHoc();
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  loadData() {
    this.data = EMPTY_DATA;
  }

  loadForm() {
    this.informationFormGroup = this.fb.group({
      hoLot: ["", Validators.required],
      ten: ["", Validators.required],
      gioiTinh: [true, Validators.required],
      ngaySinh: ["", Validators.required],
      email: ["", Validators.required],
      quyen: ["", Validators.required],
      sodienthoai: [""],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
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
