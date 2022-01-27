import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { HttpUtilsService } from "src/app/_global/_services/http-utils.service";
import { ITableState, TableResponseModel, TableService } from "src/app/_metronic/shared/crud-table";
import { environment } from "src/environments/environment";

const API_ROOT_URL = environment.ApiRoot + "/common";

@Injectable({ providedIn: "root" })
export class BaiKiemTraService extends TableService<any> implements OnDestroy {
  private _httpHeaders: HttpHeaders;

  constructor(@Inject(HttpClient) http, private httpUtils: HttpUtilsService) {
    super(http);
    this._httpHeaders = this.httpUtils.getHttpHeaders();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

}
