import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IAccount extends BaseModel {
    IdNv: number;
    Manv: string;
    Holot: string;
    Ten: string;
    HoTen: string;
    Phai: string;
    Ngaysinh: string | null;
    Email: string;
    IdChucdanh: number | null;
    LoaiTaiKhoan:number |null;
    TenChucDanh: string;
    Disable: number | null;
    SodienthoaiNguoilienhe: string;
    Cocauid: number | null;
    Username: string;
    Password: string;
    Picture: string;
}

export const EMPTY_DATA: IAccount = {
    id: undefined,
    data: undefined,
    status: undefined,
    IdNv: undefined,
    Manv: "",
    Holot: "",
    Ten: "",
    HoTen: "",
    Phai: "",
    Ngaysinh: "",
    Email: "",
    IdChucdanh: undefined,
    LoaiTaiKhoan:undefined,
    TenChucDanh: "",
    Disable: undefined,
    Cocauid: undefined,
    SodienthoaiNguoilienhe: "",
    Username: "",
    Password: "",
    Picture: "",
  };