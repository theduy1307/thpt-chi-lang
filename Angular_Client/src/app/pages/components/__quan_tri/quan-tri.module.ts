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

@NgModule({
  declarations: [QuanTriComponent, MonHocComponent],
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
