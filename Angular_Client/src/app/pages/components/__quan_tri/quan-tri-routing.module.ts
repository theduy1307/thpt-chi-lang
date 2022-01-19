import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuanLiMonHocEditComponent } from "./quan-li-mon-hoc/quan-li-mon-hoc-edit/quan-li-mon-hoc-edit.component";
import { QuanLiLopComponent } from "./quan-li-lop/quan-li-lop.component";
import { MonHocComponent } from "./quan-li-mon-hoc/quan-li-mon-hoc.component";
import { QuanLiNienKhoaComponent } from "./quan-li-nien-khoa/quan-li-nien-khoa.component";
import { QuanLiTaiKhoanCreateComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan-create/quan-li-tai-khoan-create.component";
import { QuanLiTaiKhoanEditComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan-edit/quan-li-tai-khoan-edit.component";
import { QuanLiTaiKhoanComponent } from "./quan-li-tai-khoan/quan-li-tai-khoan.component";
import { QuanTriComponent } from "./quan-tri.component";
import { QuanLiTaiKhoanHocSinhComponent } from "./quan-li-tai-khoan-hoc-sinh/quan-li-tai-khoan-hoc-sinh.component";
import { AuthGuard } from "src/app/modules/auth/_services/auth.guard";
import { QuanTriAuthGuard } from "./quan-tri-auth.guard";

const routes: Routes = [
  {
    path: "",
    component: QuanTriComponent,
    canActivate:[QuanTriAuthGuard],
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
      //Quản lý niên khóa
       {
        path: "quan-li-nien-khoa",
        component: QuanLiNienKhoaComponent,
      },
      //Quản lý lớp
      {
        path: "quan-li-lop",
        component: QuanLiLopComponent,
      },
      //Quản lí tài khoản
      {
        path: "quan-li-tai-khoan-hoc-sinh",
        component: QuanLiTaiKhoanHocSinhComponent,
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
