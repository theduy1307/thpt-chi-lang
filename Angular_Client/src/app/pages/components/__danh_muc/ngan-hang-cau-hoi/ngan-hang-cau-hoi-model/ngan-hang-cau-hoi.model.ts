import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IQuestion extends BaseModel {
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
}
