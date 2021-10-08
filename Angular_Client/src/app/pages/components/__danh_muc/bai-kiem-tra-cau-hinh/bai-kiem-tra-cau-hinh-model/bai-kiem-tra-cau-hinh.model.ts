import { BaseModel } from "src/app/_metronic/shared/crud-table/models/base.model";

export interface IBaiKiemTraCauHinh_Group extends BaseModel {
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
  IsDisabled: boolean;
  DanhSachCauHoi: IQuestion[];
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
  IsCustom: boolean;
}
