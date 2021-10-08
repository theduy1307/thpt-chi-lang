import { Component, Input, OnInit } from "@angular/core";
import { of, Subscription } from "rxjs";
import { catchError, first } from "rxjs/operators";
import { IBaiKiemTra_Print } from "./in-bai-kiem-tra-model/bai-kiem-tra.model";
import { InBaiKiemTraService } from "./in-bai-kiem-tra-service/in-bai-kiem-tra.service";

@Component({
  selector: "app-print",
  templateUrl: "./in-bai-kiem-tra.component.html",
  styleUrls: ["./in-bai-kiem-tra.component.css"],
})
export class InBaiKiemTraComponent implements OnInit {
  @Input() id: number;
  data: IBaiKiemTra_Print;
  private subscriptions: Subscription[] = [];
  constructor(private services: InBaiKiemTraService) {}

  ngOnInit(): void {
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
    const sb = this.services
      .getItemById(this.id)
      .pipe(
        first(),
        catchError((errorMessage) => {
          return of(this.initData());
        })
      )
      .subscribe((result: IBaiKiemTra_Print) => {
        this.data = result.data;
      });
    this.subscriptions.push(sb);
  }
}
