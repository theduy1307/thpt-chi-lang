import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { ITableState, TableResponseModel, TableService } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";
import { IBaiKiemTra_Group } from "../bai-kiem-tra-model/bai-kiem-tra.model";

const API_ROOT_URL = environment.ApiRoot + "/BaiKiemTra";

@Injectable({ providedIn: "root" })
export class BaiKiemTraService extends TableService<IBaiKiemTra_Group> implements OnDestroy {
  private _httpHeaders: HttpHeaders;

  constructor(@Inject(HttpClient) http, private httpUtils: HttpUtilsService) {
    super(http);
    this._httpHeaders = this.httpUtils.getHttpHeaders();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  public fetch() {
    this.initCallService();
    const request = this.find(this.tableState)
      .pipe(
        tap((res: TableResponseModel<IBaiKiemTra_Group>) => {
          this.setItems(res.items);
          this.patchStateWithoutFetch({
            paginator: this.tableState.paginator.recalculatePaginator(res.total),
          });
        }),
        catchError((err) => {
          this.setErrorMess(err);
          return of({
            items: [],
            total: 0,
          });
        }),
        finalize(() => {
          this.setLoading(false);
          const itemIds = this.getItems.value.map((el: IBaiKiemTra_Group) => {
            const item = el as unknown as IBaiKiemTra_Group;
            return item.Id;
          });
          this.patchStateWithoutFetch({
            grouping: this.tableStateClearRows(itemIds),
          });
        })
      )
      .subscribe();
    this.subscriptions.push(request);
  }

  find(tableState: ITableState): Observable<TableResponseModel<IBaiKiemTra_Group>> {
    return this.http
      .post<any>(API_ROOT_URL + "/BaiKiemTra_List", tableState, {
        headers: this._httpHeaders,
      })
      .pipe(
        map((response) => {
          if (response.status === 0) {
            return { items: [], total: 0 };
          }
          const result: TableResponseModel<IBaiKiemTra_Group> = {
            items: response.data,
            total: response.page.TotalCount,
          };
          return result;
        }),
        catchError((err) => {
          this.setErrorMess(err);
          return of({ items: [], total: 0 });
        })
      );
  }
  getItemById(id: number): Observable<any> {
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/BaiKiemTra_Detail?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }

  create(item: any): Observable<any> {
    this.initCallService();
    return this.http
      .post<IBaiKiemTra_Group>(API_ROOT_URL + "/_Insert", item, {
        headers: this._httpHeaders,
      })
      .pipe(
        catchError((err) => {
          this.setErrorMess(err);
          return of({ id: undefined, data: undefined, status: 0 });
        }),
        finalize(() => this.setLoading(false))
      );
  }
  update(item: any): Observable<any> {
    this.initCallService();
    return this.http
      .post<IBaiKiemTra_Group>(API_ROOT_URL + "/_Update", item, {
        headers: this._httpHeaders,
      })
      .pipe(
        catchError((err) => {
          this.setErrorMess(err);
          return of({
            id: undefined,
            data: undefined,
            status: undefined,
          });
        }),
        finalize(() => this.setLoading(false))
      );
  }

  delete(id: any): Observable<any> {
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/BaiKiemTra_Delete?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }
  print(id: number) {
    window.open(`${API_ROOT_URL}/_Print?id=${id}`);
  }

  public setLoadingQuestion(value: boolean): void {
      this.setLoadingQuestion(value)
  }
  // deleteItems(ids: number[] = []): Observable<any> {
  // 	this.initCallService();
  // 	return this.http.post(API_ROOT_URL + '/_Delete_Many', ids, { headers: this._httpHeaders }).pipe(
  // 		catchError(err => {
  // 			this.setErrorMess(err);
  // 			return of([]);
  // 		}),
  // 		finalize(() => this.setLoading(false))
  // 	);
  // }
}
