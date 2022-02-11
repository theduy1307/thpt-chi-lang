import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { of, Observable } from "rxjs";
import { tap, catchError, finalize, map } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { TableService, TableResponseModel, ITableState } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";
import { IDanhSachHocSinh } from "../danh-sach-hoc-sinh-model/danh-sach-hoc-sinh.model";
const API_ROOT_URL = environment.ApiRoot + '/DanhSachHocSinh';

@Injectable({ providedIn: 'root' })
export class DanhSachHocSinhService extends TableService<IDanhSachHocSinh> implements OnDestroy{
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
                tap((res: TableResponseModel<IDanhSachHocSinh>) => {
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
                    const itemIds = this.getItems.value.map((el: IDanhSachHocSinh) => {
                        const item = (el as unknown) as IDanhSachHocSinh;
                        return item.IdNv;
                    });
                    this.patchStateWithoutFetch({
                        grouping: this.tableStateClearRows(itemIds),
                    });
                })
            )
            .subscribe();
        this.subscriptions.push(request);
    }

    find(tableState: ITableState): Observable<TableResponseModel<IDanhSachHocSinh>> {
        return this.http.post<any>(API_ROOT_URL + '/DanhSachHocSinh_List', tableState, { headers: this._httpHeaders }).pipe(
            map((response) => {
                if (response.status === 0) {
                    return { items: [], total: 0 };
                }
                const result: TableResponseModel<IDanhSachHocSinh> = {
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
    // getItemById(id: number): Observable<any> {
    //     this.initCallService();
    //     return this.http.get(`${API_ROOT_URL}/Lop_Detail?id=${id}`, { headers: this._httpHeaders }).pipe(
    //         catchError(err => {
    //             this.setErrorMess(err);
    //             return of({});
    //         }),
    //         finalize(() => this.setLoading(false))
    //     );
    // }

    resetPassword(id: any): Observable<any> {
        this.initCallService();
        return this.http.get(`${API_ROOT_URL}/DanhSachHocSinh_ResetPassword?id=${id}`, { headers: this._httpHeaders }).pipe(
          catchError((err) => {
            this.setErrorMess(err);
            return of({});
          }),
          finalize(() => this.setLoading(false))
        );
      }
    
    
}