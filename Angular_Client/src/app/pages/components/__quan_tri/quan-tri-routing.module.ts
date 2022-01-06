import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuanLiMonHocEditComponent } from "./quan-li-mon-hoc/quan-li-mon-hoc-edit/quan-li-mon-hoc-edit.component";
import { MonHocComponent } from "./quan-li-mon-hoc/quan-li-mon-hoc.component";
import { QuanLiTaiKhoanCreateComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan-create/quan-li-tai-khoan-create.component";
import { QuanLiTaiKhoanEditComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan-edit/quan-li-tai-khoan-edit.component";
import { QuanLiTaiKhoanComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan.component";
import { QuanTriComponent } from "./quan-tri.component";

const routes: Routes = [
  {
    path: "",
    component: QuanTriComponent,
    children: [
      //Danh sách môn hoc4
      {
        path: "quan-li-mon-hoc",
        component: MonHocComponent,
      },
      //Quản lí môn học
      {
        path: "quan-li-mon-hoc/chinh-sua/:id",
        component: QuanLiMonHocEditComponent,
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
        component: QuanLiTaiKhoanEditComponent,
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
