import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, ReplaySubject, Subscription } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { environment } from 'src/environments/environment';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { EMPTY_DATA, IAccount } from '../quan-li-tai-khoan-model/quan-li-tai-khoan-model';
import { AccountService } from '../quan-li-tai-khoan-services/quan-li-tai-khoan-services';

@Component({
  selector: 'app-quan-li-tai-khoan-detail',
  templateUrl: './quan-li-tai-khoan-detail.component.html',
  styleUrls: ['./quan-li-tai-khoan-detail.component.scss']
})
export class QuanLiTaiKhoanDetailComponent implements OnInit {
/* ------------------------ Inject Event Data -----------------------*/
@Input() id: number;
/* ------------------------------------------------------------------*/

/* --------------------------- Loading.... --------------------------*/
isLoading$;
data: IAccount;
accountForm: FormGroup;
env = environment.plainApi

private subscriptions: Subscription[] = [];
/* ------------------------------------------------------------------*/

constructor(
  private modifyService: AccountService,
  private commonService: DungChungService,
  private layoutUtilsService: LayoutUtilsService,
  private fb: FormBuilder,
  public modal: NgbActiveModal,
  private changeDetectorRefs: ChangeDetectorRef
) {}

/*---------------------------- LOAD DATA --------------------------------*/
ngOnInit(): void {
  this.isLoading$ = this.modifyService.isLoading$;
  this.loadData();
}
ngOnDestroy(): void {
  this.subscriptions.forEach((sb) => sb.unsubscribe());
}
loadData() {
    const sb = this.modifyService
      .getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_DATA);
        })
      )
      .subscribe((result: any) => {
        this.data = result.data;
      });
    this.subscriptions.push(sb);
}
/* -----------------------------------------------------------------------*/
}
