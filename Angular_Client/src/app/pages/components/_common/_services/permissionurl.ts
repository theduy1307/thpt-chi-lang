
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { BehaviorSubject } from 'rxjs';
import { UserProfileService } from './user-profile.service';
import { TokenStorage } from '../../../../_global/_services/token-storage.service';

@Injectable()
export class PermissionUrl implements CanActivate, CanActivateChild, CanLoad {

    lastDataRouting$: BehaviorSubject<any> = new BehaviorSubject(undefined);
    
    constructor(private router: Router,
        private tokenStorage: TokenStorage,
        private per: UserProfileService
        ) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        throw new Error("Method not implemented.");
    }
    canLoad(route: Route): boolean {
        throw new Error("Method not implemented.");
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean> {
      
        if (await this.tokenStorage.getAccessToken().toPromise()) {
            const res = await this.per.isPermission(state.url).toPromise();
            if(res && res.data)  return true;
            else{
                this.router.navigate(['/']);
                return false;
            }

        }else{
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}
