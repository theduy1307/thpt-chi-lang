import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import ClassicEditor from 'src/app/pages/ckeditor';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { DeleteModalComponent } from '../../../_common/_components/delete-modal/delete-modal.component';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { IBaiKiemTra_ChiTiet } from '../../../__danh_muc/in-bai-kiem-tra/in-bai-kiem-tra-model/bai-kiem-tra.model';
import { SuccessComponent } from '../../success/success.component';
import { IBaiKiemTra_TrucTuyen_Group, IBaiKiemTra_TrucTuyen_HocSinh_ChiTiet, IQuestion } from '../bai-kiem-tra-truc-tuyen-model/bai-kiem-tra-truc-tuyen.model';
import { BaiKiemTraTrucTuyenService } from '../bai-kiem-tra-truc-tuyen-service/bai-kiem-tra-truc-tuyen.service';

@Component({
  selector: 'app-bai-kiem-tra-truc-tuyen-detail',
  templateUrl: './bai-kiem-tra-truc-tuyen-detail.component.html',
  styleUrls: ['./bai-kiem-tra-truc-tuyen-detail.component.css'],

})
export class BaiKiemTraTrucTuyenDetailComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  errorMessage = '';
  isLoadingSpinner: boolean = false;
  data: any;
  thoiGianLamBai: number;
  IdBaiKiemTraTrucTuyen_HocSinh: any;
  tenBaiKiemTra: string;
  maDe: string;
  formGroup: FormGroup;
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
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadData(): void {
    // this.data = this.initialData();
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of();
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/hoc-sinh/danh-sach-bai-kiem-tra-truc-tuyen'], { relativeTo: this.route });
        }
        this.data = res.data._check
        this.thoiGianLamBai = res.data.thoiGianLamBai;
        this.tenBaiKiemTra = res.data.tenBaiKiemTra;
        this.maDe = res.data._MaDe
        this.IdBaiKiemTraTrucTuyen_HocSinh = res.data.IdBaiKiemTraTrucTuyen_HocSinh;
        this.loadForm();
        // this.setInitialQuestionList();
      });
    this.subscriptions.push(sb);
  }
  loadForm() {
    // this.formGroup = this.fb.group({
    //   Choosen: [this.data.choosen]
    // });
  }
  // initialData(): IBaiKiemTra_TrucTuyen_Group {
  //   const data: IBaiKiemTra_TrucTuyen_Group = {
  //     id: undefined,
  //     data: undefined,
  //     status: undefined,
  //     Id: undefined,
  //     TenBaiKiemTra: '',
  //     SoLuongDe: undefined,
  //     CauBiet: undefined,
  //     CauHieu: undefined,
  //     CauVanDungThap: undefined,
  //     CauVanDungCao: undefined,
  //     ThoiGianLamBai: undefined,
  //     HocKy: undefined,
  //     Lop: undefined,
  //     NamHoc: '',
  //     IdMonHoc: undefined,
  //     NguoiTao: undefined,
  //     TenNguoiTao: '',
  //     NgayTao: '',
  //     NguoiSua: undefined,
  //     NgaySua: '',
  //     TrangThai: undefined,
  //     IsDisabled: undefined,
  //     IsCustom: undefined,
  //     DanhSachCauHoi: [],
  //   };
  //   return data;
  // }

  // loadForm(): void {
  //   this.formThongTin = this.fb.group({
  //     tenBaiKiemTra: [this.data.TenBaiKiemTra, Validators.required],
  //     namHoc: [this.data.NamHoc, Validators.required],
  //     soLuongDe: [this.data.SoLuongDe, [Validators.required, Validators.min(1)]],
  //     thoiGianLamBai: [this.data.ThoiGianLamBai, [Validators.required, Validators.min(1)]],
  //     hocKy: [String(this.data.HocKy), [Validators.required, Validators.min(1)]],
  //     lop: [this.data.Lop+'', Validators.required],
  //     cauBiet: [this.data.CauBiet, Validators.required],
  //     cauHieu: [this.data.CauHieu, Validators.required],
  //     cauVanDungThap: [this.data.CauVanDungThap, Validators.required],
  //     cauVanDungCao: [this.data.CauVanDungCao, Validators.required],
  //     cauHoi: new FormArray([]),
  //   });
  //   this.formThongTin.controls['cauBiet'].disable();
  //   this.formThongTin.controls['cauHieu'].disable();
  //   this.formThongTin.controls['cauVanDungThap'].disable();
  //   this.formThongTin.controls['cauVanDungCao'].disable();
  // }
  // get cauHoi() {
  //   return this.formThongTin.get('cauHoi') as FormArray;
  // }
  // setInitialQuestionList() {
  //   let arrayNumber: number[] = this.getLevelForFormControls(); //Tạo array nhận số lượng câu hỏi trong đề
  //   let contentData = ` <br/>
  //                     [A]. <br/>
  //                     [B]. <br/>
  //                     [C]. <br/>
  //                     [D]. <br/>`;
  //   arrayNumber.forEach((level) => {
  //     const formItem = this.fb.group({
  //       content: [contentData],
  //       correct: [''],
  //       level: [level],
  //     });
  //     this.cauHoi.push(formItem);
  //   });
  //   for (let index = 0; index < arrayNumber.length; index++) {
  //     let question = this.data.DanhSachCauHoi[index];
  //     if (!question) {
  //       break;
  //     }
  //     let questionFormArray = this.cauHoi.at(index);
  //     let contentData = `${question.Title} <br/>
  //     [A]. ${question.OptionA}<br/>
  //     [B]. ${question.OptionB}<br/>
  //     [C]. ${question.OptionC}<br/>
  //     [D]. ${question.OptionD}<br/>
  //     `;
  //     const formItem = this.fb.group({
  //       content: [contentData],
  //       correct: [String(question.CorrectOption)],
  //       level: [question.Level],
  //     });
  //     questionFormArray.patchValue({
  //       content: contentData,
  //       correct: String(question.CorrectOption),
  //       level: question.Level,
  //     });
  //   }

  //   // this.data.DanhSachCauHoi.forEach(question=>{
  //   //   let contentData = `${question.Title} <br/>
  //   //   [A]. ${question.OptionA}<br/>
  //   //   [B]. ${question.OptionB}<br/>
  //   //   [C]. ${question.OptionC}<br/>
  //   //   [D]. ${question.OptionD}<br/>
  //   //   `
  //   //   const formItem = this.fb.group({
  //   //     content: [contentData],
  //   //     correct: [question.CorrectOption.toString()],
  //   //     level: [question.Level],
  //   //   });
  //   //   this.cauHoi.push(formItem);
  //   // });
  // }
  // //tính tổng số lượng câu hỏi trong đề
  // getSum(): number {
  //   let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
  //     this.getControlsFormThongTin('cauBiet'),
  //     this.getControlsFormThongTin('cauHieu'),
  //     this.getControlsFormThongTin('cauVanDungThap'),
  //     this.getControlsFormThongTin('cauVanDungCao'),
  //   ];
  //   let sum: number = cauBiet + cauHieu + cauVanDungThap + cauVanDungCao;
  //   return sum;
  // }

  // getControlsFormThongTin(controlName: string): any {
  //   return this.formThongTin.controls[controlName].value;
  // }

  // //gen danh sách câu hỏi
  // createQuestion() {
  //   this.formThongTin.disable();
  //   this.isLoading$ = this.services.isLoading$;
  //   let arrayNumber: number[] = this.getLevelForFormControls();
  //   let contentData = ` <br/>
  //                     [A]. <br/>
  //                     [B]. <br/>
  //                     [C]. <br/>
  //                     [D]. <br/>`;
  //   arrayNumber.forEach((level) => {
  //     const formItem = this.fb.group({
  //       content: [contentData],
  //       correct: [''],
  //       level: [level],
  //     });
  //     this.cauHoi.push(formItem);
  //   });
  // }

  // //phân loại danh sách câu hỏi dựa theo từng cấp độ
  // getLevelForFormControls(): number[] {
  //   let numberArr: number[] = [];
  //   let [cauBiet, cauHieu, cauVanDungThap, cauVanDungCao] = [
  //     this.getControlsFormThongTin('cauBiet'),
  //     this.getControlsFormThongTin('cauHieu'),
  //     this.getControlsFormThongTin('cauVanDungThap'),
  //     this.getControlsFormThongTin('cauVanDungCao'),
  //   ];
  //   for (let i = 0; i < cauBiet; i++) {
  //     numberArr.push(1);
  //   }
  //   for (let i = 0; i < cauHieu; i++) {
  //     numberArr.push(2);
  //   }
  //   for (let i = 0; i < cauVanDungThap; i++) {
  //     numberArr.push(3);
  //   }
  //   for (let i = 0; i < cauVanDungCao; i++) {
  //     numberArr.push(4);
  //   }
  //   return numberArr;
  // }

  // //xử lí nội dung từ CKEditor ra các thuộc tính: Tiêu đề, các đáp án
  // proceed(content: string): IQuestion {
  //   let title = content
  //     .split('[A].')
  //     .shift()
  //     .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, '')
  //     .replace(/<\/?p[^>]*>/g, '')
  //     .replace(/&nbsp;/g, '')
  //     .trim();
  //   let cauA = content.split('[A].').pop();
  //   cauA = cauA
  //     .split('[B].')
  //     .shift()
  //     .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, '')
  //     .replace(/&nbsp;/g, '')
  //     .replace(/\\n/g, '')
  //     .trim();
  //   //cauA = cauA.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, " ")
  //   let cauB = content.split('[B].').pop();
  //   cauB = cauB
  //     .split('[C].')
  //     .shift()
  //     .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ')
  //     .replace(/&nbsp;/g, '')
  //     .replace(/\\n/g, '')
  //     .trim();
  //   let cauC = content.split('[C].').pop();
  //   cauC = cauC
  //     .split('[D].')
  //     .shift()
  //     .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ')
  //     .replace(/&nbsp;/g, '')
  //     .replace(/\\n/g, '')
  //     .trim();
  //   let cauD = content
  //     .split('[D].')
  //     .pop()
  //     .replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, ' ')
  //     .replace(/<\/?p[^>]*>/g, '')
  //     .replace(/&nbsp;/g, '')
  //     .replace(/\\n/g, '')
  //     .trim();
  //   //console.log(content)
  //   let newQuestion: IQuestion = {
  //     //empty data
  //     Id: undefined,
  //     Title: title,
  //     OptionA: cauA,
  //     OptionB: cauB,
  //     OptionC: cauC,
  //     OptionD: cauD,
  //     CorrectOption: undefined,
  //     IdBaiHoc: undefined,
  //     TenBaiHoc: '',
  //     IdChuong: undefined,
  //     TenChuong: '',
  //     Class: undefined,
  //     Level: undefined,
  //     TenNguoiTao: '',
  //     CreateDate: '',
  //     CreateBy: undefined,
  //     ModifyDate: '',
  //     ModifyBy: undefined,
  //     IsDisabled: false,
  //     IsCustom: false,
  //     IdBaiKiemTra_Group: undefined,
  //   };
  //   return newQuestion;
  // }
  // createDanhSachCauHoi(): IQuestion[] {
  //   this.formThongTin.disable();
  //   const danhSachCauHoi: IQuestion[] = [];
  //   this.cauHoi.value.forEach((element) => {
  //     let cauHoi: IQuestion;
  //     cauHoi = this.proceed(element.content);
  //     cauHoi.Level = element.level;
  //     cauHoi.CreateDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
  //     cauHoi.CreateBy = 1307;
  //     cauHoi.ModifyDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
  //     cauHoi.ModifyBy = 1307;
  //     cauHoi.CorrectOption = Number(element.correct);
  //     danhSachCauHoi.push(cauHoi);
  //   });
  //   return danhSachCauHoi;
  // }

  // createTemporaryQuestionList(): IQuestion[] {
  //   this.formThongTin.disable();
  //   const danhSachCauHoi: IQuestion[] = [];
  //   this.cauHoi.value.forEach((element) => {
  //     let cauHoi: IQuestion;
  //     cauHoi = this.proceed(element.content);
  //     cauHoi.Level = element.level;
  //     cauHoi.CreateDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
  //     cauHoi.CreateBy = 1307;
  //     cauHoi.ModifyDate = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
  //     cauHoi.ModifyBy = 1307;
  //     cauHoi.CorrectOption = Number(element.correct);
  //     cauHoi.Class = Number(this.formThongTin.controls['lop'].value);
  //     if (
  //       cauHoi.Title.length === 0 ||
  //       cauHoi.OptionA.length === 0 ||
  //       cauHoi.OptionB.length === 0 ||
  //       cauHoi.OptionC.length === 0 ||
  //       cauHoi.OptionD.length === 0 ||
  //       !cauHoi.CorrectOption
  //     ) {
  //       return;
  //     }
  //     danhSachCauHoi.push(cauHoi);
  //   });
  //   return danhSachCauHoi;
  // }

  // prepareData(isTemp: boolean): IBaiKiemTra_TrucTuyen_Group {
  //   let result: IBaiKiemTra_TrucTuyen_Group = {
  //     id: undefined,
  //     data: undefined,
  //     status: undefined,
  //     Id: this.data.Id,
  //     TenBaiKiemTra: this.formThongTin.controls['tenBaiKiemTra'].value,
  //     SoLuongDe: Number(this.formThongTin.controls['soLuongDe'].value),
  //     CauBiet: this.formThongTin.controls['cauBiet'].value,
  //     CauHieu: this.formThongTin.controls['cauHieu'].value,
  //     CauVanDungThap: this.formThongTin.controls['cauVanDungThap'].value,
  //     CauVanDungCao: this.formThongTin.controls['cauVanDungCao'].value,
  //     ThoiGianLamBai: this.formThongTin.controls['thoiGianLamBai'].value,
  //     HocKy: Number(this.formThongTin.controls['hocKy'].value),
  //     Lop: Number(this.formThongTin.controls['lop'].value),
  //     NamHoc: this.formThongTin.controls['namHoc'].value,
  //     IdMonHoc: 2,
  //     NguoiTao: 1307,
  //     TenNguoiTao: '',
  //     NgayTao: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
  //     NguoiSua: 1307,
  //     NgaySua: moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
  //     TrangThai: isTemp ? 1 : 2,
  //     IsDisabled: false,
  //     IsCustom: isTemp,
  //     DanhSachCauHoi: !isTemp ? this.createDanhSachCauHoi() : this.createTemporaryQuestionList(),
  //   };
  //   return result;
  // }
  // detectValidationPreviousSubmit():boolean {
  //   if(this.formThongTin.invalid)
  //   {
  //     this.layoutUtilsService.openSnackBar('Thông tin phía trên của đề thi chưa chính xác', 'Đóng');
  //     return false
  //   }
  //   for(let i = 0; i<this.cauHoi.length;i++){
  //     let cauHoi: IQuestion;
  //     cauHoi = this.proceed(this.cauHoi.value[i].content);
  //     cauHoi.Level = this.cauHoi[i].value.level;
  //     cauHoi.CorrectOption = Number(this.cauHoi[i].value.correct);
  //     if(cauHoi.OptionA.length===0 || cauHoi.OptionB.length===0 || cauHoi.OptionC.length===0 || cauHoi.OptionD.length===0 )
  //     {
  //       this.layoutUtilsService.openSnackBar(`Đáp án của câu ${this.isLoading$+1} còn để trồng`, 'Đóng');
  //       return false
  //     }
  //     if(!cauHoi.CorrectOption)
  //     {
  //       this.layoutUtilsService.openSnackBar(`Chưa chọn câu đúng cho câu ${i+1}`, 'Đóng');
  //       return false
  //     }
  //     if(cauHoi.Title.length === 0)
  //     {
  //       this.layoutUtilsService.openSnackBar(`Tiêu đề câu ${i+1} đang để trống`, 'Đóng');
  //       return false
  //     }
  //   }
  //   return true;
  // }
  save(): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.title = 'Hoàn tất bài kiểm tra';
    modalRef.componentInstance.message = 'Bạn có muốn hoàn tất bài kiểm tra không ???';
    modalRef.componentInstance.loadingMsg = '';
    modalRef.componentInstance.submitButtonMsg = 'Xác nhận';
    modalRef.componentInstance.cancelButtonMsg = 'Đóng';
    modalRef.result.then(
      (result) => {
        if (result) {
          const sbCreate = this.services
            .save(this.IdBaiKiemTraTrucTuyen_HocSinh)
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
                this.layoutUtilsService.openSnackBar('Lưu thành công', 'Đóng');
              } else {
                this.layoutUtilsService.openSnackBar('Lưu thất bại, vui lòng kiểm tra thông tin', 'Đóng');
              }
            });
          this.subscriptions.push(sbCreate);
          const modalRef = this.modalService.open(SuccessComponent, { size: 'xl' , backdrop:"static", keyboard:false });

        }
      },
      () => {}
    );
  }

  radioChecked(id: number, IdQueston: number, event,time) {
    // console.log(id)
    // console.log(IdQueston)
    // console.log(event.value)
    //gọi api
    // let dataItem = this.prepareData(this.id);
    // const sbCreate = this.services.update(id,IdQueston,event).pipe(
    //   tap(() => {
    //     // this.loadForm()
    //   }),
    //   catchError((errorMessage) => {
    //     this.modal.dismiss(errorMessage);
    //     return of();
    //   }),
    // ).subscribe((res) => {
    //   if (res && res.status == 1) {
    //     this.data = res.data
    //     this.layoutUtilsService.openSnackBar("Thêm mới thành công", "Đóng");
    //   } else {
    //     this.layoutUtilsService.openSnackBar("Thêm mới thất bại, vui lòng nhập lại thông tin", "Đóng");
    //   }
    // }
    // );
    // this.subscriptions.push(sbCreate);
    const sbCreate = this.services.edit(id,IdQueston,event.value, time.i.value).pipe(
      tap(() => {
        // this.modal.close();
      }),
      catchError((errorMessage) => {
        // this.modal.dismiss(errorMessage);
        return of();
      }),
    ).subscribe((res) => {
      if (res && res.status == 1) {
        // this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
      } else {
        this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
      }
    }
    );
    this.subscriptions.push(sbCreate);
  }
  onTimerFinished(event: any) {
    if (event["action"] == "done"){
      // this.router.navigate([`hoc-sinh/danh-sach-bai-kiem-tra-truc-tuyen`])
      const modalRef = this.modalService.open(SuccessComponent, { size: 'xl' , backdrop:"static", keyboard:false });
    }
  }
  // prepareData(id:number): IBaiKiemTra_TrucTuyen_HocSinh_ChiTiet {
  //   let result: IBaiKiemTra_TrucTuyen_HocSinh_ChiTiet = {
  //     Id: undefined,
  //     IdBaiKiemTraHocSinh: undefined,
  //     IdQueston: this.IdQueston,
  //     choosen: undefined,
  //     TieuDe: undefined,
  //     CauA: undefined,
  //     CauB: undefined,
  //     CauC: undefined,
  //     CauD: undefined,
  //   }
  //   return result;
  // }
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
