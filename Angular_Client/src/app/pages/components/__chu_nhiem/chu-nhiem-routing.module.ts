import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChuNhiemComponent } from "./chu-nhiem.component";
import { QuanLyThongBaoComponent } from "./quan-ly-thong-bao/quan-ly-thong-bao.component";

const routes: Routes = [
  {
    path: "",
    component: ChuNhiemComponent,
    //canActivate:[GiaoVienAuthGuard],
    children: [
        // danh sách câu hỏi
      {
        path: "thong-bao",
        component: QuanLyThongBaoComponent,
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
