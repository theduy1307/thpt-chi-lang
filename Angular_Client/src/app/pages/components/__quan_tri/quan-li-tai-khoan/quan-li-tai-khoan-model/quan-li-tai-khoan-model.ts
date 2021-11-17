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
    TenChucDanh: string;
    Disable: number | null;
    SodienthoaiNguoilienhe: string;
    Cocauid: number | null;
    Username: string;
    Password: string;
    Picture: string;
}