import { HttpClient } from '@angular/common/http';
import { Observable,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { QueryParamsModel } from '../_models/query-params.model';
import { HttpUtilsService } from '../../../../_global/_services/http-utils.service';
const API_ROOT_URL = environment.ApiRoot + '/user';

@Injectable()
export class UserProfileService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	ReadOnlyControl: boolean;
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

    checkPhienDangNhap(): Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        return this.http.post<any>(API_ROOT_URL + '/CheckTimeSession', null, { headers: httpHeaders });
    }

    // Check session
    dangXuatHeThong(): Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        return this.http.get<any>(API_ROOT_URL + '/LogOut', { headers: httpHeaders });
    }

    isPermission(item: any): Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        return this.http.get<any>(API_ROOT_URL + `/PermissionUrl?currentUrl=${item}`, { headers: httpHeaders });
    }
}