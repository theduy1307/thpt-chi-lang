import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { of, Subscription } from "rxjs";
import { catchError, finalize, first, tap } from "rxjs/operators";
import { LayoutUtilsService } from "src/app/_global/_services/layout-utils.service";
import { FunctionPublic } from "../../../_common/_function/public-function";
import { DungChungService } from "../../../_common/_services/dung-chung.service";
import { IHanMucChietKhau } from "../han-muc-chiet-khau-model/han-muc-chiet-khau.model";
import { HanMucChietKhauService } from "../han-muc-chiet-khau-service/han-muc-chiet-khau.service";
import * as ClassicEditor from "src/assets/ckeditor5/packages/ckeditor5-build-classic";
import { Router } from "@angular/router";
@Component({
  selector: "han-muc-chiet-khau-detail",
  templateUrl: "han-muc-chiet-khau-detail.component.html",
})
export class HanMucChietKhauDetailComponent implements OnInit, OnDestroy {
  /* ------------------------ Inject Event Data -----------------------*/
  @Input() id: number;
  /* ------------------------------------------------------------------*/

  /* --------------------------- Loading.... --------------------------*/
  isLoading$;
  data: IHanMucChietKhau;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  public Editor = ClassicEditor;
  /* ------------------------------------------------------------------*/

  constructor(
    private services: HanMucChietKhauService,
    private commonService: DungChungService,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  /*---------------------------- LOAD DATA --------------------------------*/
  ngOnInit(): void {
    this.isLoading$ = this.services.isLoading$;
    this.loadData();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
  initData(): IHanMucChietKhau {
    const EMPTY_Data: IHanMucChietKhau = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenHanMuc: "",
      GiaTriMacDinh: undefined,
      IsDisable: undefined,
      NguoiTao: undefined,
      TenNguoiTao: "",
      NgayTao: undefined,
      NguoiSua: undefined,
      NgaySua: undefined,
      MoTa: "",
    };
    return EMPTY_Data;
  }
  loadData() {
    this.data = this.initData();
    this.loadForm();
    const sb = this.services
      .getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.initData());
        })
      )
      .subscribe((result: IHanMucChietKhau) => {
        this.data = result.data;
        this.loadForm();
      });
    this.subscriptions.push(sb);
  }
  loadForm() {
    this.formGroup = this.fb.group({
      tenHanMuc: [this.data.TenHanMuc + "", Validators.compose([Validators.required])],
      giaTriMacDinh: [
        FunctionPublic.f_currency(`${this.data.GiaTriMacDinh}`),
        Validators.compose([Validators.required]),
      ],
      moTa: [this.data.MoTa],
    });
    this.formGroup.disable();
  }
  /* -----------------------------------------------------------------------*/
}
