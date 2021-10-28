import { Component, Input, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { of, Subscription } from "rxjs";
import { catchError, first, switchMap } from "rxjs/operators";
import { IBaiKiemTra_Print } from "./in-bai-kiem-tra-model/bai-kiem-tra.model";
import { InBaiKiemTraService } from "./in-bai-kiem-tra-service/in-bai-kiem-tra.service";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: "app-print",
  templateUrl: "./in-bai-kiem-tra.component.html",
  styleUrls: ["./in-bai-kiem-tra.component.css"],
})
export class InBaiKiemTraComponent implements OnInit {
  @Input() id: number;
  @ViewChild('htmlData') htmlData:ElementRef;
  data: IBaiKiemTra_Print;
  errorMessage = "";
  private subscriptions: Subscription[] = [];
  constructor(private services: InBaiKiemTraService,
              private router: Router,
              private route: ActivatedRoute,
              ) {}

  ngOnInit(): void {
    console.log(this.id)
    this.loadData();
  }
  initData(): IBaiKiemTra_Print {
    const EMPTY_Data: IBaiKiemTra_Print = {
      id: undefined,
      data: undefined,
      status: undefined,
      Id: undefined,
      TenBaiKiemTra: undefined,
      ThoiGianLamBai: undefined,
      NamHoc: undefined,
      MonHoc: undefined,
      HocKy: undefined,
      Lop: undefined,
      DanhSachBaiKiemTra: [],
    };
    return EMPTY_Data;
  }
  loadData() {
    this.data = this.initData();
    const sb = this.route.paramMap
      .pipe(
        switchMap((params) => {
          // get id from URL
          this.id = Number(params.get("id"));
          if (this.id || this.id > 0) {
            return this.services.getItemById(this.id);
          }
          return of(this.initData());
        }),
        catchError((errorMessage) => {
          this.errorMessage = errorMessage;
          return of(undefined);
        })
      )
      .subscribe((res: IBaiKiemTra_Print) => {
        if (!res) {
          this.router.navigate(["/danh-sach-bai-kiem-tra"], { relativeTo: this.route });
        }
        this.data = res.data;
        console.log(this.data)
      });
    this.subscriptions.push(sb);
  }

  public openPDF():void {
    let doc = new jsPDF();
    doc.text('Hello world',20, 20)
  }
}
