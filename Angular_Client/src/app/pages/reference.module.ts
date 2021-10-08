import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgbProgressbarModule, NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
//Extends Services
import { DungChungService } from './components/_common/_services/dung-chung.service';
import { TranslationModule } from '../modules/i18n/translation.module';
import { MY_FORMATS_EDIT } from '../_global/_services/datepicker';
import { HttpUtilsService } from '../_global/_services/http-utils.service';
import { TokenStorage } from '../_global/_services/token-storage.service';
import { LayoutUtilsService } from '../_global/_services/layout-utils.service';
import { LayoutService } from '../_metronic/core';
import { MaterialsAngularModule } from './materials.module';
import { LayoutModule } from './layout.module';
import { DeleteModalComponent } from './components/_common/_components/delete-modal/delete-modal.component';
import { DeleteManyModalComponent } from './components/_common/_components/delete-many-model/delete-many-modal.component';

@NgModule({
	imports: [
		NgbModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		TranslationModule,
		NgbProgressbarModule,
		LayoutModule,
		MaterialsAngularModule,
		NgbDropdownModule
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'vi' },
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_EDIT },
		HttpUtilsService,
		TokenStorage,
		DungChungService,
		LayoutUtilsService,
		LayoutService
	],
	declarations: [
		DeleteModalComponent,
		DeleteManyModalComponent,
	],
	entryComponents:[
		DeleteModalComponent,
		DeleteManyModalComponent,
	],
	exports:[
		FormsModule,
		LayoutModule,
		HttpClientModule,
		ReactiveFormsModule,
		TranslationModule,
		MaterialsAngularModule
	]
})
export class ReferenceModule {}
