import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;


  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(username: string, password: string): Observable<UserModel> {    
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(username, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.accessToken).pipe(
      map((user: any) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user.data);
        } else {
          this.logout();
        }
        return user.data;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  // getUserByToken(): Observable<UserModel> {
  //   // this.route.queryParams.subscribe(params => {
  //   let auth = new AuthModel();
  //   let token: string = window.location.search.replace("?sso_token=", "").toString();
  //   if (token) {
  //     auth.accessToken = token;
  //     auth.refreshToken = token;
  //     auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
  //     this.setAuthFromLocalStorage(auth);
  //   } else {
  //     auth = this.getAuthFromLocalStorage();
  //     if (!auth || !auth.accessToken) {
  //       return of(undefined);
  //     }
  //   }
  //   this.isLoadingSubject.next(true);
  //   return this.authHttpService.getUserByToken(auth.accessToken).pipe(
  //     map((result: any) => {
  //       if (result && result.status == 1) {
  //         this.currentUserSubject = new BehaviorSubject<UserModel>(result.data);
  //       } else {
  //         this.logout();
  //       }
  //       return result.data;
  //     }),
  //     finalize(() => this.isLoadingSubject.next(false))
  //   );
  //   // });
  // }

  gettoken(route: ActivatedRouteSnapshot) {
    return route.queryParams["sso_token"];
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // verifyUserByToken(sso_token): Observable<Boolean> {
  //   //set token
  //   const auth = new AuthModel();
  //   auth.accessToken = sso_token;
  //   auth.refreshToken = sso_token;
  //   auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
  //   this.setAuthFromLocalStorage(auth);
  //   //verify
  //   return this.authHttpService.getUserByToken(sso_token).pipe(
  //     map((result: any) => {
  //       if (result && result.status == 1) {
  //         this.currentUserSubject = new BehaviorSubject<UserModel>(result.data);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }),
  //     finalize(() => {})
  //   );
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
