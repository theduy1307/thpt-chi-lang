import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IBaiKiemTra_TrucTuyen_Group extends BaseModel {
  Id: number;
  TenBaiKiemTra: string;
  SoLuongDe: number;
  CauBiet: number;
  CauHieu: number;
  CauVanDungThap: number;
  CauVanDungCao: number;
  ThoiGianLamBai: number;
  HocKy: number;
  Lop: number;
  NamHoc: string;
  IdMonHoc: number;
  NguoiTao: number;
  TenNguoiTao: string;
  NgayTao: string;
  NguoiSua: number;
  NgaySua: string;
  TrangThai: number;
  IsCustom: boolean;
  IsDisabled: boolean;
  DanhSachCauHoi: IQuestion[];
}
export interface IBaiHoc {
  Id: number;
  IdChuong: number;
  SoThuTu: number;
  MaBaiHoc: string;
  TenBaiHoc: string;
}

export interface IQuestion {
  Id: number;
  Title: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  CorrectOption: number;
  IdBaiHoc: number;
  TenBaiHoc: string;
  IdChuong: number;
  TenChuong: string;
  Class: number;
  Level: number;
  TenNguoiTao: string;
  CreateDate: string;
  CreateBy: number;
  ModifyDate: string;
  ModifyBy: number;
  IsDisabled: boolean;
  IsCustom:boolean;
  IdBaiKiemTra_Group:number;
}
export interface IBaiKiemTra_TrucTuyen_HocSinh_ChiTiet  {
  Id : number
  IdBaiKiemTraHocSinh : number
  IdQueston : number
  choosen : number
  TieuDe: string
  CauA: string
  CauB: string
  CauC: string
  CauD: string
}
