import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IBaiKiemTra_Group extends BaseModel {
  Id: number;
  TenBaiKiemTra: string;
  SoLuongDe: number;
  CauDe: number;
  CauTrungBinh: number;
  CauKho: number;
  ThoiGianLamBai: number;
  HocKy: number;
  Lop: number;
  NamHoc:string;
  IdMonHoc:number
  NguoiTao: number;
  TenNguoiTao: string;
  NgayTao: string;
  NguoiSua: number;
  NgaySua: string;
  TrangThai: number;
  IsDisabled: boolean;
  DanhSachBaiHoc: IBaiHoc[];
}
export interface IBaiHoc {
  Id: number;
  IdChuong: number;
  SoThuTu: number;
  MaBaiHoc: string;
  TenBaiHoc: string;
}
