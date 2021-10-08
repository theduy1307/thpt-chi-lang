import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface ILoaiHopDong extends BaseModel {
    Id: number
    TenLoai: string
    NhomHopDong: number
    IsDisable: boolean
    NguoiTao: number
    NgayTao: String
    MoTa: string
    NguoiSua: number
    NgaySua: String
    TenNguoiLap: String
    ThemChiTiet: boolean
}
