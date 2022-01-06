import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface INienKhoa extends BaseModel {
    Id: number;
    TenNienKhoa: string;
    IsDisable: boolean;
    NguoiTao: number;
    TenNguoiTao: string;
    NgayTao: string;
    NguoiSua: number;
    NgaySua: string;
}