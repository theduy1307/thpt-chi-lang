import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OnDestroy } from "@angular/core";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { ITableState, TableResponseModel, TableService } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";
import { ILoaiHopDong } from "../loai-hop-dong-model/loai-hop-dong.model";

const API_ROOT_URL = environment.ApiRoot + "/LoaiHopDong";
@Injectable({ providedIn: "root" })
export class LoaiHopDongService extends TableService<ILoaiHopDong> implements OnDestroy {
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
        tap((res: TableResponseModel<ILoaiHopDong>) => {
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
          const itemIds = this.getItems.value.map((el: ILoaiHopDong) => {
            const item = el as unknown as ILoaiHopDong;
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

  find(tableState: ITableState): Observable<TableResponseModel<ILoaiHopDong>> {
    return this.http
      .post<any>(API_ROOT_URL + "/LoaiHopDong_List", tableState, {
        headers: this._httpHeaders,
      })
      .pipe(
        map((response) => {
          if (response.status === 0) {
            return { items: [], total: 0 };
          }
          const result: TableResponseModel<ILoaiHopDong> = {
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

  create(item: any): Observable<any> {
    this.initCallService();
    return this.http.post<ILoaiHopDong>(API_ROOT_URL + "/LoaiHopDong_Add", item, { headers: this._httpHeaders }).pipe(
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
      .post<ILoaiHopDong>(API_ROOT_URL + "/LoaiHopDong_Update", item, { headers: this._httpHeaders })
      .pipe(
        catchError((err) => {
          this.setErrorMess(err);
          return of({ id: undefined, data: undefined, status: undefined });
        }),
        finalize(() => this.setLoading(false))
      );
  }

  delete(id: any): Observable<any> {
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/LoaiHopDong_Delete?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getItemById(id: number): Observable<any> {
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/LoaiHopDong_Detail?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }
}
