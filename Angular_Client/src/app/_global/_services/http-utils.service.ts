import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { TokenStorage } from './token-storage.service';

@Injectable()
export class HttpUtilsService{
    constructor(
        private tokenStorage: TokenStorage,
        private router: Router
        ){
    }

    getFindHTTPParams(queryParams): HttpParams {
		let params = new HttpParams()
        .set('sortOrder', queryParams.sortOrder)
        .set('sortField', queryParams.sortField)
        .set('page', (queryParams.pageNumber + 1).toString())
        .set('record', queryParams.pageSize.toString());
        let keys = [], values = [];
        if (queryParams.more) {
            params = params.append('more', 'true');
        }
        Object.keys(queryParams.filter).forEach(function (key) {
            if (typeof queryParams.filter[key] !== 'string' || queryParams.filter[key] !== '') {
                keys.push(key);
                values.push(queryParams.filter[key]);
            }
        });
        if (keys.length > 0) {
            params = params.append('filter.keys', keys.join('|'))
                .append('filter.vals', values.join('|'));
        }
        let grp_keys = [], grp_values = [];
        Object.keys(queryParams.filterGroup).forEach(function (key) {
            if (typeof queryParams.filterGroup[key] !== 'string' || queryParams.filterGroup[key] !== '') {
                grp_keys.push(key);
                let value_str="";
                if(queryParams.filterGroup[key]&&queryParams.filterGroup[key].length>0){
                    value_str =  queryParams.filterGroup[key].join(',')
                }
                grp_values.push(value_str);
            }
        });
        if (grp_keys.length > 0) {
            params = params.append('filterGroup.keys', grp_keys.join('|'))
                .append('filterGroup.vals', grp_values.join('|'));
        }
        return params;
    }

    getHttpHeaders(isFormData? : boolean): HttpHeaders {
        var _token = '';
        this.tokenStorage.getAccessToken().subscribe(t => { _token = t; });
		let result = new HttpHeaders({
			'Authorization': 'Bearer ' + _token,
		});
		if (!isFormData) {
			result.append("Content-Type", "application/json");
        }
        
        if(!_token){
            this.router.navigate(['/login']);
            return result;
        }
		return result;
    }
}