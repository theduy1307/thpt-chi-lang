import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { ITableState, TableResponseModel, TableService } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";
import { IBaiKiemTra_Group } from "../bai-kiem-tra-truc-tuyen-model/bai-kiem-tra-truc-tuyen.model";

const API_ROOT_URL = environment.ApiRoot + "/ListBaiKiemTraOnline";

@Injectable({ providedIn: "root" })
export class BaiKiemTraTrucTuyenService extends TableService<IBaiKiemTra_Group> implements OnDestroy {
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
      .post<any>(API_ROOT_URL + "/ListBaiKiemTraOnline_List", tableState, {
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
  getItemById(id: number): Observable<any> { // sắp sửa lại
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/BaiKiemTraTrucTuyen_Detail?id=${id}`, { headers: this._httpHeaders }).pipe(
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
      .post<IBaiKiemTra_Group>(API_ROOT_URL + "/ListBaiKiemTraOnline_Add", item, {
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
    return this.http.get(`${API_ROOT_URL}/ListBaiKiemTraOnline_Delete?id=${id}`, { headers: this._httpHeaders }).pipe(
      catchError((err) => {
        this.setErrorMess(err);
        return of({});
      }),
      finalize(() => this.setLoading(false))
    );
  }
  active(id: any): Observable<any> {
    this.initCallService();
    return this.http.get(`${API_ROOT_URL}/ListBaiKiemTraOnline_Active?id=${id}`, { headers: this._httpHeaders }).pipe(
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
  exportFileExcel(id:number){
		// const [id, filter, fromDate, toDate] = [item.IdKhachHang, item.LocTheoHanMuc, item.TuNgay, item.DenNgay]
		// return this.http.get<Blob>(API_ROOT_URL + `/Export?id=${id}&filter=${filter}&fromDate=${fromDate}&toDate=${toDate}`, {responseType: 'blob' as 'json'});
		var request = new XMLHttpRequest();
		var link = API_ROOT_URL + `/Export?id=${id}`;
		request.open('GET', link);
		
		request.responseType = 'arraybuffer';
		var _this=this;
		request.onload = function (e) {
			
			var name = "Export_Exam";
			var file = new Blob([this.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
			if (navigator.msSaveBlob) {
				return navigator.msSaveBlob(file);
			}
			
			var a = document.createElement("a");

			var url = window.URL.createObjectURL(file);
			a.setAttribute("href", url);
			a.setAttribute("download", name);

			a.click();

			window.URL.revokeObjectURL(url);
			
		};
		request.send();
	}
}
