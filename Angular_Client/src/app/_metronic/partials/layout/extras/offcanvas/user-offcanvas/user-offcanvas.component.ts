import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLiLopAddComponent } from 'src/app/pages/components/__quan_tri/quan-li-lop/quan-li-lop-add/quan-li-lop-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  user$: Observable<UserModel>;
  constructor(private layout: LayoutService, private auth: AuthService, private router:Router) {}
  env = environment.plainApi
  ngOnInit(): void {
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }
  information(id:number) {
    this.router.navigate([`/ca-nhan/thong-tin-ca-nhan/${id}`])
  }
  chucDanh(allowCode:number) {
    if ((allowCode+'').indexOf('2')>-1) {
      return "Quản trị hệ thống"
    }
    else if((allowCode+'').indexOf('3')>-1) {
      return "Giáo viên chủ nhiệm"
    }    
    else if ((allowCode+'').indexOf('1')>-1) {
      return "Giáo viên bộ môn"
    }
    else if ((allowCode+'').indexOf('4')>-1) {
      return "Học sinh"
    }
    else return "Không xác định"
  }
}
