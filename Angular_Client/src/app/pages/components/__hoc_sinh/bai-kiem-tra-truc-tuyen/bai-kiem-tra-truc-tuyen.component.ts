import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, finalize, first, tap } from "rxjs/operators";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  GroupingState,
  ICreateAction,
  IDeleteAction,
  IDeleteSelectedAction,
  IEditAction,
  IFilterView,
  IGroupingView,
  ISearchView,
  ISortView,
  PaginatorState,
  SortState,
} from "src/app/_metronic/shared/crud-table";
//Services
//Components
import { DeleteModalComponent } from "../../_common/_components/delete-modal/delete-modal.component";
import { DeleteManyModalComponent } from "../../_common/_components/delete-many-model/delete-many-modal.component";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { AuthService, UserModel } from "src/app/modules/auth";
import { BaiKiemTraTrucTuyenService } from "./bai-kiem-tra-truc-tuyen-service/bai-kiem-tra-truc-tuyen.service";
import { PasswordComponent } from "./components/password/password.component";
import { BaiKiemTraTrucTuyenDetailComponent } from "./bai-kiem-tra-truc-tuyen-detail/bai-kiem-tra-truc-tuyen-detail.component";
import { FunctionPublic } from "../../_common/_function/public-function";
import * as moment from "moment";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-bai-kiem-tra-truc-tuyen",
  templateUrl: "./bai-kiem-tra-truc-tuyen.component.html",
})
//ICreateAction,
//IEditAction,
//IDeleteAction,
//IDeleteSelectedAction,
export class BaiKiemTraTrucTuyenComponent implements OnInit, OnDestroy, ISortView, IGroupingView, ISearchView {
  /* --------------------------- Loading.... ---------------------------*/
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  public modal: NgbActiveModal
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
    public services: BaiKiemTraTrucTuyenService,
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



  checkPassword(id: number, NgayThi: string, GioThi: string) {
    Date
    var currentDateTime = FunctionPublic.getCurrentDateTime();
    var dateCurrent = currentDateTime.substring(0, 8); //hh:mm
    var ngayThi = moment(NgayThi).format("YYYYMMDD");

    var timeCurrent = currentDateTime.substring(8, 12); //hh:mm
    var gioThi = GioThi.replace(":", "");
    var totalSecondtimeCurrent = ( Number(timeCurrent.substring(0,2)) * 3600 +  Number(timeCurrent.substring(2,4))*60 ); // tổng giây timeCurrent
    var totalSecondgioThi = ( Number(gioThi.substring(0,2)) * 3600 +  Number(gioThi.substring(2,4))*60 ); // tổng giây timeCurrent
    if (dateCurrent == ngayThi &&  totalSecondtimeCurrent - totalSecondgioThi <=  900 && totalSecondtimeCurrent - totalSecondgioThi >= 0 ) {
      const modalRef = this.modalService.open(PasswordComponent, { size: 'xl' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() =>
        this.services.fetch(),
        () => { }
      );
    }
    else if (dateCurrent == ngayThi && totalSecondtimeCurrent - totalSecondgioThi >= 900)
    {
      this.layoutUtilsService.openSnackBar("Đã quá giờ thi", "Đóng");
    }
    else
    {
      this.layoutUtilsService.openSnackBar("Chưa tới ngày thi và giờ thi", "Đóng");
    }

  }
  print(id: number) {
    this.services.print(id);
  }
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
