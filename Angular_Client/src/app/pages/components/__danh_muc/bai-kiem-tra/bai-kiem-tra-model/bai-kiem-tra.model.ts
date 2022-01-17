import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IBaiKiemTra_Group extends BaseModel {
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
  NamHoc:string;
  IdMonHoc:number
  NguoiTao: number;
  TenNguoiTao: string;
  NgayTao: string;
  NguoiSua: number;
  NgaySua: string;
  TrangThai: number;
  IsDisabled: boolean;
  IsCustom:boolean;
  DanhSachBaiHoc: IBaiHoc[];
}
export interface IBaiHoc {
  Id: number;
  IdChuong: number;
  SoThuTu: number;
  MaBaiHoc: string;
  TenBaiHoc: string;
}

export const EMPTY_DATA:IBaiKiemTra_Group = {
  id:undefined, data:undefined, status:undefined,
  Id: undefined,
  TenBaiKiemTra: "",
  SoLuongDe: undefined,
  CauBiet: undefined,
  CauHieu: undefined,
  CauVanDungThap: undefined,
  CauVanDungCao: undefined,
  ThoiGianLamBai: undefined,
  HocKy: undefined,
  Lop: undefined,
  NamHoc:"",
  IdMonHoc:undefined,
  NguoiTao: undefined,
  TenNguoiTao: "",
  NgayTao: "",
  NguoiSua: undefined,
  NgaySua: "",
  TrangThai: undefined,
  IsDisabled: undefined,
  IsCustom: undefined,
  DanhSachBaiHoc: []
}

export interface IBaiKiemTra_TrucTuyen_Group extends BaseModel {
  Id: number
  Id_BaiKiemTra_Offline: number
  TenBaiKiemTra: string;
  SoLuongDe: number;
  CauBiet: number;
  CauHieu: number;
  CauVanDungThap: number;
  CauVanDungCao: number;
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
  IsCustom: boolean
  NgayThi: string
  GioThi: string
  Password: string
  isExam: boolean
}