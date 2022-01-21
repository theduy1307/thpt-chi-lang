import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';

@Injectable({
  providedIn: 'root'
})
export class QuanTriAuthGuard implements CanActivate {
  user: any;
  firstUserState: any;
  LIST_ROLES_USER: number[] = [];

  constructor(
    public userService: AuthService,
    private router:Router,
  ) {
    this.userService.currentUserSubject
      .asObservable()
      .pipe(first((user) => !!user))
      .subscribe((user) => {
        this.user = Object.assign({}, user);
        this.firstUserState = Object.assign({}, user);
        this.LIST_ROLES_USER = this.user.roles;
      });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.user.allowCode == 1234) {
        return true
      }
    this.userService.logout();
    document.location.reload();
    return false;
  }
  
}
