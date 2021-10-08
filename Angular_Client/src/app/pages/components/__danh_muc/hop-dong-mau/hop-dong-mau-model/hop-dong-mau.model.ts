import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IMauHopDong extends BaseModel {
    Id: number;
    TenMau: string;
    LoaiHopDong_Id: number;
    NguoiTao: number;
    TenNguoiTao: string;
    ThoiGianTao: string | null;
    NguoiSua: number;
    ThoiGianSua: string | null;
    IsDisable: boolean;
    NgayHieuLuc_Tu: string;
    NgayHieuLuc_Den: string;
    TrangThai: number;
    NhomHopDong: number;
    Attachment_Id: number;
    FileImport: FileImport
    FileName:string
    DanhSachThongTinHopDong: IMauHopDong_ThongTin[];
}

export interface IMauHopDong_ThongTin {
    Id: number;
    MauHopDong_id: number;
    TuKhoaThayThe: string;
    TenTuKhoa: string;
    NoiDungMacDinh: string;
    IsDisable: boolean;
    NguoiSua: number;
    NgaySua: string;
}

export class FileImport {
    idLoaiHH: number;
    base64: string;
    fileByte: any;
    filename: string;
    dienGiai: string;
    extension: string;

    clear() {
        this.idLoaiHH = 0;
        this.base64 = '';
        this.fileByte = null;
        this.filename = '';
        this.dienGiai = '';
        this.extension = '';
    }

    copy(item: FileImport) {
        this.idLoaiHH = item.idLoaiHH;
        this.base64 = item.base64;
        this.fileByte = item.fileByte;
        this.filename = item.filename;
        this.dienGiai = item.dienGiai;
        this.extension = item.extension;
    }
}