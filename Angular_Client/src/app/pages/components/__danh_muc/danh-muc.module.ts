import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReferenceModule } from "../../reference.module";
import { DanhMucRoutingModule } from "./danh-muc-routing.module";
import { CRUDTableModule } from "src/app/_metronic/shared/crud-table";
import { RouterModule } from "@angular/router";
import { DanhMucComponent } from "./danh-muc.component";
import { CustomAdapter, CustomDateParserFormatter } from "src/app/_metronic/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbModalModule,
  NgbDropdownModule,
} from "@ng-bootstrap/ng-bootstrap";
import { MatStepperModule } from "@angular/material/stepper";
import { QuestionModifyComponent } from "./ngan-hang-cau-hoi/ngan-hang-cau-hoi-modify/ngan-hang-cau-hoi-modify.component";
import { QuestionComponent } from "./ngan-hang-cau-hoi/ngan-hang-cau-hoi.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import {NgxPrintModule} from 'ngx-print';

import { DieuKhoanMauComponent } from "./dieu-khoan-mau/dieu-khoan-mau.component";
import { DieuKhoanMauAddComponent } from "./dieu-khoan-mau/dieu-khoan-mau-add/dieu-khoan-mau-add.component";
import { DieuKhoanMauEditComponent } from "./dieu-khoan-mau/dieu-khoan-mau-edit/dieu-khoan-mau-edit.component";
import { DieuKhoanMauDetailComponent } from "./dieu-khoan-mau/dieu-khoan-mau-detail/dieu-khoan-mau-detail.component";
import { HanMucChietKhauComponent } from "./han-muc-chiet-khau/han-muc-chiet-khau.component";
import { HanMucChietKhauAddComponent } from "./han-muc-chiet-khau/han-muc-chiet-khau-add/han-muc-chiet-khau-add.component";
import { HanMucChietKhauDetailComponent } from "./han-muc-chiet-khau/han-muc-chiet-khau-detail/han-muc-chiet-khau-detail.component";
import { HanMucChietKhauEditComponent } from "./han-muc-chiet-khau/han-muc-chiet-khau-edit/han-muc-chiet-khau-edit.component";
import { HopDongMauComponent } from "./hop-dong-mau/hop-dong-mau.component";
import { HopDongMauAddComponent } from "./hop-dong-mau/hop-dong-mau-add/hop-dong-mau-add.component";
import { HopDongMauEditComponent } from "./hop-dong-mau/hop-dong-mau-edit/hop-dong-mau-edit.component";
import { LoaiHopDongComponent } from "./loai-hop-dong/loai-hop-dong.component";
import { LoaiHopDongAddComponent } from "./loai-hop-dong/loai-hop-dong-add/loai-hop-dong-add.component";
import { LoaiHopDongEditComponent } from "./loai-hop-dong/loai-hop-dong-edit/loai-hop-dong-edit.component";
import { LoaiHopDongDetailComponent } from "./loai-hop-dong/loai-hop-dong-detail/loai-hop-dong-detail.component";
import { HopDongMauDetailComponent } from "./hop-dong-mau/hop-dong-mau-detail/hop-dong-mau-detail.component";
import { QuestionDetailComponent } from "./ngan-hang-cau-hoi/ngan-hang-cau-hoi-detail/ngan-hang-cau-hoi-detail.component";
import { BaiKiemTraComponent } from "./bai-kiem-tra/bai-kiem-tra.component";
import { BaiKiemTraAddComponent } from "./bai-kiem-tra/bai-kiem-tra-add/bai-kiem-tra-add.component";
import { SuccessComponent } from "./bai-kiem-tra/bai-kiem-tra-add/success/success.component";
import { BaiKiemTraCauHinhComponent } from "./bai-kiem-tra-cau-hinh/bai-kiem-tra-cau-hinh.component";
import { BaiKiemTraCauHinhAddComponent } from "./bai-kiem-tra-cau-hinh/bai-kiem-tra-cau-hinh-add/bai-kiem-tra-cau-hinh-add.component";
import { InBaiKiemTraComponent } from "./in-bai-kiem-tra/in-bai-kiem-tra.component";
import { BaiKiemTraCauHinhEditComponent } from './bai-kiem-tra-cau-hinh/bai-kiem-tra-cau-hinh-edit/bai-kiem-tra-cau-hinh-edit.component';
import { BaiKiemTraTrucTuyenComponent } from './bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen.component';

@NgModule({
  declarations: [
    DanhMucComponent,
    DieuKhoanMauComponent,
    DieuKhoanMauAddComponent,
    DieuKhoanMauEditComponent,
    DieuKhoanMauDetailComponent,
    HanMucChietKhauComponent,
    HanMucChietKhauAddComponent,
    HanMucChietKhauDetailComponent,
    HanMucChietKhauEditComponent,
    HopDongMauComponent,
    HopDongMauAddComponent,
    HopDongMauEditComponent,
    LoaiHopDongComponent,
    LoaiHopDongAddComponent,
    LoaiHopDongEditComponent,
    LoaiHopDongDetailComponent,
    HopDongMauDetailComponent,
    QuestionComponent,
    QuestionModifyComponent,
    QuestionDetailComponent,
    BaiKiemTraComponent,
    BaiKiemTraAddComponent,
    SuccessComponent,
    BaiKiemTraCauHinhComponent,
    BaiKiemTraCauHinhAddComponent,
    InBaiKiemTraComponent,
    BaiKiemTraCauHinhEditComponent,
    BaiKiemTraTrucTuyenComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DanhMucRoutingModule,
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
    NgxPrintModule
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  entryComponents: [DieuKhoanMauAddComponent],
})
export class DanhMucModule {}
