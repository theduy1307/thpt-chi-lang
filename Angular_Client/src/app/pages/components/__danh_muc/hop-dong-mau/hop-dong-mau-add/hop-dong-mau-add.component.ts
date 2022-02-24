import { ChangeDetectorRef, Component, DoCheck, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, ReplaySubject, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from "@angular/router";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
import { HopDongMauService } from "../hop-dong-mau-service/hop-dong-mau.service";
import { FileImport, IMauHopDong, IMauHopDong_ThongTin } from "../hop-dong-mau-model/hop-dong-mau.model";
import * as moment from "moment";
@Component({
  selector: "hop-dong-mau-add",
  templateUrl: "hop-dong-mau-add.component.html",
})
export class HopDongMauAddComponent implements OnInit, OnDestroy, DoCheck {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  @ViewChild("fileUpload", { static: true }) fileUpload;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IMauHopDong;
  formGroup: FormGroup;
  thongTinHopDong: FormArray;
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
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}
  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
    this.loadListLoaiHopDong();
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
  ngDoCheck(): void {
    this.setValueTrangThai();
    let arr = this.formGroup.controls.thongTinHopDong.value;
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
      NgayHieuLuc_Tu: undefined,
      NgayHieuLuc_Den: undefined,
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
  }
  loadForm() {
    this.formGroup = this.fb.group({
      nhomHopDong: ["", Validators.compose([Validators.required])],
      trangThai: [0, Validators.compose([Validators.required])],
      tenHopDong: ["", Validators.compose([Validators.required])],
      loaiHopDong: ["", Validators.compose([Validators.required])],
      idLoaiHopDong: ["", Validators.compose([Validators.required])],
      ngayHieuLuc: [FunctionPublic.getCurrentDate(), Validators.compose([Validators.required])],
      ngayHetHieuLuc: ["", Validators.compose([Validators.required])],
      uploadFileName: ["", Validators.compose([Validators.required])],
      thongTinHopDong: this.fb.array([this.createItem()]),
    });
  }
  createItem(): FormGroup {
    return this.fb.group({
      tenTuKhoa: ["", Validators.compose([Validators.required])],
      tuKhoaThayThe: ["", Validators.compose([Validators.required])],
      noiDung: ["", Validators.compose([Validators.required])],
    });
  }
  addItem(): void {
    this.thongTinHopDong = this.formGroup.get("thongTinHopDong") as FormArray;
    this.thongTinHopDong.push(this.createItem());
  }
  deleteItem(index) {
    this.thongTinHopDong.removeAt(index);
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
  getNameLoaiHopDong() {
    var item = this.listLoaiHopDong.find((res) => res.Id == +this.formGroup.controls.idLoaiHopDong.value);
    if (item) {
      return item.TenLoai;
    }
    return "";
  }
  setValueLoaiHopDong(event: any) {
    let item = this.listLoaiHopDong.find((x) => x.Id === Number(event.value));
    this.formGroup.controls.loaiHopDong.setValue(item.Id);
  }
  setValueRule(event: any) {
    this.formGroup.controls["nhomHopDong"].setValue(`${event.value}`);
  }
  setValueTrangThai() {
    const [ngayHienTai, ngayHieuLuc, ngayHetHieuLuc] = [
      new Date(FunctionPublic.getCurrentDate()),
      new Date(this.formGroup.controls.ngayHieuLuc.value),
      new Date(this.formGroup.controls.ngayHetHieuLuc.value),
    ];
    if (ngayHieuLuc > ngayHetHieuLuc) {
      this.layoutUtilsService.openSnackBar("Ngày hiệu lực phải nhỏ hơn ngày hết hiệu lực", "Đóng");
      this.formGroup.controls.ngayHieuLuc.setValue(FunctionPublic.getCurrentDate());
      this.formGroup.controls.ngayHetHieuLuc.setValue("");
    }
    if (ngayHienTai < ngayHieuLuc) {
      this.formGroup.controls.trangThai.setValue(1);
    } else if (ngayHienTai >= ngayHieuLuc && ngayHienTai < ngayHetHieuLuc) {
      this.formGroup.controls.trangThai.setValue(2);
    } else if (ngayHienTai >= ngayHetHieuLuc) {
      this.formGroup.controls.trangThai.setValue(3);
    } else {
      this.formGroup.controls.trangThai.setValue(-1);
    }
  }
  prepareData(): IMauHopDong {
    let result: IMauHopDong = {
      //empty data
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenMau: this.formGroup.controls.tenHopDong.value,
      LoaiHopDong_Id: Number(this.formGroup.controls.idLoaiHopDong.value),
      NguoiTao: 10174,
      TenNguoiTao: "",
      ThoiGianTao: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      NguoiSua: undefined,
      ThoiGianSua: undefined,
      IsDisable: false,
      Attachment_Id: 0,
      NhomHopDong: Number(this.formGroup.controls.nhomHopDong.value),
      NgayHieuLuc_Tu: moment(new Date(this.formGroup.controls.ngayHieuLuc.value)).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      NgayHieuLuc_Den: moment(new Date(this.formGroup.controls.ngayHetHieuLuc.value)).format(
        "YYYY-MM-DD[T]HH:mm:ss.SSS"
      ),
      TrangThai: this.formGroup.controls.trangThai.value,
      FileImport: this.flagFileImport,
      FileName: "",
      DanhSachThongTinHopDong: this.prepareThongTinHopDong(),
    };
    return result;
  }
  selectFile() {
    let el: HTMLElement = this.fileUpload.nativeElement as HTMLElement;
    el.click();
  }
  prepareThongTinHopDong(): IMauHopDong_ThongTin[] {
    let result: IMauHopDong_ThongTin[] = [];
    let array: any[] = this.formGroup.controls.thongTinHopDong.value;
    array.forEach((element) => {
      let tmp: IMauHopDong_ThongTin = {
        Id: undefined,
        MauHopDong_id: undefined,
        TuKhoaThayThe: element.tuKhoaThayThe,
        TenTuKhoa: element.tenTuKhoa,
        NoiDungMacDinh: element.noiDung,
        IsDisable: false,
        NguoiSua: undefined,
        NgaySua: undefined,
      };
      result.push(tmp);
    });
    result = [...result];
    return result;
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
  create() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = undefined;
    modalRef.componentInstance.title = "Lưu thông tin";
    modalRef.componentInstance.message = "Xác nhận lưu thông tin điều khoản mẫu?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Xác nhận";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
    modalRef.result.then(
      (result) => {
        if (result) {
          let dataItems = this.prepareData();
          const sbCreate = this.services
            .create(dataItems)
            .pipe(
              tap(() => this.router.navigate(["/hop-dong/danh-muc/hop-dong-mau"])),
              catchError((errorMessage) => {
                console.error("UPDATE ERROR", errorMessage);
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
      },
      () => {}
    );
  }
  saveAndCreate() {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = undefined;
    modalRef.componentInstance.title = "Lưu thông tin";
    modalRef.componentInstance.message = "Xác nhận lưu thông tin điều khoản mẫu?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Xác nhận";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
    modalRef.result.then(
      (result) => {
        if (result) {
          let dataItems = this.prepareData();
          const sbCreate = this.services
            .create(dataItems)
            .pipe(
              tap(() => {
                this.router
                  .navigateByUrl("/", { skipLocationChange: true })
                  .then(() => this.router.navigate(["/hop-dong/danh-muc/hop-dong-mau/create"]));
              }),
              catchError((errorMessage) => {
                console.error("UPDATE ERROR", errorMessage);
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
      },
      () => {}
    );
  }
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
