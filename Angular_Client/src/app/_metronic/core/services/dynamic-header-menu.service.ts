import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpUtilsService } from 'src/app/_global/_services/http-utils.service';
import { environment } from 'src/environments/environment';
import { DynamicHeaderMenuConfig } from '../../configs/dynamic-header-menu.config';

const API_ROOT_URL = environment.ApiRoot + "/user";
var emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class DynamicHeaderMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  private _httpHeaders: HttpHeaders;
  menuConfig$: Observable<any>;
  constructor(
    private http: HttpClient, private httpUtils: HttpUtilsService,) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.loadMenu();
    this.getMenuAccount();
  }

  // Here you able to load your menu from server/data-base/localeStorage
  // Default => from DynamicHeaderMenuConfig
  private loadMenu() {
    // this.setMenu(DynamicHeaderMenuConfig);
    this.setMenu(emptyMenuConfig);
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
  getMenuAccount() {
    this.GetMenuPhanQuyen().subscribe(res => {
      if (res && res.status == 1) {
        var _menu = {
          items: [

          ]
        };

        var m = res.data;
        _menu.items.push({
          title: 'Trang chủ',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          svg: './assets/media/svg/icons/Design/Layers.svg',
          page: '/dashboard',
          translate: 'Trang chủ',
          bullet: 'dot',
        });

        m.forEach(e => {
          var module = {
            title: e.Title,
            root: true,
            bullet: 'dot',
            page: e.Link,
            icon: e.Icon,
            permission: '',
            svg: e.Svg,
            submenu: []
          }
          if (e.ChildMenu.length > 0) {
            e.ChildMenu.forEach(f => {
              var mainmenu = {
                title: f.Title,
                page: e.Link + f.Link,
                submenu: []
              }
              if (f.ChildMenu.length > 0) {
                f.ChildMenu.forEach(child => {
                  var submenu = {
                    title: child.Title,
                    page: e.Link + f.Link + child.Link,
                  }
                  mainmenu.submenu.push(submenu);
                });
              }
              else {
                delete mainmenu.submenu;
              }
              module.submenu.push(mainmenu);
            });
          }
          else {
            delete module.submenu;
          }
          _menu.items.push(module);
        });

        // console.log(_menu);

        emptyMenuConfig = _menu;
        this.loadMenu();
      }
    });
  }
  GetMenuPhanQuyen(){
		const httpHeaders = this.httpUtils.getHttpHeaders();
        return this.http.post<any>(API_ROOT_URL + '/getMenuPhanQuyen', null, { headers: httpHeaders });
	}
}
