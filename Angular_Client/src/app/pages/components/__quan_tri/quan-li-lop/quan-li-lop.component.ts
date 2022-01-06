import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, first, tap } from 'rxjs/operators';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { GroupingState, IGroupingView, ISearchView, ISortView, PaginatorState, SortState } from 'src/app/_metronic/shared/crud-table';
import { DeleteModalComponent } from '../../_common/_components/delete-modal/delete-modal.component';
import { QuanLiLopAddComponent } from './quan-li-lop-add/quan-li-lop-add.component';
import { QuanLiLopEditComponent } from './quan-li-lop-edit/quan-li-lop-edit.component';
import { LopService } from './quan-li-lop-service/quan-li-lop.service';

@Component({
  selector: 'app-quan-li-lop',
  templateUrl: './quan-li-lop.component.html',
  styles: [
  ]
})
export class QuanLiLopComponent implements OnInit,
OnDestroy,
ISortView,
IGroupingView,
ISearchView  {

  /* --------------------------- Loading.... ---------------------------*/
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
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
      public services: LopService,
  ) {
      this.userService.currentUserSubject.asObservable().pipe(
          first(user => !!user)
      ).subscribe(user => {
          this.user = Object.assign({}, user);
          this.firstUserState = Object.assign({}, user);
          this.LIST_ROLES_USER = this.user.roles;
      })
  }

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {

      // this.SHOW_BUTTON_CREATE.next(this.isTrueButton(this.TAO));
      // this.SHOW_BUTTON_UPDATE.next(this.isTrueButton(this.SUA));
      // this.SHOW_BUTTON_REMOVE.next(this.isTrueButton(this.XOA));

      this.searchForm();
      const sb = this.services.isLoading$.subscribe(res => this.isLoading = res);
      this.subscriptions.push(sb);

      this.grouping = this.services.grouping;
      this.paginator = this.services.paginator;
      this.sorting = this.services.sorting;
      this.services.fetch()
  }
  ngOnDestroy() {
      this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  /* -----------------------------------------------------------------------*/

  /*------------------------- CÁC THAO TÁC TRÊN FORM ----------------------*/
  searchForm() {
      this.searchGroup = this.fb.group({
          searchTerm: ['']
      });
      const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
          .pipe(
              debounceTime(150),
              distinctUntilChanged()
          )
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
          sorting.direction = 'asc';
      } else {
          sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
      }
      this.services.patchState({ sorting });
  }

  paginate(paginator: PaginatorState) {
      this.services.patchState({ paginator });
  }

  create() {
      const modalRef = this.modalService.open(QuanLiLopAddComponent, { size: 'xl' });
      modalRef.componentInstance.id = undefined;
      modalRef.result.then(() =>
          this.services.fetch(),
          () => { }
      );
  }
  edit(id: number) {
      const modalRef = this.modalService.open(QuanLiLopEditComponent, { size: 'xl' });
      modalRef.componentInstance.id = id;
      modalRef.result.then(() =>
          this.services.fetch(),
          () => { }
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
      modalRef.result.then((result) => {
          if (result) {
              const sb = this.services.delete(id).pipe(
                  tap(() =>
                      this.services.fetch()
                  ),
                  catchError((err) => {
                      return of(undefined);
                  }),
              ).subscribe(res => {
                  if (res && res.status == 1) {
                      this.layoutUtilsService.openSnackBar("Xóa dữ liệu thành công", "Đóng");
                  } else {
                      this.layoutUtilsService.openSnackBar("Xóa dữ liệu thất bại, vui lòng kiểm tra thông tin", "Đóng");
                  }
              });
              this.subscriptions.push(sb);
          }
      },
          () => { });
  }
  // detail(id: number) {
  //     const modalRef = this.modalService.open(HanMucChietKhauDetailComponent, { size: 'xl' });
  //     modalRef.componentInstance.id = id;
  //     modalRef.result.then(() =>
  //         this.services.fetch(),
  //         () => { }
  //     );
  // }

  isEmptyDataSource() {
      var _listData = [];
      this.services.items$.subscribe(value => _listData = value);
      return (_listData == null || _listData.length == 0)
  }
  /* -----------------------------------------------------------------------*/
  // Chuẩn hóa dữ liệu
  formatData(value: string): string {
      value = value.replace(/<[^>]*>/g, '')
          .replace(/\s{2,}/g, '')
          .replace('&nbsp;', '')
          .trim();
      if (value.length > 50) {
          value = value.slice(0, 50) + "..."
      }
      return value
  }
  /* -----------------------------------------------------------------------*/

}
