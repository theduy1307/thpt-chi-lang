export interface IMonHoc {
  Id: number;
  MaMonHoc: string;
  TenMonHoc: string;
  NguoiTao: number;
  NgayTao: string;
  NguoiSua: number;
  NgaySua: string;
  IsDisabled: boolean;
  QuestionCount:number[];
  ExamCount:number[];
  DanhSachGiaoVien: NhanVien[];
}

export interface NhanVien {
  IdNv: number;
  Manv: string;
  Holot: string;
  Ten: string;
  HoTen: string;
  Phai: string;
  BoMon: number | null;
}