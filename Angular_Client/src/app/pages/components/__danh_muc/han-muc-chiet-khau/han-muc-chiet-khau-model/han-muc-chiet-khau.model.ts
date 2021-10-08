import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IHanMucChietKhau extends BaseModel {
    Id: number;
    TenHanMuc: string;
    GiaTriMacDinh: number;
    IsDisable: boolean;
    NguoiTao: number;
    TenNguoiTao: string;
    NgayTao: string;
    NguoiSua: number;
    NgaySua: string;
    MoTa: string;
}