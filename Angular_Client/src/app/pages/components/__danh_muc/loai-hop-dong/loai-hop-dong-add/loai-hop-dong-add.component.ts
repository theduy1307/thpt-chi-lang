import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { of, Subscription } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "src/app/modules/auth";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { ILoaiHopDong } from "../loai-hop-dong-model/loai-hop-dong.model";
import { LoaiHopDongService } from "../loai-hop-dong-service/loai-hop-dong.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: "app-loai-hop-dong-add",
  templateUrl: "./loai-hop-dong-add.component.html",
  styles: [],
})
export class LoaiHopDongAddComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  /* ------------------------------------------------------------------*/
  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: ILoaiHopDong;
  formGroup: FormGroup;
  user: UserModel;
  private subscriptions: Subscription[] = [];
  public Editor = ClassicEditor;
  /* ------------------------------------------------------------------*/

  constructor(
    private Services: LoaiHopDongService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.Services.isLoading$;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  initData(): ILoaiHopDong {
    const EMPTY_Data: ILoaiHopDong = {
      data: undefined,
      id: undefined,
      status: undefined,
      Id: undefined,
      TenLoai: undefined,
      NhomHopDong: undefined,
      NguoiTao: undefined,
      TenNguoiLap: undefined,
      NgayTao: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      IsDisable: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
      MoTa: undefined,
      ThemChiTiet: undefined,
    };
    return EMPTY_Data;
  }

  loadData() {
    this.data = this.initData();
    this.loadForm();
  }
  loadForm() {
    this.formGroup = this.fb.group({
      NhomHopDong: [0, Validators.compose([Validators.required])],
      TenLoai: ["", Validators.compose([Validators.required])],
      MoTa: ["", Validators.compose([Validators.required])],
      ThemChiTiet: [false],
    });
  }

  prepareData(tmp: boolean): ILoaiHopDong {
    let result: ILoaiHopDong = {
      //Empty data
      data: undefined,
      id: undefined,
      status: undefined,
      Id: undefined,
      TenLoai: this.formGroup.controls["TenLoai"].value,
      NhomHopDong: this.formGroup.controls["NhomHopDong"].value,
      NguoiTao: undefined,
      TenNguoiLap: undefined,
      NgayTao: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      IsDisable: false,
      NguoiSua: undefined,
      NgaySua: undefined,
      MoTa: this.formGroup.controls["MoTa"].value,
      ThemChiTiet: this.formGroup.controls["ThemChiTiet"].value == "true",
    };
    return result;
  }
  create() {
    let dataItems = this.prepareData(true);
    const sbCreate = this.Services.create(dataItems)
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
        if (res && res.status == 1) {
          this.data = res.data;
          this.layoutUtilsService.openSnackBar(res.error.message, "????ng");
        } else {
          this.layoutUtilsService.openSnackBar(res.error.message, "????ng");
        }
      });
    this.subscriptions.push(sbCreate);
  }
  SendAndCreate() {
    let dataItems = this.prepareData(false);
    const sbCreate = this.Services.create(dataItems)
      .pipe(
        tap(() => {
          // this.ListDataThietBi.splice(0);
          this.loadData();
          this.loadForm();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res: ILoaiHopDong) => {
        if (res && res.status == 1) {
          this.data = res.data;
          this.layoutUtilsService.openSnackBar("Th??m m???i y??u c???u th??nh c??ng", "????ng");
        } else {
          this.layoutUtilsService.openSnackBar("Th??m m???i y??u c???u th???t b???i, vui l??ng ki???m tra th??ng tin", "????ng");
        }
      });
    this.subscriptions.push(sbCreate);
  }

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
