import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { of, Observable } from "rxjs";
import { tap, catchError, finalize, map } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { TableService, TableResponseModel, ITableState } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";
import { IMauDieuKhoan } from "../dieu-khoan-mau-model/dieu-khoan-mau.model";
const API_ROOT_URL = environment.ApiRoot + '/DieuKhoanMau';

@Injectable({ providedIn: 'root' })
export class DieuKhoanMauService extends TableService<IMauDieuKhoan> implements OnDestroy{
    private _httpHeaders: HttpHeaders;

    constructor(@Inject(HttpClient) http,
        private httpUtils: HttpUtilsService) {
        super(http);
        this._httpHeaders = this.httpUtils.getHttpHeaders();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

    public fetch() {
        this.initCallService();
        const request = this.find(this.tableState)
            .pipe(
                tap((res: TableResponseModel<IMauDieuKhoan>) => {
                    this.setItems(res.items);
                    this.patchStateWithoutFetch({
                        paginator: this.tableState.paginator.recalculatePaginator(
                            res.total
                        ),
                    });
                }),
                catchError((err) => {
                    this.setErrorMess(err);
                    return of({
                        items: [],
                        total: 0
                    });
                }),
                finalize(() => {
                    this.setLoading(false)
                    const itemIds = this.getItems.value.map((el: IMauDieuKhoan) => {
                        const item = (el as unknown) as IMauDieuKhoan;
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

    find(tableState: ITableState): Observable<TableResponseModel<IMauDieuKhoan>> {
        return this.http.post<any>(API_ROOT_URL + '/DieuKhoanMau_List', tableState, { headers: this._httpHeaders }).pipe(
            map((response) => {
                if (response.status === 0) {
                    return { items: [], total: 0 };
                }
                const result: TableResponseModel<IMauDieuKhoan> = {
                    items: response.data,
                    total: response.page.TotalCount
                };
                return result;
            }),
            catchError(err => {
                this.setErrorMess(err);
                return of({ items: [], total: 0 });
            })
        );
    }
    getItemById(id: number): Observable<any> {
        this.initCallService();
        return this.http.get(`${API_ROOT_URL}/DieuKhoanMau_Detail?id=${id}`, { headers: this._httpHeaders }).pipe(
            catchError(err => {
                this.setErrorMess(err);
                return of({});
            }),
            finalize(() => this.setLoading(false))
        );
    }

    create(item: any): Observable<any> {
        this.initCallService();
        return this.http.post<IMauDieuKhoan>(API_ROOT_URL + '/DieuKhoanMau_Insert', item, { headers: this._httpHeaders }).pipe(
            catchError(err => {
                this.setErrorMess(err);
                return of({ id: undefined, data: undefined, status: 0, });
            }),
            finalize(() => this.setLoading(false))
        );
    }
    update(item: any): Observable<any> {
        this.initCallService();
        return this.http.post<IMauDieuKhoan>(API_ROOT_URL + '/DieuKhoanMau_Update', item, { headers: this._httpHeaders }).pipe(
            catchError(err => {
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
        return this.http.get(`${API_ROOT_URL}/DieuKhoanMau_Delete?id=${id}`, { headers: this._httpHeaders }).pipe(
            catchError(err => {
                this.setErrorMess(err);
                return of({});
            }),
            finalize(() => this.setLoading(false))
        );
    }
    deleteItems(ids: number[] = []): Observable<any> {
        this.initCallService();
        return this.http.post(API_ROOT_URL + '/DieuKhoanMau_Delete_Many', ids, { headers: this._httpHeaders }).pipe(
            catchError(err => {
                this.setErrorMess(err);
                return of([]);
            }),
            finalize(() => this.setLoading(false))
        );
    }
}