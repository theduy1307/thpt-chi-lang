import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { of, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FunctionPublic } from 'src/app/pages/components/_common/_function/public-function';
import { DungChungService } from 'src/app/pages/components/_common/_services/dung-chung.service';
import { LayoutUtilsService } from 'src/app/_global/_services/layout-utils.service';
import { EMPTY_DATA_CHUONG, EMPTY_DATA_CHUONGMONHOC, IChuongMonHoc } from '../../../quan-li-mon-hoc-model/mon-hoc.model';
import { MonHocService } from '../../../quan-li-mon-hoc-service/quan-li-mon-hoc.service';

@Component({
  selector: 'app-them-moi-chuong-mon-hoc',
  templateUrl: './them-moi-chuong-mon-hoc.component.html',
  styleUrls: ['./them-moi-chuong-mon-hoc.component.scss']
})
export class ThemMoiChuongMonHocComponent implements OnInit {
  @Input() name: string;
  @Input() idMonHoc:number
  formGroup: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(
    private services: MonHocService,
    private commonService: DungChungService,
    private layoutUtilsService: LayoutUtilsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadForm()
  }

  loadForm() {
    this.formGroup = this.fb.group({
      name: ["", Validators.compose([Validators.required])],
      lop: ["10", Validators.compose([Validators.required])]
    })
  }
  close() {
    this.modal.dismiss()
  }
  save(){
    const data:IChuongMonHoc = EMPTY_DATA_CHUONG
    data.status = 1;
    data.Lop = +this.formGroup.controls["lop"].value;
    data.TenChuong = this.formGroup.controls["name"].value;
    data.IdMonHoc = this.idMonHoc
    data.NgayTao= moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS")
    data.NgaySua= moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS")
    const sbCreate = this.services
      .createChuong(data)
      .pipe(
        tap(() => {
          this.modal.close(data);
          this.router
                  .navigateByUrl("/", { skipLocationChange: true })
                  .then(() => this.router.navigate([`/quan-tri/quan-li-mon-hoc/chinh-sua/${this.idMonHoc}`]));
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(data);
        })
      )
      .subscribe((res: any) => {
        if (res && res.status == 1) {
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        } else {
          this.layoutUtilsService.openSnackBar(res.error.message, "Đóng");
        }
      });
    this.subscriptions.push(sbCreate);
  }
  validateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = "") {
    return FunctionPublic.ValidateFormGroupEvent(controlName, formGroup, type, validation);
  }
}
