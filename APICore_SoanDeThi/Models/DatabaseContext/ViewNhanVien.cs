﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public partial class ViewNhanVien
    {
        [Key]
        public long IdNv { get; set; }
        public string Manv { get; set; }
        public string Holot { get; set; }
        public string Ten { get; set; }
        public string HoTen
        {
            get
            {
                return Holot + " " + Ten;
            }
        }
        public string Phai { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string ThuongtruDiachi { get; set; }
        public long? ThuongtruTinh { get; set; }
        public long? ThuongtruHuyen { get; set; }
        public string ThuongtruPhone { get; set; }
        public string TamtruDiachi { get; set; }
        public long? TamtruTinh { get; set; }
        public long? TamtruHuyen { get; set; }
        public string TamtruPhone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public long? Tinh { get; set; }
        public long? Dantoc { get; set; }
        public long? Tongiao { get; set; }
        public string Cmnd { get; set; }
        public DateTime? Ngaycap { get; set; }
        public string Noicap { get; set; }
        public string Passport { get; set; }
        public DateTime? Ngaycappassport { get; set; }
        public string Noicappassport { get; set; }
        public long? IdChucdanh { get; set; }
        public long? Chucvu { get; set; }
        public long? Tinhtranghn { get; set; }
        public string Ngayvaodoan { get; set; }
        public string Ngayvaodang { get; set; }
        public string Quanhegiadinh { get; set; }
        public string Quatrinhhoctap { get; set; }
        public string Kynangngonngu { get; set; }
        public string Quatrinhcongtac { get; set; }
        public string Masothue { get; set; }
        public string Mataikhoan { get; set; }
        public string Sotaikhoan { get; set; }
        public long? IdNganhang { get; set; }
        public long? Bangcap { get; set; }
        public string Trinhdo { get; set; }
        public string Chuyenmon { get; set; }
        public string Bangcapkhac { get; set; }
        public short? Dongbhxh { get; set; }
        public string Sosobhxh { get; set; }
        public DateTime? Ngaycapsobhxh { get; set; }
        public short? Dongbhyt { get; set; }
        public string Sothebhyt { get; set; }
        public DateTime? Ngaycapthebhyt { get; set; }
        public DateTime? Ngayhethanbhxh { get; set; }
        public DateTime? Ngayhethanbhyt { get; set; }
        public int? Thangthamgiabh { get; set; }
        public int? Namthamgiabh { get; set; }
        public long? Noidangkykcb { get; set; }
        public string Filecv { get; set; }
        public short? Disable { get; set; }
        public DateTime? Ngayvaocty { get; set; }
        public DateTime? Ngayvaobienche { get; set; }
        public long? Loainhanvien { get; set; }
        public double? Sogiolamviec { get; set; }
        public short? Thoiviec { get; set; }
        public string Soqdthoiviec { get; set; }
        public int? Loaithoiviec { get; set; }
        public DateTime? Ngaythoiviec { get; set; }
        public DateTime? Ngaykythoiviec { get; set; }
        public string Nguoikythoiviec { get; set; }
        public int? Hinhthucthoiviec { get; set; }
        public string Lydothoiviec { get; set; }
        public string Trocapthoiviec { get; set; }
        public string Boithuongthoiviec { get; set; }
        public short? Trathe { get; set; }
        public DateTime? Ngaytrathe { get; set; }
        public short? Tamnghi { get; set; }
        public string Luongcb { get; set; }
        public string Luongkd { get; set; }
        public long? IdTo { get; set; }
        public long? IdBp { get; set; }
        public long? IdDv { get; set; }
        public string IdCa { get; set; }
        public int? Songayphep { get; set; }
        public long? IdQuanly { get; set; }
        public long? IdCvquanly { get; set; }
        public string Code { get; set; }
        public string ExtraId { get; set; }
        public string Sosolaodong { get; set; }
        public string Ngaycapsolaodong { get; set; }
        public short? Thanhtoanquanh { get; set; }
        public string Ghichu { get; set; }
        public string Hocham { get; set; }
        public string Quoctich { get; set; }
        public int? Loaihopdong { get; set; }
        public int? Chucdanh { get; set; }
        public short? Bhtn { get; set; }
        public short? Cd { get; set; }
        public string Tenchucvu { get; set; }
        public string Tenchucdanh { get; set; }
        public string Namsinh { get; set; }
        public DateTime? Datecreated { get; set; }
        public DateTime? Lastmodified { get; set; }
        public long? Createduser { get; set; }
        public long? Lastmodifieduser { get; set; }
        public long? Kiemnhiem { get; set; }
        public DateTime? Bcbhxht { get; set; }
        public double? Kinhnghiemlvnh { get; set; }
        public int? Songuoiphuthuoc { get; set; }
        public short? Alloweditchucdanh { get; set; }
        public DateTime? Lastupdate { get; set; }
        public int? Lanbaotangbhxh { get; set; }
        public int? Lanbaogiambhxh { get; set; }
        public long? IdHs { get; set; }
        public string Ngaythamgiabhxh { get; set; }
        public long? IdCvtd { get; set; }
        public string Macd { get; set; }
        public long? IdChucdanhluanchuyen { get; set; }
        public long? IdHd { get; set; }
        public string Sothe { get; set; }
        public long? IdChedonghi { get; set; }
        public string Luongvtcv { get; set; }
        public short? Alloweditsalary { get; set; }
        public DateTime? Ngayhethanthuviec { get; set; }
        public string Sotaikhoan1 { get; set; }
        public short? Tinhluongrieng { get; set; }
        public int? Cachtinhthuetncn { get; set; }
        public long? Trinhdovitinh { get; set; }
        public long? Trinhdoquanlynhanuoc { get; set; }
        public long? Trinhdochinhtri { get; set; }
        public DateTime? Ngayvaodangchinthuc { get; set; }
        public string Tinhtrangsuckhoe { get; set; }
        public int? Chieucao { get; set; }
        public double? Cannang { get; set; }
        public DateTime? Ngaynhapngu { get; set; }
        public DateTime? Ngayxuatngu { get; set; }
        public long? Quanham { get; set; }
        public int? Nhommau { get; set; }
        public long? Giadinhchinhsach { get; set; }
        public string Ghichuquansu { get; set; }
        public int? Hangthuongbinh { get; set; }
        public string Luongthuviec { get; set; }
        public string Sogplx { get; set; }
        public DateTime? Ngaycapgplx { get; set; }
        public long? Noicapgplx { get; set; }
        public DateTime? Ngayhethangplx { get; set; }
        public long? Diadiemlamviec { get; set; }
        public string Nickname { get; set; }
        public string Chucvutrongdoan { get; set; }
        public string Noivaodang { get; set; }
        public string Nguoigioithieu1 { get; set; }
        public string Congviecnoio1 { get; set; }
        public string Nguoigioithieu2 { get; set; }
        public string Congviecnoio2 { get; set; }
        public string Noivaodangchinhthuc { get; set; }
        public string Sothedang { get; set; }
        public DateTime? Ngaycapthedang { get; set; }
        public string Noicapthedang { get; set; }
        public string Chucvutrongdang { get; set; }
        public int? Hangbenhbinh { get; set; }
        public string Hoancanhnhao { get; set; }
        public DateTime? Ngaythamgiacongdoan { get; set; }
        public string Chucvucongdoan { get; set; }
        public string Tennguyenquan { get; set; }
        public DateTime? Ngaybatdaudongbhxh { get; set; }
        public DateTime? Ngaybatdaudongbhtn { get; set; }
        public DateTime? Ngaytrasobhxh { get; set; }
        public short? Datrasobhxh { get; set; }
        public string Diemmanh { get; set; }
        public string Diemyeu { get; set; }
        public string Ghichuthoiviec { get; set; }
        public int? Status { get; set; }
        public string Toadodiachitamtru { get; set; }
        public string Toadodiachithuongtru { get; set; }
        public string Filethoiviec { get; set; }
        public string Tentruongtotnghiep { get; set; }
        public long? Loaigiangvien { get; set; }
        public long? IdKhoa { get; set; }
        public string Mongiangday { get; set; }
        public string Chuyennganh { get; set; }
        public long? Tinhtrang { get; set; }
        public string Totnghiepnganh { get; set; }
        public string Noinamtotnghiep { get; set; }
        public double? Hesogv { get; set; }
        public long? IdChucdanhGv { get; set; }
        public int? Cachtinhluong { get; set; }
        public string Noisinh { get; set; }
        public long? Calamviec { get; set; }
        public string Tinhtranghonnhan { get; set; }
        public int? Batdautungay { get; set; }
        public DateTime? Ngayvaongachvienchuc { get; set; }
        public long? Hangchucdanh { get; set; }
        public int? Cachchamcong { get; set; }
        public long? IdChedolamviec { get; set; }
        public long? Truongtotnghiep { get; set; }
        public string Luongchenhlech { get; set; }
        public short? IsdongpcdDn { get; set; }
        public string Emailcanhan { get; set; }
        public DateTime? Ngayketthucdaotao { get; set; }
        public DateTime? Ngaybatdauthuviec { get; set; }
        public string Chutaikhoan { get; set; }
        public long? IdNganhhoc { get; set; }
        public int? Namtotnghiep { get; set; }
        public long? IdBangtotnghiep { get; set; }
        public DateTime? Ngayhethanpassport { get; set; }
        public long? Projectid { get; set; }
        public string Sosobhyt { get; set; }
        public string Ghichubhxh { get; set; }
        public long? IdNvcu { get; set; }
        public string Nguoilienhe { get; set; }
        public string QuanheNguoilienhe { get; set; }
        public string SodienthoaiNguoilienhe { get; set; }
        public string Chinhanhnganhang { get; set; }
        public int? Hinhthucluong { get; set; }
        public string DiachiNguoilienhe { get; set; }
        public short? Isforeigner { get; set; }
        public short? Iskycamketthue { get; set; }
        public short? Languoikhuyettat { get; set; }
        public string Noidungcancu { get; set; }
        public string Noidungnoinhan { get; set; }
        public decimal? Songayphepconlai { get; set; }
        public string Truvaoluongthang { get; set; }
        public string Ghichutrudongphuc { get; set; }
        public short? Iscutrutren180ngay { get; set; }
        public int? Enrollnumber { get; set; }
        public int? Staffgroupid { get; set; }
        public string Luongcoban { get; set; }
        public string Trocapkhac { get; set; }
        public string Tongthunhap { get; set; }
        public short? Danhanviec { get; set; }
        public DateTime? Ngaynhanviecdukien { get; set; }
        public int? Dathongbao { get; set; }
        public DateTime? Ngaybatdautinhthamnien { get; set; }
        public short? Iskhongkhautruttncn { get; set; }
        public string Tenbv { get; set; }
        public DateTime? Ngaycapbhyt { get; set; }
        public string Mabenhvien { get; set; }
        public int? Isluonggross { get; set; }
        public short? NanocoIsphobiennoiquy { get; set; }
        public long? Nguontuyendungid { get; set; }
        public string Congtrocapvaoluongthang { get; set; }
        public string NanocoCackhoanbosungkhac { get; set; }
        public long? ThuongtruXa { get; set; }
        public string Sosohokhau { get; set; }
        public string Tenchuho { get; set; }
        public string Quanhevoichuho { get; set; }
        public long? TamtruXa { get; set; }
        public int? Mauinid { get; set; }
        public DateTime? Ngaybatdaudaotao { get; set; }
        public short? Isprint { get; set; }
        public DateTime? ThoiviecNgayvietdon { get; set; }
        public DateTime? Ngaysinhchuho { get; set; }
        public DateTime? NgaythamgiaOt { get; set; }
        public short? Ischeck { get; set; }
        public DateTime? ReNgaythamgiaOt { get; set; }
        public string ThoiviecLydoEn { get; set; }
        public string Namsinhchuho { get; set; }
        public DateTime? ThoiviecNgaythoiviectheodon { get; set; }
        public DateTime? Ngaybaogiambhxh { get; set; }
        public DateTime? Ngaycapmst { get; set; }
        public string Cancuthoiviec { get; set; }
        public string Defaultmoduleid { get; set; }
        public long? Cocauid { get; set; }
    }
}
