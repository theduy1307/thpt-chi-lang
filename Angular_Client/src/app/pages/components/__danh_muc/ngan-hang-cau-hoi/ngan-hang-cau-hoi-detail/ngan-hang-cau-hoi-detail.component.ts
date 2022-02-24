import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import * as moment from "moment";
import { IQuestion } from "../ngan-hang-cau-hoi-model/ngan-hang-cau-hoi.model";
import { QuestionService } from "../ngan-hang-cau-hoi-service/ngan-hang-cau-hoi.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EMPTY_DATA: IQuestion = {
  id: undefined,
  data: undefined,
  status: undefined,
  Id: undefined,
  Title: "",
  OptionA: "",
  OptionB: "",
  OptionC: "",
  OptionD: "",
  IdBaiHoc: 0,
  TenBaiHoc: "",
  TenChuong: "",
  TenNguoiTao: "",
  IdChuong: undefined,
  Class: undefined,
  Level: undefined,
  CorrectOption: undefined,
  CreateDate: null,
  CreateBy: undefined,
  ModifyDate: null,
  ModifyBy: undefined,
  IsDisabled: undefined,
};
@Component({
  selector: "app-ngan-hang-cau-hoi-detail",
  templateUrl: "./ngan-hang-cau-hoi-detail.component.html",
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  public Editor = ClassicEditor;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IQuestion;
  formGroup: FormGroup;
  isShort: boolean = true;
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
    private modifyService: QuestionService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.modifyService.isLoading$;
    this.loadData();
    this.loadListChuongMonHoc();
    this.loadListBaiHoc(undefined);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  loadData() {
    if (!this.id) {
      this.data = EMPTY_DATA;
      this.loadForm();
    } else {
      const sb = this.modifyService
        .getItemById(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(EMPTY_DATA);
          })
        )
        .subscribe((result: IQuestion) => {
          this.data = result.data;
          this.detectShortOption();
          this.loadForm();
        });
      this.subscriptions.push(sb);
    }
  }
  detectShortOption() {
    const [cauA, cauB, cauC, cauD] = [
      this.data.OptionA.split(" "),
      this.data.OptionB.split(" "),
      this.data.OptionC.split(" "),
      this.data.OptionD.split(" "),
    ];
    if (cauA.length <= 5 || cauB.length <= 5 || cauC.length <= 5 || cauD.length <= 5) {
      this.isShort = true;
    } else {
      this.isShort = false;
    }
  }
  loadForm() {
    // let contentData = this.data.Title + '<br/>'
    //   + 'A. ' + this.data.OptionA + '<br/>'
    //   + 'B. ' + this.data.OptionB + '<br/>'
    //   + 'C. ' + this.data.OptionC + '<br/>'
    //   + 'D. ' + this.data.OptionD + '<br/>'
    let contentData = `${this.data.Title} <br/>
                      A.${this.data.OptionA} <br/>
                      B.${this.data.OptionB} <br/>
                      C.${this.data.OptionC} <br/>
                      D.${this.data.OptionD} `;

    this.formGroup = this.fb.group({
      content: [contentData, Validators.compose([Validators.required])],
      correctOption: [this.data.CorrectOption + "", Validators.compose([Validators.required])],
      level: [this.data.Level + "", Validators.compose([Validators.required])],
      chuongMonHoc: [0, Validators.compose([Validators.required])],
      baiHoc: [`${this.data.IdBaiHoc}`, Validators.compose([Validators.required])],
    });
  }

  //#region DROPDOWN Tên chương
  loadListChuongMonHoc() {
    this.commonService.getListChuongMonHoc().subscribe((res) => {
      if (res && res.status === 1) {
        this.listChuongMonHoc = res.data;
        this.filteredListChuongMonHoc.next(this.listChuongMonHoc.slice());
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  filterListChuongMonHoc() {
    if (!this.listChuongMonHoc) {
      return;
    }
    let search = this.listChuongMonHocFilterCtrl;
    if (!search) {
      this.filteredListChuongMonHoc.next(this.listChuongMonHoc.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredListChuongMonHoc.next(
      this.listChuongMonHoc.filter((ts) => ts.TenLoai.toLowerCase().indexOf(search) > -1)
    );
    this.changeDetectorRefs.detectChanges();
  }
  getNameChuongMonHoc() {
    var item = this.listChuongMonHoc.find((res) => res.Id == +this.formGroup.controls.chuongMonHoc.value);
    if (item) {
      return item.TenChuong;
    }
    return "";
  }
  setValueChuongMonHoc(event: any) {
    let item = this.listChuongMonHoc.find((x) => x.Id == Number(event.value));
    this.loadListBaiHoc(item.Id);
  }
  //#endregion

  //#region DROPDOWN Tên chương
  loadListBaiHoc(id: any) {
    //nếu không lọc theo chương môn học thì load tất cả
    if (!id) {
      this.commonService.getListBaiHoc().subscribe((res) => {
        if (res && res.status === 1) {
          this.listBaiHoc = res.data;
          this.listFullBaiHoc = res.data;
          this.filteredListBaiHoc.next(this.listBaiHoc.slice());
          this.changeDetectorRefs.detectChanges();
        }
      });
    } else {
      this.listBaiHoc = [...this.listFullBaiHoc];
      let newList = this.listBaiHoc.filter((x) => x.IdChuong == id);
      this.listBaiHoc = [...newList];
      this.filteredListBaiHoc.next(this.listBaiHoc.slice());
      this.changeDetectorRefs.detectChanges();
    }
  }
  filterListBaiHoc() {
    if (!this.listBaiHoc) {
      return;
    }
    let search = this.listBaiHocFilterCtrl;
    if (!search) {
      this.filteredListBaiHoc.next(this.listBaiHoc.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredListBaiHoc.next(this.listBaiHoc.filter((ts) => ts.TenLoai.toLowerCase().indexOf(search) > -1));
    this.changeDetectorRefs.detectChanges();
  }
  getNameBaiHoc() {
    var item = this.listBaiHoc.find((res) => res.Id == +this.formGroup.controls.baiHoc.value);
    if (item) {
      return item.TenBaiHoc;
    }
    return "";
  }
  setValueBaiHoc(event: any) {
    let item = this.listBaiHoc.find((x) => x.Id === Number(event.value));
  }
  //#endregion
  /* -----------------------------------------------------------------------*/

  /*------------------------- CÁC THAO TÁC TRÊN FORM ----------------------*/
  private prepareQuestion() {
    let content = this.formGroup.controls["content"].value;
    let newQuestion: IQuestion = { ...this.proceed(content) };
    this.data.Title = newQuestion.Title;
    this.data.OptionA = newQuestion.OptionA;
    this.data.OptionB = newQuestion.OptionB;
    this.data.OptionC = newQuestion.OptionC;
    this.data.OptionD = newQuestion.OptionD;
    this.data.IdBaiHoc = Number(this.formGroup.controls["baiHoc"].value);
    this.data.CorrectOption = Number(this.formGroup.controls["correctOption"].value);
    this.data.Level = Number(this.formGroup.controls["level"].value);
    this.data.CreateBy = newQuestion.CreateBy;
    this.data.CreateDate = newQuestion.CreateDate;
    this.data.ModifyDate = newQuestion.ModifyDate;
    this.data.ModifyBy = newQuestion.ModifyBy;
    this.data.IsDisabled = newQuestion.IsDisabled;
  }
  save(coThemMoi: boolean) {
    this.prepareQuestion();
    if (this.data.Id) {
      this.edit();
    } else {
      this.create(coThemMoi);
    }
  }

  //tiền xử lí dữ liệu
  proceed(content: string) {
    let title = content
      .split("A.")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")
      .replace(/<\/?p[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();
    let cauA = content.split("A.").pop();
    cauA = cauA
      .split("B.")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    //cauA = cauA.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
    let cauB = content.split("B.").pop();
    cauB = cauB
      .split("C.")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    let cauC = content.split("C.").pop();
    cauC = cauC
      .split("D.")
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    let cauD = content
      .split("D.")
      .pop()
      .replace(/<\/?p[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\\n/g, "")
      .trim();
    //console.log(content)
    let newQuestion: IQuestion = {
      //empty data
      id: undefined,
      data: undefined,
      status: undefined,
      Id: this.data.Id,
      Title: title,
      OptionA: cauA,
      OptionB: cauB,
      OptionC: cauC,
      OptionD: cauD,
      IdBaiHoc: undefined,
      IdChuong: undefined,
      TenBaiHoc: "",
      TenChuong: "",
      TenNguoiTao: "",
      Class: undefined,
      Level: undefined,
      CorrectOption: undefined,
      CreateDate: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      CreateBy: 1, //this.data.CreateBy, //mã ID lấy từ bảng account
      ModifyDate: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      ModifyBy: 1,
      IsDisabled: false,
    };
    return newQuestion;
  }

  edit() {
    const sbUpdate = this.modifyService
      .update(this.data)
      .pipe(
        tap(() => {
          this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res) => {
        if (res && res.status == 1) {
          this.data = res.data;
          this.layoutUtilsService.openSnackBar("Chỉnh sửa thành công", "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar("Chỉnh sửa thất bại, vui lòng kiểm tra thông tin", "Đóng");
        }
      });
    this.subscriptions.push(sbUpdate);
  }
  create(coThemMoi: boolean) {
    const sbCreate = this.modifyService
      .create(this.data)
      .pipe(
        tap(() => {
          coThemMoi ? this.onCloseMember() : this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
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

  onCloseMember() {
    this.data = EMPTY_DATA;
    //this.c.reset();
    this.loadData();
    this.modifyService.fetch();
    this.changeDetectorRefs.detectChanges();
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
