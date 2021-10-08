export class RecordsResult{
    Id: number
    ThoiGianVao: string
    strComeInTime:string
    ThoiGianRa: string
    strComeOutTime: string
    NguoiGhiNhan: number
    TenNguoiGhiNhan: string
    ThoiGianGhiNhan: string
    IsDisable: boolean
    NguoiSua: number
    NgaySua: string
    DmThietBiSanXuatId: number
    TenThietBi: string
    ThongTin: string
    KhoiLuong: number
    HangHoaId: number
    QtsxCongDoanId: number

    RecordsResult(){
        this.Id = 0;
        this.ThoiGianVao = '';
        this.strComeInTime = '';
        this.ThoiGianRa  = '';
        this.strComeOutTime = '';
        this.NguoiGhiNhan = 0;
        this.TenNguoiGhiNhan = '';
        this.ThoiGianGhiNhan  = '';
        this.IsDisable = false;
        this.NguoiSua = 0;
        this.NgaySua = '';
        this.DmThietBiSanXuatId = 0;
        this.TenThietBi = '';
        this.ThongTin  = '';
        this.KhoiLuong = 0;
        this.HangHoaId = 0;
        this.QtsxCongDoanId = 0;
    }

    copy(copyItem: RecordsResult){
        this.Id = copyItem.Id;
        this.ThoiGianVao =  copyItem.ThoiGianVao;
        this.strComeInTime = copyItem.strComeInTime;
        this.ThoiGianRa  =  copyItem.ThoiGianRa;
        this.strComeOutTime = copyItem.strComeOutTime;
        this.NguoiGhiNhan = copyItem.NguoiGhiNhan;
        this.TenNguoiGhiNhan = copyItem.TenNguoiGhiNhan;
        this.ThoiGianGhiNhan  = copyItem.ThoiGianGhiNhan;
        this.IsDisable =  copyItem.IsDisable;
        this.NguoiSua = copyItem.NguoiSua;
        this.NgaySua =  copyItem.NgaySua;
        this.DmThietBiSanXuatId =  copyItem.DmThietBiSanXuatId;
        this.TenThietBi = copyItem.TenThietBi;
        this.ThongTin  =  copyItem.ThongTin;
        this.KhoiLuong =  copyItem.KhoiLuong;
        this.HangHoaId =  copyItem.HangHoaId;
        this.QtsxCongDoanId =  copyItem.QtsxCongDoanId;
    }
}

export class CongDoanJson{
    TieuChiDanhGia: TieuChiDanhGiaJson[];
    ThongSoKiemSoatJson: ThongSoKiemSoatJson[];
}

export class TieuChiDanhGiaJson{
    Name: string
    Value: string
    IdTCDG: number
    DVTName: string

    TieuChiDanhGiaJson(){
        this.Name = '';
        this.Value = '';
        this.IdTCDG = 0;
        this.DVTName = '';
    }

    copy(copyItem: TieuChiDanhGiaJson){
        this.Name = copyItem.Name;
        this.Value = copyItem.Value;
        this.IdTCDG = copyItem.IdTCDG;
        this.DVTName = copyItem.DVTName;
    }
}

export class ThongSoKiemSoatJson{
    Name: string
    Value: string
    IdTSKS: number
    DVTName: string

    TieuChiDanhGiaJson(){
        this.Name = '';
        this.Value = '';
        this.IdTSKS = 0;
        this.DVTName = '';
    }

    copy(copyItem: ThongSoKiemSoatJson){
        this.Name = copyItem.Name;
        this.Value = copyItem.Value;
        this.IdTSKS = copyItem.IdTSKS;
        this.DVTName = copyItem.DVTName;
    }
}