import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaiKiemTraTrucTuyenComponent } from "./bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen.component";
import { HocSinhComponent } from "./hoc-sinh.component";


const routes: Routes = [
  {
    path: "",
    component: HocSinhComponent,
    children: [
      //Điều khoản mẫu
      {
        path: "danh-sach-bai-kiem-tra-truc-tuyen",
        component: BaiKiemTraTrucTuyenComponent,
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
