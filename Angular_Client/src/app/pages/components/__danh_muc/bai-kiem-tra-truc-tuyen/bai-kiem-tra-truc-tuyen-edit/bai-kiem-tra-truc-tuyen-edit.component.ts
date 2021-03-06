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
import { BaiKiemTraTrucTuyenService } from '../bai-kiem-tra-truc-tuyen-service/bai-kiem-tra-truc-tuyen.service';
import { IBaiKiemTra_Group, IQuestion } from './../bai-kiem-tra-truc-tuyen-model/bai-kiem-tra-truc-tuyen.model';
@Component({
  selector: 'app-bai-kiem-tra-truc-tuyen-edit',
  templateUrl: './bai-kiem-tra-truc-tuyen-edit.component.html',
  styleUrls: ['./bai-kiem-tra-truc-tuyen-edit.component.scss']
})
export class BaiKiemTraTrucTuyenEditComponent implements OnInit, OnDestroy {
/* ------------------------ Inject Event Data -----------------------*/
@Input() id: number;

/* --------------------------- Loading.... --------------------------*/
isLoading$;
errorMessage = '';
isLoadingSpinner: boolean = false;
public Editor = ClassicEditor;
data: IBaiKiemTra_Group;
formThongTin: FormGroup;
danhSachCauHoi: IQuestion[];
private subscriptions: Subscription[] = [];
/* ------------------------------------------------------------------*/

constructor(
  private services: BaiKiemTraTrucTuyenService,
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
    .subscribe((res: IBaiKiemTra_Group) => {
      if (!res) {
        this.router.navigate(['/danh-muc/danh-sach-bai-kiem-tra-cau-hinh'], { relativeTo: this.route });
      }
      this.data = res.data;
      this.loadForm();
      this.setInitialQuestionList();
    });
  this.subscriptions.push(sb);
}

initialData(): IBaiKiemTra_Group {
  const data: IBaiKiemTra_Group = {
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
    hocKy: [String(this.data.HocKy) , [Validators.required, Validators.min(1)]],
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
  let arrayNumber: number[] = this.getLevelForFormControls(); //T???o array nh???n s??? l?????ng c??u h???i trong ?????
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
    const formItem = this.fb.group({
      content: [contentData],
      correct: [String(question.CorrectOption)],
      level: [question.Level],
    });
    questionFormArray.patchValue({
      content: contentData,
      correct: String(question.CorrectOption),
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
//t??nh t???ng s??? l?????ng c??u h???i trong ?????
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

//gen danh s??ch c??u h???i
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

//ph??n lo???i danh s??ch c??u h???i d???a theo t???ng c???p ?????
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

//x??? l?? n???i dung t??? CKEditor ra c??c thu???c t??nh: Ti??u ?????, c??c ????p ??n
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
    cauHoi.CorrectOption = Number(element.correct);
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
    cauHoi.CreateDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
    cauHoi.CreateBy = 1307;
    cauHoi.ModifyDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
    cauHoi.ModifyBy = 1307;
    cauHoi.CorrectOption = Number(element.correct);
    cauHoi.Class = Number(this.formThongTin.controls['lop'].value);
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

prepareData(isTemp: boolean): IBaiKiemTra_Group {
  let result: IBaiKiemTra_Group = {
    id: undefined,
    data: undefined,
    status: undefined,
    Id: this.data.Id,
    TenBaiKiemTra: this.formThongTin.controls['tenBaiKiemTra'].value,
    SoLuongDe: Number(this.formThongTin.controls['soLuongDe'].value),
    CauBiet: this.formThongTin.controls['cauBiet'].value,
    CauHieu: this.formThongTin.controls['cauHieu'].value,
    CauVanDungThap: this.formThongTin.controls['cauVanDungThap'].value,
    CauVanDungCao: this.formThongTin.controls['cauVanDungCao'].value,
    ThoiGianLamBai: this.formThongTin.controls['thoiGianLamBai'].value,
    HocKy: Number(this.formThongTin.controls['hocKy'].value),
    Lop: Number(this.formThongTin.controls['lop'].value),
    NamHoc: this.formThongTin.controls['namHoc'].value,
    IdMonHoc: 2,
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
    this.layoutUtilsService.openSnackBar('Th??ng tin ph??a tr??n c???a ????? thi ch??a ch??nh x??c', '????ng');
    return false
  }
  for(let i = 0; i<this.cauHoi.length;i++){
    let cauHoi: IQuestion;
    cauHoi = this.proceed(this.cauHoi.value[i].content);
    cauHoi.Level = this.cauHoi[i].value.level;
    cauHoi.CorrectOption = Number(this.cauHoi[i].value.correct);
    if(cauHoi.OptionA.length===0 || cauHoi.OptionB.length===0 || cauHoi.OptionC.length===0 || cauHoi.OptionD.length===0 )
    {
      this.layoutUtilsService.openSnackBar(`????p ??n c???a c??u ${this.isLoading$+1} c??n ????? tr???ng`, '????ng');
      return false
    }
    if(!cauHoi.CorrectOption)
    {
      this.layoutUtilsService.openSnackBar(`Ch??a ch???n c??u ????ng cho c??u ${i+1}`, '????ng');
      return false
    }
    if(cauHoi.Title.length === 0)
    {
      this.layoutUtilsService.openSnackBar(`Ti??u ????? c??u ${i+1} ??ang ????? tr???ng`, '????ng');
      return false
    }
  }
  return true;
}
create(): void {
  const modalRef = this.modalService.open(DeleteModalComponent);
  modalRef.componentInstance.title = 'T???o m???i b??i ki???m tra';
  modalRef.componentInstance.message = 'Sau khi x??c nh???n, th???y/c?? kh??ng ???????c ph??p ch???nh s???a n???a';
  modalRef.componentInstance.loadingMsg = '';
  modalRef.componentInstance.submitButtonMsg = 'X??c nh???n';
  modalRef.componentInstance.cancelButtonMsg = '????ng';
  modalRef.result.then(
    (result) => {
      if (result) {
        const valid = this.detectValidationPreviousSubmit()
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
          .subscribe((res: IBaiKiemTra_Group) => {
            if (res && res.status == 1) {
              this.data = res.data;
              //this.router.navigate(["/danh-muc/danh-sach-bai-kiem-tra/thanh-cong"]);
              this.layoutUtilsService.openSnackBar('L??u th??nh c??ng', '????ng');
            } else {
              this.layoutUtilsService.openSnackBar('L??u th???t b???i, vui l??ng ki???m tra th??ng tin', '????ng');
            }
          });
        this.subscriptions.push(sbCreate);
      }
    },
    () => {}
  );
}

radioChecked(id, event)
{
  console.log(id)
  console.log(event.target.value)
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
