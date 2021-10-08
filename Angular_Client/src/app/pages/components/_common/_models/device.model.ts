export class DmThietBiSanXuat{
    Id: number
    QtsxCongDoanId: number
    TenThietBi: string
    Prior: number
    IsDisable: boolean
    NguoiTao: number
    NgayTao: string
    NguoiSua: number
    NgaySua: string

    flagSave: boolean

    clear(){
        this.Id = 0;
        this.QtsxCongDoanId = 0;
        this.TenThietBi = '';
        this.Prior = 0;
        this.IsDisable = false;
        this.NguoiTao = 0;
        this.NgayTao = '';
        this.NguoiSua = 0;
        this.NgaySua = '';
        this.flagSave = false;
    }

    copy(item: DmThietBiSanXuat){
        this.Id = item.Id;
        this.QtsxCongDoanId = item.QtsxCongDoanId;
        this.TenThietBi = item.TenThietBi;
        this.Prior = item.Prior;
        this.IsDisable = item.IsDisable;
        this.NguoiTao = item.NguoiTao;
        this.NgayTao = item.NgayTao;
        this.NguoiSua = item.NguoiSua;
        this.NgaySua = item.NgaySua;
    }
}