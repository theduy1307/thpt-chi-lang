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
import { CaNhanComponent } from "./ca-nhan.component";
import { CaNhanRoutingModule } from "./ca-nhan-routing.module";
import { ThongTinCaNhanComponent } from './thong-tin-ca-nhan/thong-tin-ca-nhan.component';

@NgModule({
  declarations: [
    CaNhanComponent,
    ThongTinCaNhanComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CaNhanRoutingModule,
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
  entryComponents: [CaNhanComponent],
})
export class CaNhanModule {}
