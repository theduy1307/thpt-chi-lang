import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { of, Subscription } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ThongTinCaNhanService } from "./thong-tin-ca-nhan-service/thong-tin-ca-nhan.service";
import { EMPTY_DATA_ACCOUNT_INFORMATION, AccountInformation } from "./thong-tin-ca-nhan-model/thong-tin-ca-nhan.model";
import { DungChungService } from "../../_common/_services/dung-chung.service";

const EMPTY_DATA = EMPTY_DATA_ACCOUNT_INFORMATION;
@Component({
  selector: "app-thong-tin-ca-nhan",
  templateUrl: "./thong-tin-ca-nhan.component.html",
  styleUrls: ["./thong-tin-ca-nhan.component.scss"],
})
export class ThongTinCaNhanComponent implements OnInit {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  errorMessage = "";
  isLoadingSpinner: boolean = false;
  data: AccountInformation;
  formThongTin: FormGroup;
  danhSachCauHoi: AccountInformation[];
  private subscriptions: Subscription[] = [];
  /* ------------------------------------------------------------------*/

  constructor(
    private services: ThongTinCaNhanService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
    this.loadForm()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  loadData(): void {
    this.data = EMPTY_DATA;
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get("id"));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of(EMPTY_DATA);
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: any) => {
        if (!res) {
          this.router.navigate(["/hoc-sinh/danh-sach-thong-bao"], { relativeTo: this.route });
        }
        this.data = res.data;
      });
    this.subscriptions.push(sb);
  }
  loadForm() {
    this.formThongTin = this.fb.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      retypeNewPassword: ["", Validators.required],
    });
  }
  changePassword() {
    const [oldPassword, newPassword] = [this.formThongTin.controls["oldPassword"].value, this.formThongTin.controls["newPassword"].value];
    if (this.formThongTin.controls["newPassword"].value !== this.formThongTin.controls["retypeNewPassword"].value) {
      this.layoutUtilsService.openSnackBar("Mật khẩu mới và mật khẩu nhập lại không chính xác", "Đóng");
    } else {
      const sbCreate = this.services
        .changePassword(oldPassword, newPassword)
        .pipe(
          tap(() => {}),
          catchError((errorMessage) => {
            console.error("UPDATE ERROR", errorMessage);
            return of(this.data);
          })
        )
        .subscribe((res: any) => {
          if (res && res.status == 1) {
            this.data = res.data;
            this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
            this.formThongTin.reset();
          } else {
            this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
            this.formThongTin.reset();
          }
        });
      this.subscriptions.push(sbCreate);
    }
  }
}
