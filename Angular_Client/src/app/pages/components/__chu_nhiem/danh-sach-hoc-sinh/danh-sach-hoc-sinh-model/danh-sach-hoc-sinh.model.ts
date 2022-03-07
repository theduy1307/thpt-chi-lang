import { BaseModel } from 'src/app/_metronic/shared/crud-table';

export interface IDanhSachHocSinh extends BaseModel {
  IdNv: number;
  Manv: string;
  HoTen: string;
  Phai: string;
  NgaySinh: string;
  SdtNguoiLienHe: string;
  TenLop: string;
  IdNienKhoa: number;
  TenNienKhoa: string;
}
