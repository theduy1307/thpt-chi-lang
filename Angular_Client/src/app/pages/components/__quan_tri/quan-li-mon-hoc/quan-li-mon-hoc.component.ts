import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, first, tap } from "rxjs/operators";
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
//Services
//Components
import { DeleteModalComponent } from "../../_common/_components/delete-modal/delete-modal.component";
import { MonHocService } from "./quan-li-mon-hoc-service/quan-li-mon-hoc.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-quan-li-mon-hoc",
  templateUrl: "./quan-li-mon-hoc.component.html",
  styleUrls: ["./quan-li-mon-hoc.component.scss"],
})
//ICreateAction,
//IEditAction,
//IDeleteAction,
//IDeleteSelectedAction,
export class MonHocComponent implements OnInit, OnDestroy, ISortView, IGroupingView, ISearchView {
  /* --------------------------- Loading.... ---------------------------*/
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  /* ------------------------------------------------------------------*/

  /* ------------------------------ ROLE ------------------------------*/
  user: UserModel;
  firstUserState: UserModel;
  TAO = 10032;
  SUA = 10033;
  XOA = 10034;

  LIST_ROLES_USER: number[] = [];
  SHOW_BUTTON_CREATE = new BehaviorSubject<boolean>(false);
  SHOW_BUTTON_UPDATE = new BehaviorSubject<boolean>(false);
  SHOW_BUTTON_REMOVE = new BehaviorSubject<boolean>(false);
  /* ------------------------------------------------------------------*/

  constructor(
    private fb: FormBuilder,
    public userService: AuthService,
    private modalService: NgbModal,
    private layoutUtilsService: LayoutUtilsService,
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

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.SHOW_BUTTON_CREATE.next(this.isTrueButton(this.TAO));
    this.SHOW_BUTTON_UPDATE.next(this.isTrueButton(this.SUA));
    this.SHOW_BUTTON_REMOVE.next(this.isTrueButton(this.XOA));

    this.searchForm();
    const sb = this.services.isLoading$.subscribe((res) => (this.isLoading = res));
    this.subscriptions.push(sb);

    this.grouping = this.services.grouping;
    this.paginator = this.services.paginator;
    this.sorting = this.services.sorting;
    this.services.fetch();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  /* -----------------------------------------------------------------------*/

  /*------------------------- C??C THAO T??C TR??N FORM ----------------------*/
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [""],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }
  search(searchTerm: string) {
    this.services.patchState({ searchTerm });
  }

  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = "asc";
    } else {
      sorting.direction = sorting.direction === "asc" ? "desc" : "asc";
    }
    this.services.patchState({ sorting });
  }
  paginate(paginator: PaginatorState) {
    this.services.patchState({ paginator });
  }

  // Chu???n h??a d??? li???u
  formatData(value: string): string {
    value = value
      .replace(/<[^>]*>/g, "")
      .replace(/\s{2,}/g, "")
      .replace("&nbsp;", "")
      .trim();
    if (value.length > 70) {
      value = value.slice(0, 70) + "...";
    }
    return value;
  }
  delete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = "X??a d??? li???u";
    modalRef.componentInstance.message = "B???n c?? ch???c mu???n x??a d??? li???u n??y?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "X??c nh???n";
    modalRef.componentInstance.cancelButtonMsg = "????ng";
    modalRef.result.then(
      (result) => {
        if (result) {
          const sb = this.services
            .delete(id)
            .pipe(
              tap(() => this.services.fetch()),
              catchError((err) => {
                return of(undefined);
              })
            )
            .subscribe((res) => {
              if (res && res.status == 1) {
                this.layoutUtilsService.openSnackBar("X??a d??? li???u th??nh c??ng", "????ng");
              } else {
                this.layoutUtilsService.openSnackBar("X??a d??? li???u th???t b???i, vui l??ng ki???m tra th??ng tin", "????ng");
              }
            });
          this.subscriptions.push(sb);
        }
      },
      () => {}
    );
  }
  getListColor(id: number): string {
    let random = 0;
    if (id < 10) {
      random = id;
    }
    if (id > 10 && id < 100) {
      random = id % 10;
    }
    if (id >= 100) {
      random = id % 100;
    }
    const color = [
      "bg-primary text-light",
      "bg-secondary text-light",
      "bg-success text-light",
      "bg-danger text-light",
      "bg-warning text-light",
      "bg-info text-light",
      "bg-dark text-light",
    ];
    return color[random];
  }
  getListColorDemo(id: number): number {
    let random = 0;
    if (id < 10) {
      random = id;
    }
    if (id > 10 && id < 100) {
      random = id % 10;
    }
    if (id >= 100) {
      random = id % 100;
    }
    return random;
  }
  // deleteSelected() {
  //   const modalRef = this.modalService.open(DeleteManyModalComponent);
  //   modalRef.componentInstance.title = "X??a d??? li???u";
  //   modalRef.componentInstance.message = "B???n c?? ch???c mu???n x??a c??c d??? li???u n??y?";
  //   modalRef.componentInstance.loadingMsg = "";
  //   modalRef.componentInstance.submitButtonMsg = "X??c nh???n";
  //   modalRef.componentInstance.cancelButtonMsg = "????ng";
  //   modalRef.result.then((result) => {
  //     if(result){
  //       const sb = this.services.deleteItems(this.grouping.getSelectedRows()).pipe(
  //         tap(() =>
  //           this.services.fetch()
  //         ),
  //         catchError((err) => {
  //           return of(undefined);
  //         })
  //       ).subscribe(res =>{
  //         if(res && res.status == 1){
  //           this.layoutUtilsService.openSnackBar("X??a d??? li???u th??nh c??ng","????ng");
  //         }else{
  //           this.layoutUtilsService.openSnackBar("X??a d??? li???u th???t b???i, vui l??ng ki???m tra th??ng tin","????ng");
  //         }
  //       });
  //       this.subscriptions.push(sb);
  //     }
  //   },
  //   () => { });
  // }

  isEmptyDataSource() {
    var _listData = [];
    this.services.items$.subscribe((value) => (_listData = value));
    return _listData == null || _listData.length == 0;
  }
  /* -----------------------------------------------------------------------*/

  /*------------------------ C??C H??M X??C NH???N C???P QUY???N --------------------*/
  isTrueButton(ROLENUMBER: number) {
    if (this.LIST_ROLES_USER.findIndex((x) => x == ROLENUMBER) > -1) {
      return true;
    }
    return false;
  }
  /* -----------------------------------------------------------------------*/
}
