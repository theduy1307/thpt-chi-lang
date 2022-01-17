import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface IAccount extends BaseModel {
    Id: number;
    IdNv: number;
    Manv: string;
    Holot: string;
    Ten: string;
    HoTen: string;
    Phai: string;
    Ngaysinh: string | null;
    Email: string;
    IdChucdanh: number | null;
    TenChucDanh: string | null;
    LoaiTaiKhoan: number | null;
    Disable: number | null;
    SodienthoaiNguoilienhe: string;
    Cocauid: number | null;
    TenCoCau:string
    Username: string;
    Password: string;
    FileImport: any;
    Picture: string;
    Lop:string;
    Role: number[];
}

export class AccountImport {
    messageHolot: string;
    messageTen: string;
    messageHoTen: string;
    messagePhai: string;
    messageNgaysinh: string
    messageLoaiTaiKhoan: string
    messageSodienthoaiNguoilienhe: string;
    messageLop: string;
    isError:boolean;

    clear() {
        this.messageHolot= "";
        this.messageTen= "";
        this.messageHoTen= "";
        this.messagePhai= "";
        this.messageNgaysinh="";
        this.messageLoaiTaiKhoan="";
        this.messageSodienthoaiNguoilienhe= "";
        this.messageLop= "";
        this.isError=false;
    }
}


export const EMPTY_DATA: IAccount = {
    id: undefined,
    data: undefined,
    status: undefined,
    Id: undefined,
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
    TenCoCau:"",
    SodienthoaiNguoilienhe: "",
    Username: "",
    Password: "",
    Picture: "",
    FileImport: undefined,
    Lop:"",
    Role: [],
  };

export class Account {
    id:number;
    status:number;
    data:any
    Id: number;
    IdNv: number;
    Manv: string;
    Holot: string;
    Ten: string;
    HoTen: string;
    Phai: string;
    Ngaysinh: string | null;
    Email: string;
    IdChucdanh: number | null;
    TenChucDanh: string | null;
    LoaiTaiKhoan: number | null;
    Disable: number | null;
    SodienthoaiNguoilienhe: string;
    Cocauid: number | null;
    TenCoCau:string
    Username: string;
    Password: string;
    FileImport: any;
    Picture: string;
    Role: number[];
    isError: boolean;
    Lop: string;

    copy(item:Account) {
        this.id = item.id
        this.status = item.status
        this.data = item.data
        this.Id = item.Id
        this.IdNv = item.IdNv
        this.Manv = item.Manv
        this.Holot = item.Holot
        this.Ten = item.Ten
        this.HoTen = item.HoTen
        this.Phai = item.Phai
        this.Ngaysinh = item.Ngaysinh
        this.Email = item.Email
        this.IdChucdanh = item.IdChucdanh
        this.TenChucDanh = item.TenChucDanh
        this.LoaiTaiKhoan = item.LoaiTaiKhoan
        this.Disable = item.Disable
        this.SodienthoaiNguoilienhe = item.SodienthoaiNguoilienhe
        this.Cocauid = item.Cocauid
        this.TenCoCau = item.TenCoCau
        this.Username = item.Username
        this.Password = item.Password
        this.FileImport = item.FileImport
        this.Picture = item.Picture
        this.Role = item.Role
        this.Lop = item.Lop
        this.isError = item.isError
    }
}