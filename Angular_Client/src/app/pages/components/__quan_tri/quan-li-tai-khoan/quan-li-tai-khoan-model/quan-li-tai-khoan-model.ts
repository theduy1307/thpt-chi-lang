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
    FileImport: FileImport;
    Picture: string;
    Role: number[];
    AllowCode:number;
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
    FileImport: new FileImport(),
    Role: [],
    AllowCode:undefined
  };