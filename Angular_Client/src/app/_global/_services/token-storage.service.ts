import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenStorage {
    constructor(){

    }
    
    public getToken(): Observable<string>{
        try{
            return of(localStorage.getItem("Token"));
        }catch(e){
            return of("");
        }
    }
    public getAccessToken(): Observable<string> {
      try{
        let auth = JSON.parse(localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`));
        const token: string = <string>auth.accessToken;
        return of(token);
      }
      catch(e) {
        return of("");
      }
    }
    public setUserInfo(info: any): TokenStorage {
		this.clearUserInfo();
		localStorage.setItem('UserInfo', info);
		return this;
	}
    public setToken(token: any): TokenStorage {
		this.clearToken();
		localStorage.setItem('Token', token);
		return this;
    }
    public clearUserInfo(){
		localStorage.removeItem('UserInfo');
	}
	public clearToken(){
		localStorage.removeItem('Token');
	}
}