import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { BaiKiemTraTrucTuyenDetailComponent } from "../../bai-kiem-tra-truc-tuyen-detail/bai-kiem-tra-truc-tuyen-detail.component";
import { BaiKiemTraTrucTuyenService } from "../../bai-kiem-tra-truc-tuyen-service/bai-kiem-tra-truc-tuyen.service";

@Component({
  selector: "app-password",
  templateUrl: "./password.component.html",
})
export class PasswordComponent implements OnInit {
  @Input() id: number
  pass: string
  password;
  show: boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private services : BaiKiemTraTrucTuyenService,
    public modal: NgbActiveModal,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private router: Router,
  ) {}

  ngOnInit(): void {}
  checkPassword() {
    const sbCreate = this.services.checkPassword(this.id,this.pass).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of();
      }),
    ).subscribe((res) => {
      if (res && res.status == 1) {
        this.layoutUtilsService.openSnackBar("Đăng nhập thành công", "Đóng");
        this.router.navigate([`hoc-sinh/danh-sach-bai-kiem-tra-truc-tuyen/detail/${this.id}`])
      } else {
        this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
      }
    }
    );
    this.subscriptions.push(sbCreate);
  }
  // onClick() {
  //   if (this.password === 'password') {
  //     this.password = 'text';
  //     this.show = true;
  //   } else {
  //     this.password = 'password';
  //     this.show = false;
  //   }
  // }
  onClick() {
    if(this.show == false)
    {
      return this.show = true;
    }
    if(this.show == true)
    {
      return this.show = false;
    }
  }
}
