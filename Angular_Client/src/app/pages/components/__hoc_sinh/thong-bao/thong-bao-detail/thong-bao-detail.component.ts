import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DeleteModalComponent } from '../../../_common/_components/delete-modal/delete-modal.component';
import { FunctionPublic } from '../../../_common/_function/public-function';
import { DungChungService } from '../../../_common/_services/dung-chung.service';
import { INotifyForStudent } from '../thong-bao-model/thong-bao.model';
import { ThongBaoService } from '../thong-bao-service/thong-bao.service';

@Component({
  selector: 'app-thong-bao-detail',
  templateUrl: './thong-bao-detail.component.html',
  styleUrls: ['./thong-bao-detail.component.scss']
})
export class ThongBaoDetailComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  errorMessage = '';
  isLoadingSpinner: boolean = false;
  public Editor = ClassicEditor;
  data: INotifyForStudent;
  formThongTin: FormGroup;
  danhSachCauHoi: INotifyForStudent[];
  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/

  constructor(
    private services: ThongBaoService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadData(): void {
    this.data = this.initialData();
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of(this.initialData());
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/hoc-sinh/danh-sach-thong-bao'], { relativeTo: this.route });
        }
        var locale = window.navigator['userLanguage'] || window.navigator.language;
        this.data = res.data;
        this.data.CreateFrom = moment(this.data.CreateDate).locale(locale).fromNow()
      });
    this.subscriptions.push(sb);
  }

  initialData(): INotifyForStudent {
    const data: INotifyForStudent = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      Title: "",
      Content: "",
      CreateDate: "",
      CreateFrom: "",
      ModifiedDate: "",
      CreateBy: undefined,
      CreateByName: "",
      Type: undefined,
      NotifyIcon: "",
      IsRead: undefined,
    };
    return data;
  }
}
