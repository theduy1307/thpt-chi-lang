import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { ITableState, TableResponseModel, TableService } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";
import { IBaiHoc, IChuongMonHoc, IMonHoc } from "../quan-li-mon-hoc-model/mon-hoc.model";

const API_ROOT_URL = environment.ApiRoot + "/MonHoc";

@Injectable({ providedIn: "root" })
export class MonHocService extends TableService<IMonHoc> implements OnDestroy {
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
        tap((res: TableResponseModel<IMonHoc>) => {
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
          const itemIds = this.getItems.value.map((el: IMonHoc) => {
            const item = el as unknown as IMonHoc;
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

  find(tableState: ITableState): Observable<TableResponseModel<IMonHoc>> {
    return this.http
      .post<any>(API_ROOT_URL + "/MonHoc_List", tableState, {
        headers: this._httpHeaders,
      })
      .pipe(
        map((response) => {
          if (response.status === 0) {
            return { items: [], total: 0 };
          }
          const result: TableResponseModel<IMonHoc> = {
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
    return this.http.get(`${API_ROOT_URL}/detail?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getBaiHoc(id: number): Observable<any> {
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/detail-subject?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }

  createChuong(item: any): Observable<any> {
    this.initCallService();
    return this.http
      .post<IChuongMonHoc>(API_ROOT_URL + "/_InsertChuong", item, {
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
  delete(id: any): Observable<any> {
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/_Delete?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }
  updateChuong(item: any): Observable<any> {
    this.initCallService();
    return this.http
      .post<IMonHoc>(API_ROOT_URL + "/_Update", item, {
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

  updateBaiHoc(item: IBaiHoc[]): Observable<any> {
    this.initCallService();
    return this.http
      .post<IBaiHoc>(API_ROOT_URL + "/_UpdateBaiHoc", item, {
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

  importFileMauNCC(fileToUpload) : Observable<any>{
		
		let fileUpload= <File>fileToUpload[0];
		const formData: FormData = new FormData();
		formData.append('File', fileUpload, fileUpload.name);
		const httpHeaders = this.httpUtils.getHttpHeaders();
		return this.http.post<any>(API_ROOT_URL+'/ImportFileImport_NhaCC',formData ,{ headers: this._httpHeaders });
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
