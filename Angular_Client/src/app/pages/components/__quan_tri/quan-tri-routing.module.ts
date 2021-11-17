import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonHocComponent } from "./quan-li-mon-hoc/quan-li-mon-hoc.component";
import { QuanLiTaiKhoanCreateComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan-create/quan-li-tai-khoan-create.component";
import { QuanLiTaiKhoanComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan.component";
import { QuanTriComponent } from "./quan-tri.component";

const routes: Routes = [
  {
    path: "",
    component: QuanTriComponent,
    children: [
      //Điều khoản mẫu
      {
        path: "quan-li-mon-hoc",
        component: MonHocComponent,
      },
      //Quản lí tài khoản
      {
        path: "quan-li-tai-khoan",
        component: QuanLiTaiKhoanComponent,
      },
      //Quản lí tài khoản
      {
        path: "quan-li-tai-khoan/them-moi",
        component: QuanLiTaiKhoanCreateComponent,
      },
      //Quản lí tài khoản
      {
        path: "quan-li-tai-khoan/chinh-sua/:id",
        component: QuanLiTaiKhoanCreateComponent,
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
