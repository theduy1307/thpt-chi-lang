import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
} from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from "ng-inline-svg";
import { CustomAdapter, CustomDateParserFormatter } from "src/app/_metronic/core";
import { CRUDTableModule } from "src/app/_metronic/shared/crud-table";
import { ReferenceModule } from "../../reference.module";
import { DieuKhoanMauAddComponent } from "../__danh_muc/dieu-khoan-mau/dieu-khoan-mau-add/dieu-khoan-mau-add.component";
import { MonHocComponent } from "./quan-li-mon-hoc/quan-li-mon-hoc.component";
import { QuanTriRoutingModule } from "./quan-tri-routing.module";
import { QuanTriComponent } from "./quan-tri.component";
import { QuanLiTaiKhoanComponent } from './quan-li-tai-khoan/quan-li-tai-khoan.component';
import { QuanLiTaiKhoanCreateComponent } from './quan-li-tai-khoan/quan-li-tai-khoan-create/quan-li-tai-khoan-create.component';
import { QuanLiTaiKhoanUpdateComponent } from './quan-li-tai-khoan/quan-li-tai-khoan-update/quan-li-tai-khoan-update.component';
import { QuanLiTaiKhoanDetailComponent } from './quan-li-tai-khoan/quan-li-tai-khoan-detail/quan-li-tai-khoan-detail.component';
import { QuanLiMonHocCreateComponent } from './quan-li-mon-hoc/quan-li-mon-hoc-create/quan-li-mon-hoc-create.component';
import { QuanLiTaiKhoanEditComponent } from './quan-li-tai-khoan/quan-li-tai-khoan-edit/quan-li-tai-khoan-edit.component';
import { QuanLiMonHocEditComponent } from './quan-li-mon-hoc/quan-li-mon-hoc-edit/quan-li-mon-hoc-edit.component';
import { DanhSachChuongMonHocComponent } from './quan-li-mon-hoc/quan-li-mon-hoc-edit/components/danh-sach-chuong-mon-hoc/danh-sach-chuong-mon-hoc.component';
import { ChinhSuaChuongMonHocComponent } from './quan-li-mon-hoc/quan-li-mon-hoc-edit/components/chinh-sua-chuong-mon-hoc/chinh-sua-chuong-mon-hoc.component';
import { DanhSachBaiHocModifyComponent } from './quan-li-mon-hoc/quan-li-mon-hoc-edit/components/danh-sach-bai-hoc-modify/danh-sach-bai-hoc-modify.component';
import { QuanLiNienKhoaComponent } from './quan-li-nien-khoa/quan-li-nien-khoa.component';
import { QuanLiLopComponent } from "./quan-li-lop/quan-li-lop.component";
import { QuanLiNienKhoaAddComponent } from './quan-li-nien-khoa/quan-li-nien-khoa-add/quan-li-nien-khoa-add.component';
import { QuanLiNienKhoaEditComponent } from './quan-li-nien-khoa/quan-li-nien-khoa-edit/quan-li-nien-khoa-edit.component';
import { QuanLiLopAddComponent } from "./quan-li-lop/quan-li-lop-add/quan-li-lop-add.component";
import { QuanLiLopEditComponent } from "./quan-li-lop/quan-li-lop-edit/quan-li-lop-edit.component";
import { ThemMoiChuongMonHocComponent } from './quan-li-mon-hoc/quan-li-mon-hoc-edit/components/them-moi-chuong-mon-hoc/them-moi-chuong-mon-hoc.component';
import { QuanLiTaiKhoanHocSinhComponent } from './quan-li-tai-khoan-hoc-sinh/quan-li-tai-khoan-hoc-sinh.component';
import { QuanLiTaiKhoanHocSinhCreateComponent } from './quan-li-tai-khoan-hoc-sinh/quan-li-tai-khoan-hoc-sinh-create/quan-li-tai-khoan-hoc-sinh-create.component';
import { QuanLiTaiKhoanHocSinhImportComponent } from './quan-li-tai-khoan-hoc-sinh/quan-li-tai-khoan-hoc-sinh-import/quan-li-tai-khoan-hoc-sinh-import.component';

@NgModule({
  declarations: [QuanTriComponent, MonHocComponent, QuanLiTaiKhoanComponent, QuanLiTaiKhoanCreateComponent, QuanLiTaiKhoanUpdateComponent, QuanLiTaiKhoanDetailComponent, QuanLiMonHocCreateComponent, QuanLiTaiKhoanEditComponent, QuanLiNienKhoaAddComponent, QuanLiNienKhoaEditComponent,QuanLiNienKhoaComponent,QuanLiLopComponent,QuanLiNienKhoaAddComponent, QuanLiLopAddComponent, QuanLiLopEditComponent,QuanLiMonHocEditComponent, DanhSachChuongMonHocComponent, ChinhSuaChuongMonHocComponent, DanhSachBaiHocModifyComponent, ThemMoiChuongMonHocComponent, QuanLiTaiKhoanHocSinhComponent, QuanLiTaiKhoanHocSinhCreateComponent, QuanLiTaiKhoanHocSinhImportComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    QuanTriRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    ReferenceModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    RouterModule,
    MatTooltipModule,
    MatStepperModule,
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  entryComponents: [DieuKhoanMauAddComponent],
})
export class QuanTriModule {}
