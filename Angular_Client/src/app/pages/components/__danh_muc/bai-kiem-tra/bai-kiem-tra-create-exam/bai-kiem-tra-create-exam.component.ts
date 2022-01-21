import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { IBaiHoc } from '../../bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen-model/bai-kiem-tra-truc-tuyen.model';
import { IBaiKiemTra_TrucTuyen_Group } from '../bai-kiem-tra-model/bai-kiem-tra.model';
import { BaiKiemTraService } from '../bai-kiem-tra-service/bai-kiem-tra.service';

@Component({
  selector: 'app-bai-kiem-tra-create-exam',
  templateUrl: './bai-kiem-tra-create-exam.component.html',
  styles: [
  ]
})
export class BaiKiemTraCreateExamComponent implements OnInit {

  @Input() item: any
  isLoading$;
  data: IBaiKiemTra_TrucTuyen_Group;
  user: UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private services: BaiKiemTraService,
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

  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }
  loadData() {
    this.data = this.initData();
    this.loadForm();
  }
  initData(): IBaiKiemTra_TrucTuyen_Group {
    const EMPTY_Data: IBaiKiemTra_TrucTuyen_Group = {
      id: undefined, data: undefined, status: undefined,
      Id: undefined,
      Id_BaiKiemTra_Offline : undefined,
      TenBaiKiemTra: undefined,
      SoLuongDe: undefined,
      CauBiet: undefined,
      CauHieu: undefined,
      CauVanDungThap: undefined,
      CauVanDungCao: undefined,
      ThoiGianLamBai: undefined,
      HocKy: undefined,
      Lop: undefined,
      NamHoc: undefined,
      IdMonHoc: undefined,
      NguoiTao: undefined,
      TenNguoiTao: undefined,
      NgayTao: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
      TrangThai: undefined,
      IsDisabled: undefined,
      IsCustom: undefined,
      NgayThi: undefined,
      GioThi: undefined,
      Password: undefined,
      isExam: undefined
    };
    return EMPTY_Data;

  }
  loadForm() {
    this.formGroup = this.fb.group({
      NgayThi: [FunctionPublic.getCurrentDate(), Validators.compose([Validators.required])],
      GioThi: [, Validators.compose([Validators.required])],
      Password: [this.generatePassword(6), Validators.compose([Validators.required])],
      NguoiTao: [this.item.TenNguoiTao]
    });
    this.formGroup.controls.NguoiTao.disable();
  }
  prepareData(): IBaiKiemTra_TrucTuyen_Group {
    let result: IBaiKiemTra_TrucTuyen_Group = {
      //empty data
      id: undefined, data: undefined, status: undefined,
      Id: undefined,
      Id_BaiKiemTra_Offline: this.item.Id,
      TenBaiKiemTra: this.item.TenBaiKiemTra,
      SoLuongDe: this.item.SoLuongDe,
      CauBiet: this.item.CauBiet,
      CauHieu: this.item.CauHieu,
      CauVanDungThap: this.item.CauVanDungThap,
      CauVanDungCao: this.item.CauVanDungCao,
      ThoiGianLamBai: this.item.ThoiGianLamBai,
      HocKy: this.item.HocKy,
      Lop: this.item.Lop,
      NamHoc: this.item.NamHoc,
      IdMonHoc: this.item.IdMonHoc,
      NguoiTao: this.item.NguoiTao,
      TenNguoiTao: this.item.TenNguoiTao,
      NgayTao: moment(new Date(this.item.NgayTao)).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      NguoiSua: undefined,
      NgaySua: undefined,
      TrangThai: this.item.TrangThai,
      IsDisabled: false,
      IsCustom: false,
      NgayThi: moment(new Date(this.formGroup.controls.NgayThi.value)).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      GioThi: this.formGroup.controls.GioThi.value,
      Password: this.formGroup.controls.Password.value,
      isExam: undefined
    }
    return result
  }
  create() {
    let dataItems = this.prepareData()
    const sbCreate = this.services.createOnlineExam(dataItems).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.data);
      }),
    ).subscribe((res: IBaiKiemTra_TrucTuyen_Group) => {
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
  // Tạo random password
  generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  }
  
   shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  ValidateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = '') {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation)
  }
}
