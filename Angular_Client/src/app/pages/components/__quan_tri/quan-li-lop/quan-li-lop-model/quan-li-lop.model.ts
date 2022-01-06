import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface ILop extends BaseModel {
    Id: number;
    TenLop: string;
    Loai: string;
    IdNienKhoa: number;
    TenNienKhoa: string;
    IdChuNhiem: number;
    TenChuNhiem: string;
    IsDisable: boolean;
    NguoiTao: number;
    TenNguoiTao: string;
    NgayTao: string;
    NguoiSua: number;
    NgaySua: string;
}