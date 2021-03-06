import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaiKiemTraTrucTuyenDetailComponent } from "./bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen-detail/bai-kiem-tra-truc-tuyen-detail.component";
import { BaiKiemTraTrucTuyenComponent } from "./bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen.component";
import { HocSinhAuthGuard } from "./hoc-sinh-auth.guard";
import { HocSinhComponent } from "./hoc-sinh.component";
import { ThongBaoDetailComponent } from "./thong-bao/thong-bao-detail/thong-bao-detail.component";
import { ThongBaoComponent } from "./thong-bao/thong-bao.component";


const routes: Routes = [
  {
    path: "",
    component: HocSinhComponent,
    canActivate:[HocSinhAuthGuard],
    children: [
      {
        path: "danh-sach-bai-kiem-tra-truc-tuyen",
        component: BaiKiemTraTrucTuyenComponent,
      },
      //do exam, lấy chi tiết
      {
        path: "danh-sach-bai-kiem-tra-truc-tuyen/detail/:id",
        component: BaiKiemTraTrucTuyenDetailComponent,
      },
      //do exam, lấy chi tiết
      {
        path: "danh-sach-thong-bao",
        component: ThongBaoComponent,
      },
      {
        path: "danh-sach-thong-bao/:id",
        component: ThongBaoDetailComponent,
      },
      { path: "", redirectTo: "error/404", pathMatch: "full" },
      { path: "**", redirectTo: "error/404", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuanTriRoutingModule {}
