import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReferenceModule } from "../../reference.module";
import { CRUDTableModule } from "src/app/_metronic/shared/crud-table";
import { RouterModule } from "@angular/router";
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
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import {NgxPrintModule} from 'ngx-print';
import { ChuNhiemComponent } from "./chu-nhiem.component";
import { ChuNhiemRoutingModule } from "./chu-nhiem-routing.module";
import { QuanLyThongBaoComponent } from './quan-ly-thong-bao/quan-ly-thong-bao.component';
import { QuanLyThongBaoCreateComponent } from "./quan-ly-thong-bao/quan-ly-thong-bao-create/quan-ly-thong-bao-create.component";
import { DanhSachHocSinhComponent } from "./danh-sach-hoc-sinh/danh-sach-hoc-sinh.component";

@NgModule({
  declarations: [
    ChuNhiemComponent,
    QuanLyThongBaoComponent,
    DanhSachHocSinhComponent,
    QuanLyThongBaoCreateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ChuNhiemRoutingModule,
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
  entryComponents: [ChuNhiemComponent],
})
export class ChuNhiemModule {}
