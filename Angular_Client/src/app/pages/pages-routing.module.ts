import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./_layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "builder",
        loadChildren: () => import("./builder/builder.module").then((m) => m.BuilderModule),
      },
      {
        path: "ecommerce",
        loadChildren: () => import("../modules/e-commerce/e-commerce.module").then((m) => m.ECommerceModule),
      },
      {
        path: "user-management",
        loadChildren: () =>
          import("../modules/user-management/user-management.module").then((m) => m.UserManagementModule),
      },
      {
        path: "user-profile",
        loadChildren: () => import("../modules/user-profile/user-profile.module").then((m) => m.UserProfileModule),
      },
      {
        path: "ngbootstrap",
        loadChildren: () => import("../modules/ngbootstrap/ngbootstrap.module").then((m) => m.NgbootstrapModule),
      },
      {
        path: "wizards",
        loadChildren: () => import("../modules/wizards/wizards.module").then((m) => m.WizardsModule),
      },
      {
        path: "material",
        loadChildren: () => import("../modules/material/material.module").then((m) => m.MaterialModule),
      },
      //Module danh mục dành cho giáo viên bộ môn
      {
        path: "danh-muc",
        loadChildren: () => import("../pages/components/__danh_muc/danh-muc.module").then((m) => m.DanhMucModule),
      },
      //Module dành cho quản trị
      {
        path: "quan-tri",
        loadChildren: () => import("../pages/components/__quan_tri/quan-tri.module").then((m) => m.QuanTriModule),
      },
      //Module dành cho học sinh
      {
        path: "hoc-sinh",
        loadChildren: () => import("../pages/components/__hoc_sinh/hoc-sinh.module").then((m) => m.HocSinhModule),
      },
      //Module dành cho học sinh
      {
        path: "chu-nhiem",
        loadChildren: () => import("../pages/components/__chu_nhiem/chu-nhiem.module").then((m) => m.ChuNhiemModule),
      },
      //Module dành cho học sinh
      {
        path: "ca-nhan",
        loadChildren: () => import("../pages/components/__ca-nhan/ca-nhan.module").then((m) => m.CaNhanModule),
      },
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "error/404",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
