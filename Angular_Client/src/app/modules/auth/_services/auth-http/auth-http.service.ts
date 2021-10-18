import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../../_models/user.model';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../_models/auth.model';
import { map } from 'rxjs/operators';

const API_USERS_URL = `${environment.ApiRoot}/user`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  // public methods
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<AuthModel>(API_USERS_URL,   { email, password });
  // }

  login(username: string, password: string): Observable<any> {
    const notFoundError = new Error('Not Found');
    const httpApi:string = `${API_USERS_URL}/login`
    if (!username || !password) {
      return of(notFoundError);
    }
    let data = {
      username: username,
      password: password
    }
    return this.http.post<any>(httpApi, data)
      .pipe(
        map((result: any) => {
          if (result && result.status !== 1) {
            return notFoundError;
          }
          const user: UserModel = result.data;
          if (!user) {
            return notFoundError;
          }
          const auth = new AuthModel();
          auth.accessToken = user.accessToken;
          auth.refreshToken = user.refreshToken;
          auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
          return auth;
        }),
      );
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

    getUserByToken(token): Observable<UserModel> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<UserModel>(`${API_USERS_URL}/getUserByToken`, {
      headers: httpHeaders,
    });
  }
}
