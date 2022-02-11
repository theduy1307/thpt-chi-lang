import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChuNhiemComponent } from "./chu-nhiem.component";
import { DanhSachHocSinhComponent } from "./danh-sach-hoc-sinh/danh-sach-hoc-sinh.component";
import { QuanLyThongBaoComponent } from "./quan-ly-thong-bao/quan-ly-thong-bao.component";

const routes: Routes = [
  {
    path: "",
    component: ChuNhiemComponent,
    //canActivate:[GiaoVienAuthGuard],
    children: [
      // thông báo
      {
        path: "thong-bao",
        component: QuanLyThongBaoComponent,
      },
      // danh sách học sinh
      {
        path: "danh-sach-hoc-sinh",
        component: DanhSachHocSinhComponent,
      },
      { path: "", redirectTo: "cau-hoi", pathMatch: "full" },
      { path: "**", redirectTo: "cau-hoi", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChuNhiemRoutingModule {}
