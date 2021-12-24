import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as moment from "moment";
import { of, Subscription } from "rxjs";
import { catchError, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { BaiKiemTraCauHinhService } from "../bai-kiem-tra-cau-hinh-service/bai-kiem-tra-cau-hinh.service";
import { IBaiKiemTraCauHinh_Group, IQuestion } from "./../bai-kiem-tra-cau-hinh-model/bai-kiem-tra-cau-hinh.model";
import { AuthService, UserModel } from "src/app/modules/auth";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
@Component({
  selector: "app-bai-kiem-tra-cau-hinh-add",
  templateUrl: "./bai-kiem-tra-cau-hinh-add.component.html",
})
export class BaiKiemTraCauHinhAddComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  loadingQuestion$;
  activeQuestion: boolean = false;
  public Editor = ClassicEditor;
  data: IBaiKiemTraCauHinh_Group;
  formThongTin: FormGroup;
  danhSachCauHoi: IQuestion[];
  private subscriptions: Subscription[] = [];

  //Thông tin user
  user: UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];

  //Thông tin khi tạo mới thành công
  flagSuccess: boolean = false;
  backUrl: string = "/danh-muc/danh-sach-bai-kiem-tra-cau-hinh";
  createUrl: string = "/danh-muc/danh-sach-bai-kiem-tra-cau-hinh/them-moi-cau-hinh";

  listSelectAddQuestion: any = [
    {
      Level: 1,
      Name: "Câu biết",
    },
    {
      Level: 2,
      Name: "Câu hiểu",
    },
    {
      Level: 3,
      Name: "Câu vận dụng thấp",
    },
    {
      Level: 4,
      Name: "Câu vận dụng cao",
    },
  ];
  /* ------------------------------------------------------------------*/

  constructor(
    private services: BaiKiemTraCauHinhService,
    public userService: AuthService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private router: Router,
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
      IsCustom: undefined,
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
      cauBiet: [0, Validators.required],
      cauHieu: [0, Validators.required],
      cauVanDungThap: [0, Validators.required],
      cauVanDungCao: [0, Validators.required],
      cauHoi: new FormArray([]),
    });
    this.formThongTin.controls["cauBiet"].valueChanges.subscribe(() => {
      this.getSum();
    });
    this.formThongTin.controls["cauHieu"].valueChanges.subscribe(() => {
      this.getSum();
    });
    this.formThongTin.controls["cauVanDungThap"].valueChanges.subscribe(() => {
      this.getSum();
    });
    this.formThongTin.controls["cauVanDungCao"].valueChanges.subscribe(() => {
      this.getSum();
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
    this.services.loadingQuestion$;
    const valid = this.alertWarningCreateQuestion();
    if (!valid.error && valid.console.length == 0) {
      this.formThongTin.controls["cauBiet"].disable();
      this.formThongTin.controls["cauHieu"].disable();
      this.formThongTin.controls["cauVanDungThap"].disable();
      this.formThongTin.controls["cauVanDungCao"].disable();
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
      this.activeQuestion = true;
    } else {
      this.layoutUtilsService.openSnackBar(`${valid.console}`, "Đóng");
    }
    this.services.setLoadingQuestion(false);
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
  reCalcSum() {
    const arrLevel: number[] = [];
    this.cauHoi.value.map((element) => {
      return arrLevel.push(element.level);
    });
    this.formThongTin.controls["cauBiet"].setValue(arrLevel.filter((x) => x == 1).length);
    this.formThongTin.controls["cauHieu"].setValue(arrLevel.filter((x) => x == 2).length);
    this.formThongTin.controls["cauVanDungThap"].setValue(arrLevel.filter((x) => x == 3).length);
    this.formThongTin.controls["cauVanDungCao"].setValue(arrLevel.filter((x) => x == 4).length);
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
      IdBaiKiemTra_Group: undefined,
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
      cauHoi.Class = parseInt(this.formThongTin.controls["lop"].value);
      danhSachCauHoi.push(cauHoi);
    });
    return danhSachCauHoi;
  }

  createTemporaryQuestionList(): IQuestion[] {
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
      cauHoi.Class = parseInt(this.formThongTin.controls["lop"].value);
      if (
        cauHoi.Title.length === 0 ||
        cauHoi.OptionA.length === 0 ||
        cauHoi.OptionB.length === 0 ||
        cauHoi.OptionC.length === 0 ||
        cauHoi.OptionD.length === 0 ||
        !cauHoi.CorrectOption
      ) {
        return;
      }
      danhSachCauHoi.push(cauHoi);
    });
    return danhSachCauHoi;
  }
  prepareData(isTemp: boolean): IBaiKiemTraCauHinh_Group {
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
      IsCustom: isTemp,
      DanhSachCauHoi: !isTemp ? this.createDanhSachCauHoi() : this.createTemporaryQuestionList(),
    };
    return result;
  }
  create(): void {
    const data = this.prepareData(false);
    const sbCreate = this.services
      .create(data)
      .pipe(
        tap(() => {}),
        catchError((errorMessage) => {
          console.error("UPDATE ERROR", errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res: any) => {
        if (res && res.status == 1) {
          this.data = res.data;
          this.flagSuccess = true;
          //this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        }
      });
    this.subscriptions.push(sbCreate);
  }

  saveTemp(): void {
    const data = this.prepareData(true);
    const sbCreate = this.services
      .saveTemp(data)
      .pipe(
        tap(() => {}),
        catchError((errorMessage) => {
          console.error("UPDATE ERROR", errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res: any) => {
        if (res && res.status == 1) {
          this.data = res.data;
          this.router.navigate(["/danh-sach-bai-kiem-tra-cau-hinh"]);
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        }
      });
    this.subscriptions.push(sbCreate);
  }

  createNewQuestion(level) {
    let contentData = ` <br/>
                      [A]. <br/>
                      [B]. <br/>
                      [C]. <br/>
                      [D]. <br/>`;
    const formItem = this.fb.group({
      content: [contentData],
      correct: [""],
      level: [level],
    });
    this.cauHoi.push(formItem);
    this.reCalcSum();
  }

  removeQuestion(index: number) {
    this.cauHoi.removeAt(index);
    this.reCalcSum();
  }

  back() {
    if (this.formThongTin.dirty) {
      const modalRef = this.modalService.open(DeleteModalComponent);
      modalRef.componentInstance.title = "Trở về trang chủ";
      modalRef.componentInstance.message = "Dữ liệu chưa được lưu, thầy/cô có muốn trở về không?";
      modalRef.componentInstance.loadingMsg = "";
      modalRef.componentInstance.submitButtonMsg = "Trở về";
      modalRef.componentInstance.cancelButtonMsg = "Đóng";
      modalRef.result.then(
        (result) => {
          if (result) {
            this.router.navigate([this.backUrl]);
          }
        },
        () => {}
      );
    } else {
      this.router.navigate([this.backUrl]);
    }
  }

  /* -----------------------------------------------------------------------*/

  /*
  ----------------------------- Inject Event Data ---------------------------
  @Type:
    0: isControlValid()
    1: isControlInvalid()
    2: isControlTouched()
    3: controlHasError()*/

  validateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = "") {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
  }
  changeLevel(index: number) {
    let currentLevel: number = this.cauHoi.at(index).get("level").value;
    let newLevel = currentLevel + 1;
    if (currentLevel == 4) this.cauHoi.at(index).get("level").patchValue(1);
    else this.cauHoi.at(index).get("level").patchValue(newLevel);
    this.reCalcSum();
  }
  alertWarningCreateQuestion(): any {
    const data: any = { error: false, console: "" };
    let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
      this.getControlsFormThongTin("cauBiet"),
      this.getControlsFormThongTin("cauHieu"),
      this.getControlsFormThongTin("cauVanDungThap"),
      this.getControlsFormThongTin("cauVanDungCao"),
    ];
    if (this.formThongTin.invalid) {
      data.error = true;
      data.console = `Thông tin của đề thi điền chưa đầy đủ, thầy/cô vui lòng coi lại`;
      return data;
    } else if (cauBiet == 0 && cauHieu == 0 && cauVanDungThap == 0 && cauVanDungCao == 0) {
      data.error = true;
      data.console = "Chưa có số lượng câu hỏi nào được nhập, thầy/cô vui lòng nhập số lượng câu hỏi";
      return data;
    } else {
      data.error = false;
      data.console = "";
      return data;
    }
  }
  /* -----------------------------------------------------------------------*/
}
