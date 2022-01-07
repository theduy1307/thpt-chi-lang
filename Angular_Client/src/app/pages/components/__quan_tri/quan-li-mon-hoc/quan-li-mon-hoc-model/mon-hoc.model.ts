import * as moment from "moment";
import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IMonHoc {
  Id: number;
  MaMonHoc: string;
  TenMonHoc: string;
  NguoiTao: number;
  NgayTao: string;
  NguoiSua: number;
  NgaySua: string;
  IsDisabled: boolean;
  QuestionCount:number[];
  ExamCount:number[];
  DanhSachGiaoVien: NhanVien[];
}

export interface NhanVien {
  IdNv: number;
  Manv: string;
  Holot: string;
  Ten: string;
  HoTen: string;
  Phai: string;
  BoMon: number | null;
}

export interface IChuongMonHoc extends BaseModel {
  Id: number;
  IdMonHoc: number;
  SoThuTu: number;
  MaChuong: string;
  TenChuong: string;
  Lop: number;
  NguoiTao: number;
  NgayTao: string;
  NguoiSua: number;
  NgaySua: string;
  IsDisabled: boolean;
}

export const EMPTY_DATA_CHUONG:IChuongMonHoc = {
  id:undefined, data:undefined, status:undefined,
  Id: undefined,
  IdMonHoc: undefined,
  SoThuTu: undefined,
  MaChuong: "",
  TenChuong: "",
  Lop: undefined,
  NguoiTao: undefined,
  NgayTao: "",
  NguoiSua: undefined,
  NgaySua: "",
  IsDisabled: undefined,
}

export interface IBaiHoc extends BaseModel {
  Id: number;
  IdChuong: number;
  SoThuTu: number;
  HocKy: number;
  MaBaiHoc: string;
  TenBaiHoc: string;
  NguoiTao: number;
  NgayTao: string;
  NguoiSua: number;
  NgaySua: string;
  IsDisabled: boolean;
}

export const EMPTY_DATA_BAIHOC:IBaiHoc = {
  id:undefined, data:undefined, status:undefined,
  Id: undefined,
  IdChuong: undefined,
  SoThuTu: undefined,
  HocKy: undefined,
  MaBaiHoc: "",
  TenBaiHoc: "",
  NguoiTao: undefined,
  NgayTao: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
  NguoiSua: undefined,
  NgaySua: moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
  IsDisabled: false,
}

export const EMPTY_DATA_CHUONGMONHOC:IChuongMonHoc[] = []