import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { of, Subscription } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import * as ClassicEditor from "src/assets/ckeditor5/packages/ckeditor5-build-classic";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { BaiKiemTraCauHinhService } from "../bai-kiem-tra-cau-hinh-service/bai-kiem-tra-cau-hinh.service";
import { IBaiKiemTraCauHinh_Group, IQuestion } from "./../bai-kiem-tra-cau-hinh-model/bai-kiem-tra-cau-hinh.model";
@Component({
  selector: "app-bai-kiem-tra-cau-hinh-add",
  templateUrl: "./bai-kiem-tra-cau-hinh-add.component.html",
})
export class BaiKiemTraCauHinhAddComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  isLoadingSpinner: boolean = false;
  public Editor = ClassicEditor;
  data: IBaiKiemTraCauHinh_Group;
  formThongTin: FormGroup;
  danhSachCauHoi: IQuestion[];
  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/

  constructor(
    private services: BaiKiemTraCauHinhService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadData(): void {
    this.data = this.initialData();
  }

  initialData(): IBaiKiemTraCauHinh_Group {
    const data: IBaiKiemTraCauHinh_Group = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenBaiKiemTra: "",
      SoLuongDe: undefined,
      CauBiet: undefined,
      CauHieu: undefined,
      CauVanDungThap: undefined,
      CauVanDungCao: undefined,
      ThoiGianLamBai: undefined,
      HocKy: undefined,
      Lop: undefined,
      NamHoc: "",
      IdMonHoc: undefined,
      NguoiTao: undefined,
      TenNguoiTao: "",
      NgayTao: "",
      NguoiSua: undefined,
      NgaySua: "",
      TrangThai: undefined,
      IsDisabled: undefined,
      IsCustom:undefined,
      DanhSachCauHoi: [],
    };
    return data;
  }

  loadForm(): void {
    this.formThongTin = this.fb.group({
      tenBaiKiemTra: ["", Validators.required],
      namHoc: ["", Validators.required],
      soLuongDe: [1, [Validators.required, Validators.min(1)]],
      thoiGianLamBai: [1, [Validators.required, Validators.min(1)]],
      hocKy: ["", [Validators.required, Validators.min(1)]],
      lop: ["", Validators.required],
      cauBiet: [1, Validators.required],
      cauHieu: [1, Validators.required],
      cauVanDungThap: [1, Validators.required],
      cauVanDungCao: [1, Validators.required],
      cauHoi: new FormArray([]),
    });
  }

  get cauHoi() {
    return this.formThongTin.get("cauHoi") as FormArray;
  }

  //tính tổng số lượng câu hỏi trong đề
  getSum(): number {
    let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
      this.getControlsFormThongTin("cauBiet"),
      this.getControlsFormThongTin("cauHieu"),
      this.getControlsFormThongTin("cauVanDungThap"),
      this.getControlsFormThongTin("cauVanDungCao"),
    ];
    let sum: number = cauBiet + cauHieu + cauVanDungThap + cauVanDungCao;
    return sum;
  }

  getControlsFormThongTin(controlName: string): any {
    return this.formThongTin.controls[controlName].value;
  }

  //gen danh sách câu hỏi
  createQuestion() {
    this.formThongTin.disable();
    this.isLoading$ = this.services.isLoading$;
    let arrayNumber: number[] = this.getLevelForFormControls();
    let contentData = ` <br/>
                      [A]. <br/>
                      [B]. <br/>
                      [C]. <br/>
                      [D]. <br/>`;
    arrayNumber.forEach((level) => {
      const formItem = this.fb.group({
        content: [contentData],
        correct: [""],
        level: [level],
      });
      this.cauHoi.push(formItem);
    });
  }

  //phân loại danh sách câu hỏi dựa theo từng cấp độ
  getLevelForFormControls(): number[] {
    let numberArr: number[] = [];
    let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
      this.getControlsFormThongTin("cauBiet"),
      this.getControlsFormThongTin("cauHieu"),
      this.getControlsFormThongTin("cauVanDungThap"),
      this.getControlsFormThongTin("cauVanDungCao"),
    ];
    for (let i = 0; i < cauBiet; i++) {
      numberArr.push(1);
    }
    for (let i = 0; i < cauHieu; i++) {
      numberArr.push(2);
    }
    for (let i = 0; i < cauVanDungThap; i++) {
      numberArr.push(3);
    }
    for (let i = 0; i < cauVanDungCao; i++) {
      numberArr.push(4);
    }
    return numberArr;
  }

  //xử lí nội dung từ CKEditor ra các thuộc tính: Tiêu đề, các đáp án
  proceed(content: string): IQuestion {
    let title = content
      .split("[A].")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")
      .replace(/<\/?p[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();
    let cauA = content.split("[A].").pop();
    cauA = cauA
      .split("[B].")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    //cauA = cauA.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
    let cauB = content.split("[B].").pop();
    cauB = cauB
      .split("[C].")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    let cauC = content.split("[C].").pop();
    cauC = cauC
      .split("[D].")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    let cauD = content
      .split("[D].")
      .pop()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
      .replace(/<\/?p[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    //console.log(content)
    let newQuestion: IQuestion = {
      //empty data
      Id: undefined,
      Title: title,
      OptionA: cauA,
      OptionB: cauB,
      OptionC: cauC,
      OptionD: cauD,
      CorrectOption: undefined,
      IdBaiHoc: undefined,
      TenBaiHoc: "",
      IdChuong: undefined,
      TenChuong: "",
      Class: undefined,
      Level: undefined,
      TenNguoiTao: "",
      CreateDate: "",
      CreateBy: undefined,
      ModifyDate: "",
      ModifyBy: undefined,
      IsDisabled: false,
      IsCustom: false,
      IdBaiKiemTra_Group:undefined,
    };
    return newQuestion;
  }
  createDanhSachCauHoi(): IQuestion[] {
    this.formThongTin.disable();
    const danhSachCauHoi: IQuestion[] = [];
    this.cauHoi.value.forEach((element) => {
      let cauHoi: IQuestion;
      cauHoi = this.proceed(element.content);
      cauHoi.Level = element.level;
      cauHoi.CreateDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS");
      cauHoi.CreateBy = 1307;
      cauHoi.ModifyDate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS");
      cauHoi.ModifyBy = 1307;
      cauHoi.CorrectOption = parseInt(element.correct);
      cauHoi.Class = parseInt(this.formThongTin.controls["lop"].value)
      danhSachCauHoi.push(cauHoi);
    });
    return danhSachCauHoi;
  }
  prepareData(): IBaiKiemTraCauHinh_Group {
    let result: IBaiKiemTraCauHinh_Group = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenBaiKiemTra: this.formThongTin.controls["tenBaiKiemTra"].value,
      SoLuongDe: parseInt(this.formThongTin.controls["soLuongDe"].value),
      CauBiet: this.formThongTin.controls["cauBiet"].value,
      CauHieu: this.formThongTin.controls["cauHieu"].value,
      CauVanDungThap: this.formThongTin.controls["cauVanDungThap"].value,
      CauVanDungCao: this.formThongTin.controls["cauVanDungCao"].value,
      ThoiGianLamBai: this.formThongTin.controls["thoiGianLamBai"].value,
      HocKy: parseInt(this.formThongTin.controls["hocKy"].value),
      Lop: parseInt(this.formThongTin.controls["lop"].value),
      NamHoc: this.formThongTin.controls["namHoc"].value,
      IdMonHoc: 2,
      NguoiTao: 1307,
      TenNguoiTao: "",
      NgayTao: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      NguoiSua: 1307,
      NgaySua: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      TrangThai: 1,
      IsDisabled: false,
      IsCustom:true,
      DanhSachCauHoi: this.createDanhSachCauHoi(),
    };
    return result;
  }
  create(): void {
    const data = this.prepareData();
    const sbCreate = this.services
      .create(data)
      .pipe(
        tap(() => {}),
        catchError((errorMessage) => {
          console.error("UPDATE ERROR", errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res: IBaiKiemTraCauHinh_Group) => {
        if (res && res.status == 1) {
          this.data = res.data;
          //this.router.navigate(["/danh-muc/danh-sach-bai-kiem-tra/thanh-cong"]);
          this.layoutUtilsService.openSnackBar("Lưu thành công", "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar("Lưu thất bại, vui lòng kiểm tra thông tin", "Đóng");
        }
      });
    this.subscriptions.push(sbCreate);
  }

  saveTemp():void {
    const data = this.prepareData();
    const sbCreate = this.services
      .saveTemp(data)
      .pipe(
        tap(() => {}),
        catchError((errorMessage) => {
          console.error("UPDATE ERROR", errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res: IBaiKiemTraCauHinh_Group) => {
        if (res && res.status == 1) {
          this.data = res.data;
          //this.router.navigate(["/danh-muc/danh-sach-bai-kiem-tra/thanh-cong"]);
          this.layoutUtilsService.openSnackBar("Lưu thành công", "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar("Lưu thất bại, vui lòng kiểm tra thông tin", "Đóng");
        }
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
