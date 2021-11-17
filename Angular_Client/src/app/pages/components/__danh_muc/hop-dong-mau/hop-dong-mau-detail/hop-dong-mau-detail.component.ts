import { ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbDateParserFormatter, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, finalize, first, switchMap, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from "@angular/router";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
import { HopDongMauService } from "../hop-dong-mau-service/hop-dong-mau.service";
import { FileImport, IMauHopDong, IMauHopDong_ThongTin } from "../hop-dong-mau-model/hop-dong-mau.model";
import * as moment from "moment";
import { T } from "@angular/cdk/keycodes";
@Component({
  selector: "hop-dong-mau-detail",
  templateUrl: "hop-dong-mau-detail.component.html",
})
export class HopDongMauDetailComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  @ViewChild("fileUpload", { static: true }) fileUpload;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IMauHopDong;
  errorMessage = "";
  formGroup: FormGroup;
  fileDownload: any;
  danhSachThongTinHopDong: IMauHopDong_ThongTin[] = [];
  private subscriptions: Subscription[] = [];
  public Editor = ClassicEditor;
  fileToUpload: File | null = null;
  fileToUpLoadName: string | "";
  flagFileImport: FileImport = new FileImport();
  flagFileDownload: any;
  /* --------------------------- Loading.... --------------------------*/
  //Thông tin điều khoản
  listLoaiHopDong: any[] = [];
  filteredListLoaiHopDong: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  listLoaiHopDongFilterCtrl: string = "";
  /* ------------------------------------------------------------------*/

  constructor(
    private services: HopDongMauService,
    private commonService: DungChungService,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}
  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadListLoaiHopDong();
    this.loadData();
    this.services.data_import.subscribe((res) => {
      if (res != null && res != undefined) {
        for (let i = 0; i < res.length; i++) {
          this.flagFileImport = new FileImport();
          this.flagFileImport.clear();
          this.flagFileImport.filename = res[i].fileName;
          this.flagFileImport.extension = res[i].extension;
          this.flagFileImport.base64 = res[i].base64;
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  initData(): IMauHopDong {
    const EMPTY_Data: IMauHopDong = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenMau: "",
      LoaiHopDong_Id: undefined,
      NguoiTao: 0,
      TenNguoiTao: "",
      ThoiGianTao: undefined,
      NguoiSua: 0,
      ThoiGianSua: undefined,
      IsDisable: undefined,
      NgayHieuLuc_Tu: FunctionPublic.getCurrentDate(),
      NgayHieuLuc_Den: FunctionPublic.getCurrentDate(),
      TrangThai: undefined,
      NhomHopDong: undefined,
      Attachment_Id: undefined,
      FileImport: new FileImport(),
      FileName: "",
      DanhSachThongTinHopDong: [],
    };
    return EMPTY_Data;
  }
  loadData() {
    this.data = this.initData();
    this.loadForm();
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get("id"));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of(this.initData());
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: IMauHopDong) => {
        if (!res) {
          this.router.navigate(["/hop-dong-mau"], { relativeTo: this.route });
        }
        this.data = res.data;
        this.loadForm();
        this.fileDownload = this.data.Attachment_Id;
        this.flagFileImport = this.data.FileImport;
        this.danhSachThongTinHopDong = this.data.DanhSachThongTinHopDong;
      });
    this.subscriptions.push(sb);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      nhomHopDong: [this.data.NhomHopDong + "", Validators.compose([Validators.required])],
      trangThai: [this.data.TrangThai, Validators.compose([Validators.required])],
      tenHopDong: [this.data.TenMau, Validators.compose([Validators.required])],
      loaiHopDong: [this.getNameLoaiHopDong(this.data.LoaiHopDong_Id), Validators.compose([Validators.required])],
      idLoaiHopDong: [this.data.LoaiHopDong_Id, Validators.compose([Validators.required])],
      ngayHieuLuc: [
        moment(new Date(this.data.NgayHieuLuc_Tu)).format("MM/DD/YYYY"),
        Validators.compose([Validators.required]),
      ],
      ngayHetHieuLuc: [
        moment(new Date(this.data.NgayHieuLuc_Den)).format("MM/DD/YYYY"),
        Validators.compose([Validators.required]),
      ],
      uploadFileName: [this.data.FileName],
    });
    this.formGroup.disable();
  }
  loadListLoaiHopDong() {
    this.commonService.getListLoaiHopDong().subscribe((res) => {
      if (res && res.status === 1) {
        this.listLoaiHopDong = res.data;
        this.filteredListLoaiHopDong.next(this.listLoaiHopDong.slice());
        this.changeDetectorRefs.detectChanges();
      }
    });
  }
  filterListLoaiHopDong() {
    if (!this.listLoaiHopDong) {
      return;
    }
    let search = this.listLoaiHopDongFilterCtrl;
    if (!search) {
      this.filteredListLoaiHopDong.next(this.listLoaiHopDong.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredListLoaiHopDong.next(
      this.listLoaiHopDong.filter((ts) => ts.TenLoai.toLowerCase().indexOf(search) > -1)
    );
    this.changeDetectorRefs.detectChanges();
  }
  getNameLoaiHopDong(id: number) {
    var item = this.listLoaiHopDong.find((res) => res.Id === id);
    if (item) {
      console.log(item);
      return item.TenLoai;
    }
    return "";
  }
  // downloadFile() {
  //     this.commonService.downloadTemplate(this.flagFileImport.idLoaiHH).subscribe(blob => {
  // 		var downloadLink = document.createElement("a");
  // 		var url = URL.createObjectURL(blob);
  // 		downloadLink.href = url;
  //         downloadLink.download = this.flagFileImport.filename + '.' + this.flagFileImport.extension;
  // 		document.body.appendChild(downloadLink);
  // 		downloadLink.click();
  // 		document.body.removeChild(downloadLink);
  // 	});
  // }
  downloadFile(idctdn: number) {
    let linkdownload = this.services.downloadTemplate(idctdn);
    window.open(linkdownload);
  }
  setValueLoaiHopDong(event: any) {
    let item = this.listLoaiHopDong.find((x) => x.Id === parseInt(event.value));
    this.formGroup.controls.loaiHopDong.setValue(item.Id);
  }
  setValueRule(event: any) {
    this.formGroup.controls["nhomHopDong"].setValue(`${event.value}`);
  }

  selectFile() {
    let el: HTMLElement = this.fileUpload.nativeElement as HTMLElement;
    el.click();
  }
  FileSelected(evt: any) {
    this.data.Attachment_Id = 0;
    if (evt.target.files && evt.target.files.length) {
      let fileNameList = [];
      for (let i = 0; i < evt.target.files.length; i++) {
        let file = evt.target.files[i];
        this.flagFileDownload = file;
        let fileName = file.name;
        fileNameList.push(fileName);
      }
      let listFileNameStr = fileNameList[0];
      for (var i = 1; i < fileNameList.length; i++) {
        listFileNameStr += ", " + fileNameList[i];
      }
      this.formGroup.controls["uploadFileName"].setValue(listFileNameStr);

      let el: any = this.fileUpload.nativeElement;
      var service = this.services;
      var useBase64: boolean = true;
      let tmpDataArray: any = [];

      for (var idx = 0; idx < el.files.length; idx++) {
        var extension = el.files[idx].name.split(".").pop();
        var fileName = el.files[idx].name.substring(0, el.files[idx].name.indexOf(extension) - 1);

        let reader = new FileReader();
        reader.readAsDataURL(el.files[idx]);
        reader.onload = function () {
          let base64Str = reader.result as String;
          var metaIdx = base64Str.indexOf(";base64,");

          base64Str = base64Str.substr(metaIdx + 8);
          var data = {
            fileName: fileName,
            base64: base64Str,
            extension: extension,
          };

          tmpDataArray.push(data);
          service.data_import.next(tmpDataArray);
        };
      }
    }
    evt.target.type = "text";
    evt.target.type = "file";
  }
  // saveAndCreate() {
  //     const modalRef = this.modalService.open(DeleteModalComponent);
  //     modalRef.componentInstance.id = undefined;
  //     modalRef.componentInstance.title = "Lưu thông tin";
  //     modalRef.componentInstance.message = "Xác nhận lưu thông tin điều khoản mẫu?";
  //     modalRef.componentInstance.loadingMsg = "";
  //     modalRef.componentInstance.submitButtonMsg = "Xác nhận";
  //     modalRef.componentInstance.cancelButtonMsg = "Đóng";
  //     modalRef.result.then((result) => {
  //         if (result) {
  //             let dataItems = this.prepareData()
  //             const sbCreate = this.services.create(dataItems).pipe(
  //                 tap(() => {
  //                     this.formGroup.reset()
  //                 }),
  //                 catchError((errorMessage) => {
  //                     this.modal.dismiss(errorMessage);
  //                     return of(this.data);
  //                 }),
  //             ).subscribe((res: IMauHopDong) => {
  //                 if (res && res.status == 1) {
  //                     this.data = res.data
  //                     this.layoutUtilsService.openSnackBar("Thêm mới thành công", "Đóng");
  //                 } else {
  //                     this.layoutUtilsService.openSnackBar("Thêm mới thất bại, vui lòng nhập lại thông tin", "Đóng");
  //                 }
  //             }
  //             );
  //             this.subscriptions.push(sbCreate);
  //         }
  //     },
  //         () => { });
  // }
  // close() {
  //     const formValue = this.formGroup.value
  //     if (formValue.nhomHopDong.length === 0 && formValue.tenDieuKhoan.length === 0 && formValue.chiTietDieuKhoan.length === 0 && formValue.ghiChu.length === 0) {
  //         this.modal.close()
  //     }
  //     else {
  //         const modalRef = this.modalService.open(DeleteModalComponent);
  //         modalRef.componentInstance.id = undefined;
  //         modalRef.componentInstance.title = "Cảnh báo";
  //         modalRef.componentInstance.message = "Những thông tin đã nhập sẽ không được lưu. Bạn có muốn tiếp tục ?";
  //         modalRef.componentInstance.loadingMsg = "";
  //         modalRef.componentInstance.submitButtonMsg = "Xác nhận";
  //         modalRef.componentInstance.cancelButtonMsg = "Đóng";
  //         modalRef.result.then((result) => {
  //             if (result) {
  //                 this.modal.close()
  //             }
  //         },
  //             () => { });
  //     }
  // }
  /* -----------------------------------------------------------------------*/
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
