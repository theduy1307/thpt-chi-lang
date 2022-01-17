import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IBaiKiemTra {
  Id: number;
  IdGroup: number;
  MaDe: string;
  DanhSachCauHoi: IBaiKiemTra_ChiTiet[];
}

export interface IBaiKiemTra_ChiTiet {
  data: IBaiKiemTra_ChiTiet;
  Id: number;
  IdBaiKiemTra: number;
  IdCauHoi: number;
  TieuDe: string;
  CauA: string;
  CauB: string;
  CauC: string;
  CauD: string;
  CauDung: number;
}
export interface IBaiKiemTra_Print extends BaseModel {
  Id: number;
  TenBaiKiemTra: string;
  ThoiGianLamBai: number;
  NamHoc: string;
  MonHoc: string;
  HocKy: number;
  Lop: number;
  DanhSachBaiKiemTra: IBaiKiemTra[];
}
