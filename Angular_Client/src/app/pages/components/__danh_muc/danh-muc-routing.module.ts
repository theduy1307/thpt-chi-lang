import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BaiKiemTraCauHinhAddComponent } from "./bai-kiem-tra-cau-hinh/bai-kiem-tra-cau-hinh-add/bai-kiem-tra-cau-hinh-add.component";
import { BaiKiemTraCauHinhComponent } from "./bai-kiem-tra-cau-hinh/bai-kiem-tra-cau-hinh.component";
import { BaiKiemTraAddComponent } from "./bai-kiem-tra/bai-kiem-tra-add/bai-kiem-tra-add.component";
import { SuccessComponent } from "./bai-kiem-tra/bai-kiem-tra-add/success/success.component";
import { BaiKiemTraComponent } from "./bai-kiem-tra/bai-kiem-tra.component";
import { DanhMucComponent } from "./danh-muc.component";
import { DieuKhoanMauComponent } from "./dieu-khoan-mau/dieu-khoan-mau.component";
import { HanMucChietKhauComponent } from "./han-muc-chiet-khau/han-muc-chiet-khau.component";
import { HopDongMauAddComponent } from "./hop-dong-mau/hop-dong-mau-add/hop-dong-mau-add.component";
import { HopDongMauDetailComponent } from "./hop-dong-mau/hop-dong-mau-detail/hop-dong-mau-detail.component";
import { HopDongMauEditComponent } from "./hop-dong-mau/hop-dong-mau-edit/hop-dong-mau-edit.component";
import { HopDongMauComponent } from "./hop-dong-mau/hop-dong-mau.component";
import { LoaiHopDongComponent } from "./loai-hop-dong/loai-hop-dong.component";
import { QuestionComponent } from "./ngan-hang-cau-hoi/ngan-hang-cau-hoi.component";
import { InBaiKiemTraComponent } from "./in-bai-kiem-tra/in-bai-kiem-tra.component";
import { BaiKiemTraCauHinhEditComponent } from "./bai-kiem-tra-cau-hinh/bai-kiem-tra-cau-hinh-edit/bai-kiem-tra-cau-hinh-edit.component";
import { BaiKiemTraTrucTuyenComponent } from "./bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen.component";
import { BaiKiemTraTrucTuyenEditComponent } from "./bai-kiem-tra-truc-tuyen/bai-kiem-tra-truc-tuyen-edit/bai-kiem-tra-truc-tuyen-edit.component";
import { GiaoVienAuthGuard } from "./giao-vien-auth.guard";

const routes: Routes = [
  {
    path: "",
    component: DanhMucComponent,
    canActivate:[GiaoVienAuthGuard],
    children: [
      // danh s??ch c??u h???i
      {
        path: "cau-hoi",
        component: QuestionComponent,
      },
      // danh s??ch b??i ki???m tra
      {
        path: "danh-sach-bai-kiem-tra",
        component: BaiKiemTraComponent,
      },
      // danh s??ch b??i ki???m tra
      {
        path: "danh-sach-bai-kiem-tra/them-moi",
        component: BaiKiemTraAddComponent,
      },
      // danh s??ch b??i ki???m tra
      {
        path: "danh-sach-bai-kiem-tra/thanh-cong",
        component: SuccessComponent,
      },
      // in b??i ki???m tra
      {
        path: "danh-sach-bai-kiem-tra/print/:id",
        component: InBaiKiemTraComponent,
      },
      // danh s??ch b??i ki???m tra c???u h??nh
      {
        path: "danh-sach-bai-kiem-tra-cau-hinh",
        component: BaiKiemTraCauHinhComponent,
      },
      // th??m m???i b??i ki???m tra c???u h??nh
      {
        path: "danh-sach-bai-kiem-tra-cau-hinh/them-moi-cau-hinh",
        component: BaiKiemTraCauHinhAddComponent,
      },
      // ch???nh s???a b??i ki???m tra c???u h??nh
      {
        path: "danh-sach-bai-kiem-tra-cau-hinh/chinh-sua-cau-hinh/:id",
        component: BaiKiemTraCauHinhEditComponent,
      },
      // in b??i ki???m tra
      {
        path: "danh-sach-bai-kiem-tra-cau-hinh/print/:id",
        component: InBaiKiemTraComponent,
      },
      // danh s??ch b??i ki???m tra tr???c tuy???n
      {
        path: "danh-sach-bai-kiem-tra-truc-tuyen",
        component: BaiKiemTraTrucTuyenComponent,
      },
      // danh s??ch b??i ki???m tra tr???c tuy???n
      {
        path: "danh-sach-bai-kiem-tra-truc-tuyen/chinh-sua/:id",
        component: BaiKiemTraTrucTuyenEditComponent,
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
export class DanhMucRoutingModule {}
