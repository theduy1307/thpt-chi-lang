import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IMauDieuKhoan extends BaseModel {
    Id: number;
    TenDieuKhoan: string;
    ChiTietDieuKhoan: string;
    NguoiTao: number;
    TenNguoiTao: string;
    NgayTao: string;
    NhomHopDong: number;
    GhiChu: string;
    NguoiSua: number;
    TenNguoiSua: string;
    NgaySua: string;
    IsDisable: boolean;
}