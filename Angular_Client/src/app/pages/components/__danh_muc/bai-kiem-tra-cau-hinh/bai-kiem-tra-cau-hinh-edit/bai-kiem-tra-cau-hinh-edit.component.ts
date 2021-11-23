import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DeleteModalComponent } from '../../../_common/_components/delete-modal/delete-modal.component';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { BaiKiemTraCauHinhService } from '../bai-kiem-tra-cau-hinh-service/bai-kiem-tra-cau-hinh.service';
import { IBaiKiemTraCauHinh_Group, IQuestion } from './../bai-kiem-tra-cau-hinh-model/bai-kiem-tra-cau-hinh.model';
@Component({
  selector: 'app-bai-kiem-tra-cau-hinh-edit',
  templateUrl: './bai-kiem-tra-cau-hinh-edit.component.html',
})
export class BaiKiemTraCauHinhEditComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  errorMessage = '';
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
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadData(): void {
    this.data = this.initialData();
    this.loadForm();
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of(this.initialData());
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: IBaiKiemTraCauHinh_Group) => {
        if (!res) {
          this.router.navigate(['/danh-muc/danh-sach-bai-kiem-tra-cau-hinh'], { relativeTo: this.route });
        }
        this.data = res.data;
        this.loadForm();
        this.setInitialQuestionList();
      });
    this.subscriptions.push(sb);
  }

  initialData(): IBaiKiemTraCauHinh_Group {
    const data: IBaiKiemTraCauHinh_Group = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenBaiKiemTra: '',
      SoLuongDe: undefined,
      CauBiet: undefined,
      CauHieu: undefined,
      CauVanDungThap: undefined,
      CauVanDungCao: undefined,
      ThoiGianLamBai: undefined,
      HocKy: undefined,
      Lop: undefined,
      NamHoc: '',
      IdMonHoc: undefined,
      NguoiTao: undefined,
      TenNguoiTao: '',
      NgayTao: '',
      NguoiSua: undefined,
      NgaySua: '',
      TrangThai: undefined,
      IsDisabled: undefined,
      IsCustom: undefined,
      DanhSachCauHoi: [],
    };
    return data;
  }

  loadForm(): void {
    this.formThongTin = this.fb.group({
      tenBaiKiemTra: [this.data.TenBaiKiemTra, Validators.required],
      namHoc: [this.data.NamHoc, Validators.required],
      soLuongDe: [this.data.SoLuongDe, [Validators.required, Validators.min(1)]],
      thoiGianLamBai: [this.data.ThoiGianLamBai, [Validators.required, Validators.min(1)]],
      hocKy: [this.data.HocKy + '', [Validators.required, Validators.min(1)]],
      lop: [this.data.Lop+'', Validators.required],
      cauBiet: [this.data.CauBiet, Validators.required],
      cauHieu: [this.data.CauHieu, Validators.required],
      cauVanDungThap: [this.data.CauVanDungThap, Validators.required],
      cauVanDungCao: [this.data.CauVanDungCao, Validators.required],
      cauHoi: new FormArray([]),
    });
    this.formThongTin.controls['cauBiet'].disable();
    this.formThongTin.controls['cauHieu'].disable();
    this.formThongTin.controls['cauVanDungThap'].disable();
    this.formThongTin.controls['cauVanDungCao'].disable();
  }

  get cauHoi() {
    return this.formThongTin.get('cauHoi') as FormArray;
  }
  setInitialQuestionList() {
    let arrayNumber: number[] = this.getLevelForFormControls(); //Tạo array nhận số lượng câu hỏi trong đề
    let contentData = ` <br/>
                      [A]. <br/>
                      [B]. <br/>
                      [C]. <br/>
                      [D]. <br/>`;
    arrayNumber.forEach((level) => {
      const formItem = this.fb.group({
        id:[0],
        content: [contentData],
        correct: [''],
        level: [level],
      });
      this.cauHoi.push(formItem);
    });
    for (let index = 0; index < arrayNumber.length; index++) {
      let question = this.data.DanhSachCauHoi[index];
      if (!question) {
        break;
      }
      let questionFormArray = this.cauHoi.at(index);
      let contentData = `${question.Title} <br/>
      [A]. ${question.OptionA}<br/>
      [B]. ${question.OptionB}<br/>
      [C]. ${question.OptionC}<br/>
      [D]. ${question.OptionD}<br/>
      `;
      questionFormArray.patchValue({
        id: question.Id,
        content: contentData,
        correct: question.CorrectOption + '',
        level: question.Level,
      });
    }

    // this.data.DanhSachCauHoi.forEach(question=>{
    //   let contentData = `${question.Title} <br/>
    //   [A]. ${question.OptionA}<br/>
    //   [B]. ${question.OptionB}<br/>
    //   [C]. ${question.OptionC}<br/>
    //   [D]. ${question.OptionD}<br/>
    //   `
    //   const formItem = this.fb.group({
    //     content: [contentData],
    //     correct: [question.CorrectOption.toString()],
    //     level: [question.Level],
    //   });
    //   this.cauHoi.push(formItem);
    // });
  }
  //tính tổng số lượng câu hỏi trong đề
  getSum(): number {
    let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
      this.getControlsFormThongTin('cauBiet'),
      this.getControlsFormThongTin('cauHieu'),
      this.getControlsFormThongTin('cauVanDungThap'),
      this.getControlsFormThongTin('cauVanDungCao'),
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
        correct: [''],
        level: [level],
      });
      this.cauHoi.push(formItem);
    });
  }

  //phân loại danh sách câu hỏi dựa theo từng cấp độ
  getLevelForFormControls(): number[] {
    let numberArr: number[] = [];
    let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
      this.getControlsFormThongTin('cauBiet'),
      this.getControlsFormThongTin('cauHieu'),
      this.getControlsFormThongTin('cauVanDungThap'),
      this.getControlsFormThongTin('cauVanDungCao'),
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
      .split('[A].')
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, '')
      .replace(/<\/?p[^>]*>/g, '')
      .replace(/&nbsp;/g, '')
      .trim();
    let cauA = content.split('[A].').pop();
    cauA = cauA
      .split('[B].')
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, '')
      .replace(/&nbsp;/g, '')
      .replace(/\\n/g, '')
      .trim();
    //cauA = cauA.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
    let cauB = content.split('[B].').pop();
    cauB = cauB
      .split('[C].')
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ')
      .replace(/&nbsp;/g, '')
      .replace(/\\n/g, '')
      .trim();
    let cauC = content.split('[C].').pop();
    cauC = cauC
      .split('[D].')
      .shift()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ')
      .replace(/&nbsp;/g, '')
      .replace(/\\n/g, '')
      .trim();
    let cauD = content
      .split('[D].')
      .pop()
      .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ')
      .replace(/<\/?p[^>]*>/g, '')
      .replace(/&nbsp;/g, '')
      .replace(/\\n/g, '')
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
      TenBaiHoc: '',
      IdChuong: undefined,
      TenChuong: '',
      Class: undefined,
      Level: undefined,
      TenNguoiTao: '',
      CreateDate: '',
      CreateBy: undefined,
      ModifyDate: '',
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
      cauHoi.CreateDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
      cauHoi.CreateBy = 1307;
      cauHoi.ModifyDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
      cauHoi.ModifyBy = 1307;
      cauHoi.CorrectOption = parseInt(element.correct);
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
      cauHoi.Id = element.id
      cauHoi.Level = element.level;
      cauHoi.CreateDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
      cauHoi.CreateBy = 1307;
      cauHoi.ModifyDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
      cauHoi.ModifyBy = 1307;
      cauHoi.CorrectOption = parseInt(element.correct);
      cauHoi.Class = parseInt(this.formThongTin.controls['lop'].value);
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
      Id: this.data.Id,
      TenBaiKiemTra: this.formThongTin.controls['tenBaiKiemTra'].value,
      SoLuongDe: parseInt(this.formThongTin.controls['soLuongDe'].value),
      CauBiet: this.formThongTin.controls['cauBiet'].value,
      CauHieu: this.formThongTin.controls['cauHieu'].value,
      CauVanDungThap: this.formThongTin.controls['cauVanDungThap'].value,
      CauVanDungCao: this.formThongTin.controls['cauVanDungCao'].value,
      ThoiGianLamBai: this.formThongTin.controls['thoiGianLamBai'].value,
      HocKy: parseInt(this.formThongTin.controls['hocKy'].value),
      Lop: parseInt(this.formThongTin.controls['lop'].value),
      NamHoc: this.formThongTin.controls['namHoc'].value,
      IdMonHoc: 8,
      NguoiTao: 1307,
      TenNguoiTao: '',
      NgayTao: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
      NguoiSua: 1307,
      NgaySua: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
      TrangThai: isTemp ? 1 : 2,
      IsDisabled: false,
      IsCustom: isTemp,
      DanhSachCauHoi: !isTemp ? this.createDanhSachCauHoi() : this.createTemporaryQuestionList(),
    };
    return result;
  }
  detectValidationPreviousSubmit():boolean {
    if(this.formThongTin.invalid)
    {
      this.layoutUtilsService.openSnackBar('Thông tin phía trên của đề thi chưa chính xác', 'Đóng');
      return false
    }
    for(let i = 0; i<this.cauHoi.length;i++){
      let cauHoi: IQuestion;
      cauHoi = this.proceed(this.cauHoi.value[i].content);
      cauHoi.Level = this.cauHoi[i].value.level;
      cauHoi.CorrectOption = parseInt(this.cauHoi[i].value.correct);
      if(cauHoi.OptionA.length===0 || cauHoi.OptionB.length===0 || cauHoi.OptionC.length===0 || cauHoi.OptionD.length===0 )
      {
        this.layoutUtilsService.openSnackBar(`Đáp án của câu ${this.isLoading$+1} còn để trồng`, 'Đóng');
        return false
      }
      if(!cauHoi.CorrectOption)
      {
        this.layoutUtilsService.openSnackBar(`Chưa chọn câu đúng cho câu ${i+1}`, 'Đóng');
        return false
      }
      if(cauHoi.Title.length === 0)
      {
        this.layoutUtilsService.openSnackBar(`Tiêu đề câu ${i+1} đang để trống`, 'Đóng');
        return false
      }
    }
    return true;
  }
  create(): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.title = 'Tạo mới bài kiểm tra';
    modalRef.componentInstance.message = 'Sau khi xác nhận, thầy/cô không được phép chỉnh sửa nữa';
    modalRef.componentInstance.loadingMsg = '';
    modalRef.componentInstance.submitButtonMsg = 'Xác nhận';
    modalRef.componentInstance.cancelButtonMsg = 'Đóng';
    modalRef.result.then(
      (result) => {
        if (result) {
          //const valid = this.detectValidationPreviousSubmit()
          const data = this.prepareData(false);
          const sbCreate = this.services
            .create(data)
            .pipe(
              tap(() => {}),
              catchError((errorMessage) => {
                console.error('UPDATE ERROR', errorMessage);
                return of(this.data);
              })
            )
            .subscribe((res: any) => {
              if (res && res.status == 1) {
                this.data = res.data;
                this.router.navigate(["/danh-muc/danh-sach-bai-kiem-tra-cau-hinh"]);
                this.layoutUtilsService.openSnackBar(res.error.message, 'Đóng');
              } else {
                this.layoutUtilsService.openSnackBar(res.error.message, 'Đóng');
              }
            });
          this.subscriptions.push(sbCreate);
        }
      },
      () => {}
    );
  }
  saveTemp(): void {
    const data = this.prepareData(true);
    const sbCreate = this.services
      .editSaveTemporary(data)
      .pipe(
        tap(() => {}),
        catchError((errorMessage) => {
          console.error('UPDATE ERROR', errorMessage);
          return of(this.data);
        })
      )
      .subscribe((res: any) => {
        if (res && res.status == 1) {
          this.data = res.data;
          //this.router.navigate(["/danh-muc/danh-sach-bai-kiem-tra/thanh-cong"]);
          this.layoutUtilsService.openSnackBar(res.error.message, 'Đóng');
        } else {
          this.layoutUtilsService.openSnackBar(res.error.message, 'Đóng');
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

  ValidateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = '') {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
  }

  /* -----------------------------------------------------------------------*/
}
