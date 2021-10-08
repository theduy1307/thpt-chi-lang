import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, BehaviorSubject, of } from "rxjs";
import { first, debounceTime, distinctUntilChanged, tap, catchError } from "rxjs/operators";
import { UserModel, AuthService } from "src/app/modules/auth";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import {
  ICreateAction,
  IEditAction,
  IDeleteAction,
  IDeleteSelectedAction,
  ISortView,
  IGroupingView,
  ISearchView,
  PaginatorState,
  SortState,
  GroupingState,
} from "src/app/_metronic/shared/crud-table";
import { DeleteModalComponent } from "../../_common/_components/delete-modal/delete-modal.component";
import { DieuKhoanMauAddComponent } from "./dieu-khoan-mau-add/dieu-khoan-mau-add.component";
import { DieuKhoanMauDetailComponent } from "./dieu-khoan-mau-detail/dieu-khoan-mau-detail.component";
import { DieuKhoanMauEditComponent } from "./dieu-khoan-mau-edit/dieu-khoan-mau-edit.component";
import { DieuKhoanMauService } from "./dieu-khoan-mau-service/dieu-khoan-mau.service";

@Component({
  selector: "app-dieu-khoan-mau",
  templateUrl: "./dieu-khoan-mau.component.html",
  styles: [],
})
//IDeleteAction,
//IDeleteSelectedAction,
export class DieuKhoanMauComponent
  implements OnInit, OnDestroy, ICreateAction, IEditAction, ISortView, IGroupingView, ISearchView
{
  /* --------------------------- Loading.... ---------------------------*/
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
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
    public services: DieuKhoanMauService
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

  /*------------------------- CÁC THAO TÁC TRÊN FORM ----------------------*/
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [""],
      rules: [""],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
    this.subscriptions.push(
      this.searchGroup.controls.rules.valueChanges
        .pipe(debounceTime(150), distinctUntilChanged())
        .subscribe(() => this.filter())
    );
  }
  setValueRule(event: any) {
    this.searchGroup.controls["rules"].setValue(`${event.value}`);
  }
  filter() {
    const filter: any = {};
    const rules = this.searchGroup.controls["rules"].value;
    if (rules) {
      filter.keys = "rules";
      filter.vals = rules + "";
    }
    this.services.patchState({ filter });
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

  create() {
    const modalRef = this.modalService.open(DieuKhoanMauAddComponent, { size: "xl" });
    modalRef.componentInstance.id = undefined;
    modalRef.result.then(
      () => this.services.fetch(),
      () => {}
    );
  }
  edit(id: number) {
    const modalRef = this.modalService.open(DieuKhoanMauEditComponent, { size: "xl" });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.services.fetch(),
      () => {}
    );
  }
  delete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = "Xóa dữ liệu";
    modalRef.componentInstance.message = "Bạn có chắc muốn xóa dữ liệu này?";
    modalRef.componentInstance.loadingMsg = "";
    modalRef.componentInstance.submitButtonMsg = "Xác nhận";
    modalRef.componentInstance.cancelButtonMsg = "Đóng";
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
                this.layoutUtilsService.openSnackBar("Xóa dữ liệu thành công", "Đóng");
              } else {
                this.layoutUtilsService.openSnackBar("Xóa dữ liệu thất bại, vui lòng kiểm tra thông tin", "Đóng");
              }
            });
          this.subscriptions.push(sb);
        }
      },
      () => {}
    );
  }
  detail(id: number) {
    const modalRef = this.modalService.open(DieuKhoanMauDetailComponent, { size: "xl" });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => this.services.fetch(),
      () => {}
    );
  }
  // deleteSelected() {
  //     const modalRef = this.modalService.open(DeleteManyModalComponent);
  //     modalRef.componentInstance.title = "Xóa dữ liệu";
  //     modalRef.componentInstance.message = "Bạn có chắc muốn xóa các dữ liệu này?";
  //     modalRef.componentInstance.loadingMsg = "";
  //     modalRef.componentInstance.submitButtonMsg = "Xác nhận";
  //     modalRef.componentInstance.cancelButtonMsg = "Đóng";
  //     modalRef.result.then((result) => {
  //         if (result) {
  //             const sb = this.services.deleteItems(this.grouping.getSelectedRows()).pipe(
  //                 tap(() =>
  //                     this.services.fetch()
  //                 ),
  //                 catchError((err) => {
  //                     return of(undefined);
  //                 })
  //             ).subscribe(res => {
  //                 if (res && res.status == 1) {
  //                     this.layoutUtilsService.openSnackBar("Xóa dữ liệu thành công", "Đóng");
  //                 } else {
  //                     this.layoutUtilsService.openSnackBar("Xóa dữ liệu thất bại, vui lòng kiểm tra thông tin", "Đóng");
  //                 }
  //             });
  //             this.subscriptions.push(sb);
  //         }
  //     },
  //         () => { });
  // }

  isEmptyDataSource() {
    var _listData = [];
    this.services.items$.subscribe((value) => (_listData = value));
    return _listData == null || _listData.length == 0;
  }
  /* -----------------------------------------------------------------------*/

  /*------------------------ CÁC HÀM XÁC NHẬN CẤP QUYỀN --------------------*/
  isTrueButton(ROLENUMBER: number) {
    if (this.LIST_ROLES_USER.findIndex((x) => x == ROLENUMBER) > -1) {
      return true;
    }
    return false;
  }
  /* -----------------------------------------------------------------------*/
}
