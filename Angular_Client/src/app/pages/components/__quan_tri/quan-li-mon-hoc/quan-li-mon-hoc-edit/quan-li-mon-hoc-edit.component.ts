import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, first, switchMap, tap } from "rxjs/operators";
import { AuthService, UserModel } from "src/app/modules/auth";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import {
  GroupingState,
  IGroupingView,
  ISearchView,
  ISortView,
  PaginatorState,
  SortState,
} from "src/app/_metronic/shared/crud-table";
import { DeleteModalComponent } from "../../../_common/_components/delete-modal/delete-modal.component";
import { EMPTY_DATA_CHUONGMONHOC, IChuongMonHoc, IMonHoc } from "../quan-li-mon-hoc-model/mon-hoc.model";
import { MonHocService } from "../quan-li-mon-hoc-service/quan-li-mon-hoc.service";
//Services
//Components

@Component({
  selector: 'app-quan-li-mon-hoc-edit',
  templateUrl: './quan-li-mon-hoc-edit.component.html',
  styleUrls: ['./quan-li-mon-hoc-edit.component.scss']
})
export class QuanLiMonHocEditComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  errorMessage = '';
  isLoadingSpinner: boolean = false;
  data: IChuongMonHoc[];
  danhSachLop: number[];
  private subscriptions: Subscription[] = [];

  //Thông tin user
  user: UserModel;
  firstUserState: UserModel;
  LIST_ROLES_USER: number[] = [];
  /* ------------------------------------------------------------------*/
  constructor(
    private fb: FormBuilder,
    public userService: AuthService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public services: MonHocService
  ) {
    this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.user = Object.assign({}, user);
        this.firstUserState = Object.assign({}, user);
        this.LIST_ROLES_USER = this.user.roles;
      });
  }
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }
  loadData(): void {
    this.data = EMPTY_DATA_CHUONGMONHOC;
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get('id'));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of(EMPTY_DATA_CHUONGMONHOC);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(['/quan-tri/quan-li-mon-hoc'], { relativeTo: this.route });
        }
        this.data = res.data;
        this.danhSachLop = [...new Set(this.data.map(x=>x.Lop))].sort()
      });
    this.subscriptions.push(sb);
  }
  editNameEvent($event) {
    this.data = $event    
  }
  deleteItem($event) {
    this.data = $event
  }
}
