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
import { BaiKiemTraTrucTuyenComponent } from "./bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen.component";
import { QuanTriRoutingModule } from "./hoc-sinh-routing.module";
import { HocSinhComponent } from "./hoc-sinh.component";
import { BaiKiemTraTrucTuyenDetailComponent } from './bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen-detail/bai-kiem-tra-truc-tuyen-detail.component';
import { PasswordComponent } from "./bai-kiem-tra-truc-tuyen/components/password/password.component";
import { CountdownModule } from "ngx-countdown";

@NgModule({
  declarations: [HocSinhComponent, BaiKiemTraTrucTuyenComponent, BaiKiemTraTrucTuyenDetailComponent,PasswordComponent],
  imports: [
    CountdownModule,
    CommonModule,
    HttpClientModule,
    QuanTriRoutingModule,
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
export class HocSinhModule {}
