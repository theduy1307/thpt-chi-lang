import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { of, Observable } from "rxjs";
import { tap, catchError, finalize, map } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { TableService, TableResponseModel, ITableState } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";
import { ILop } from "../quan-li-lop-model/quan-li-lop.model";
const API_ROOT_URL = environment.ApiRoot + '/Lop';

@Injectable({ providedIn: 'root' })
export class LopService extends TableService<ILop> implements OnDestroy{
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
                tap((res: TableResponseModel<ILop>) => {
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
                    const itemIds = this.getItems.value.map((el: ILop) => {
                        const item = (el as unknown) as ILop;
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

    find(tableState: ITableState): Observable<TableResponseModel<ILop>> {
        return this.http.post<any>(API_ROOT_URL + '/Lop_List', tableState, { headers: this._httpHeaders }).pipe(
            map((response) => {
                if (response.status === 0) {
                    return { items: [], total: 0 };
                }
                const result: TableResponseModel<ILop> = {
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
        return this.http.get(`${API_ROOT_URL}/Lop_Detail?id=${id}`, { headers: this._httpHeaders }).pipe(
            catchError(err => {
                this.setErrorMess(err);
                return of({});
            }),
            finalize(() => this.setLoading(false))
        );
    }

    create(item: any): Observable<any> {
        this.initCallService();
        return this.http.post<ILop>(API_ROOT_URL + '/Lop_Add', item, { headers: this._httpHeaders }).pipe(
            catchError(err => {
                this.setErrorMess(err);
                return of({ id: undefined, data: undefined, status: 0, });
            }),
            finalize(() => this.setLoading(false))
        );
    }
    edit(item: any): Observable<any> {
        this.initCallService();
        return this.http.post<ILop>(API_ROOT_URL + '/Lop_edit', item, { headers: this._httpHeaders }).pipe(
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
        return this.http.get(`${API_ROOT_URL}/Lop_Delete?id=${id}`, { headers: this._httpHeaders }).pipe(
            catchError(err => {
                this.setErrorMess(err);
                return of({});
            }),
            finalize(() => this.setLoading(false))
        );
    }
    
}