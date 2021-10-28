using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace APICore_SoanDeThi.Migrations
{
    public partial class UpdateUserTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alloweditchucdanh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Alloweditsalary",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Bangcap",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Bangcapkhac",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Batdautungay",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Bcbhxht",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Bhtn",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Boithuongthoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Cachchamcong",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Cachtinhluong",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Cachtinhthuetncn",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Calamviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Cancuthoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Cannang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Cd",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chieucao",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chinhanhnganhang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chucdanh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chucvu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chucvucongdoan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chucvutrongdang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chucvutrongdoan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chutaikhoan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chuyenmon",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Chuyennganh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Cmnd",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Congtrocapvaoluongthang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Congviecnoio1",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Congviecnoio2",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Createduser",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Danhanviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Dantoc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Datecreated",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Dathongbao",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Datrasobhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Defaultmoduleid",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "DiachiNguoilienhe",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Diadiemlamviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Diemmanh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Diemyeu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Dongbhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Dongbhyt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Emailcanhan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Enrollnumber",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ExtraId",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Filecv",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Filethoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ghichu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ghichubhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ghichuquansu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ghichuthoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ghichutrudongphuc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Giadinhchinhsach",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hangbenhbinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hangchucdanh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hangthuongbinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hesogv",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hinhthucluong",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hinhthucthoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hoancanhnhao",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Hocham",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdBangtotnghiep",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdBp",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdCa",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdChedolamviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdChedonghi",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdChucdanhGv",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdChucdanhluanchuyen",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdCvquanly",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdCvtd",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdDv",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdHd",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdHs",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdKhoa",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdNganhang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdNganhhoc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdNvcu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdQuanly",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IdTo",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ischeck",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Iscutrutren180ngay",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "IsdongpcdDn",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Isforeigner",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Iskhongkhautruttncn",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Iskycamketthue",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Isluonggross",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Isprint",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Kiemnhiem",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Kinhnghiemlvnh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Kynangngonngu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Lanbaogiambhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Lanbaotangbhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Languoikhuyettat",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Lastmodified",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Lastmodifieduser",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Lastupdate",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Loaigiangvien",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Loaihopdong",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Loainhanvien",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Loaithoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Luongcb",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Luongchenhlech",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Luongcoban",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Luongkd",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Luongthuviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Luongvtcv",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Lydothoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Mabenhvien",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Macd",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Masothue",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Mataikhoan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Mauinid",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Mobile",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Mongiangday",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Namsinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Namsinhchuho",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Namthamgiabh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Namtotnghiep",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "NanocoCackhoanbosungkhac",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "NanocoIsphobiennoiquy",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaybaogiambhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaybatdaudaotao",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaybatdaudongbhtn",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaybatdaudongbhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaybatdauthuviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaybatdautinhthamnien",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycap",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycapbhyt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycapgplx",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycapmst",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycappassport",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycapsobhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycapsolaodong",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycapthebhyt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaycapthedang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayhethanbhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayhethanbhyt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayhethangplx",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayhethanpassport",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayhethanthuviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayketthucdaotao",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaykythoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaynhanviecdukien",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaynhapngu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaysinhchuho",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "NgaythamgiaOt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaythamgiabhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaythamgiacongdoan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaythoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaytrasobhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngaytrathe",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayvaobienche",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayvaocty",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayvaodang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayvaodangchinthuc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayvaodoan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayvaongachvienchuc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Ngayxuatngu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Nguoigioithieu1",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Nguoigioithieu2",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Nguoikythoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Nguoilienhe",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Nguontuyendungid",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Nhommau",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Nickname",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noicap",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noicapgplx",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noicappassport",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noicapthedang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noidangkykcb",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noidungcancu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noidungnoinhan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noinamtotnghiep",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noisinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noivaodang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Noivaodangchinhthuc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Passport",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Projectid",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Quanham",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "QuanheNguoilienhe",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Quanhegiadinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Quanhevoichuho",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Quatrinhcongtac",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Quatrinhhoctap",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Quoctich",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ReNgaythamgiaOt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sogiolamviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sogplx",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Songayphep",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Songayphepconlai",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Songuoiphuthuoc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Soqdthoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sosobhxh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sosobhyt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sosohokhau",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sosolaodong",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sotaikhoan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sotaikhoan1",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sothe",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sothebhyt",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Sothedang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Staffgroupid",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tamnghi",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "TamtruDiachi",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "TamtruHuyen",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "TamtruPhone",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "TamtruTinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "TamtruXa",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tenbv",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tenchucdanh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tenchucvu",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tenchuho",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tennguyenquan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tentruongtotnghiep",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Thangthamgiabh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Thanhtoanquanh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Thoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThoiviecLydoEn",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThoiviecNgaythoiviectheodon",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThoiviecNgayvietdon",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThuongtruDiachi",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThuongtruHuyen",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThuongtruPhone",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThuongtruTinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "ThuongtruXa",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tinhluongrieng",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tinhtrang",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tinhtranghn",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tinhtranghonnhan",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tinhtrangsuckhoe",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Toadodiachitamtru",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Toadodiachithuongtru",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tongiao",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Tongthunhap",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Totnghiepnganh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Trathe",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Trinhdo",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Trinhdochinhtri",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Trinhdoquanlynhanuoc",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Trinhdovitinh",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Trocapkhac",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Trocapthoiviec",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Truongtotnghiep",
                table: "ViewNhanVien");

            migrationBuilder.DropColumn(
                name: "Truvaoluongthang",
                table: "ViewNhanVien");

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "ViewAccount",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "ViewAccount");

            migrationBuilder.AddColumn<short>(
                name: "Alloweditchucdanh",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Alloweditsalary",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Bangcap",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Bangcapkhac",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Batdautungay",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Bcbhxht",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Bhtn",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Boithuongthoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cachchamcong",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cachtinhluong",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cachtinhthuetncn",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Calamviec",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cancuthoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Cannang",
                table: "ViewNhanVien",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Cd",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Chieucao",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chinhanhnganhang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Chucdanh",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Chucvu",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chucvucongdoan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chucvutrongdang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chucvutrongdoan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chutaikhoan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chuyenmon",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chuyennganh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cmnd",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Congtrocapvaoluongthang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Congviecnoio1",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Congviecnoio2",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Createduser",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Danhanviec",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Dantoc",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Datecreated",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Dathongbao",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Datrasobhxh",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Defaultmoduleid",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiachiNguoilienhe",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Diadiemlamviec",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Diemmanh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Diemyeu",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Dongbhxh",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Dongbhyt",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Emailcanhan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Enrollnumber",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtraId",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Filecv",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Filethoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ghichu",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ghichubhxh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ghichuquansu",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ghichuthoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ghichutrudongphuc",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Giadinhchinhsach",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Hangbenhbinh",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Hangchucdanh",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Hangthuongbinh",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Hesogv",
                table: "ViewNhanVien",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Hinhthucluong",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Hinhthucthoiviec",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hoancanhnhao",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hocham",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdBangtotnghiep",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdBp",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdCa",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdChedolamviec",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdChedonghi",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdChucdanhGv",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdChucdanhluanchuyen",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdCvquanly",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdCvtd",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdDv",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdHd",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdHs",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdKhoa",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdNganhang",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdNganhhoc",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdNvcu",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdQuanly",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "IdTo",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Ischeck",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Iscutrutren180ngay",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "IsdongpcdDn",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Isforeigner",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Iskhongkhautruttncn",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Iskycamketthue",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Isluonggross",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Isprint",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Kiemnhiem",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Kinhnghiemlvnh",
                table: "ViewNhanVien",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Kynangngonngu",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Lanbaogiambhxh",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Lanbaotangbhxh",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Languoikhuyettat",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Lastmodified",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Lastmodifieduser",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Lastupdate",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Loaigiangvien",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Loaihopdong",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Loainhanvien",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Loaithoiviec",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Luongcb",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Luongchenhlech",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Luongcoban",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Luongkd",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Luongthuviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Luongvtcv",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Lydothoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mabenhvien",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Macd",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Masothue",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mataikhoan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Mauinid",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mobile",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Mongiangday",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Namsinh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Namsinhchuho",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Namthamgiabh",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Namtotnghiep",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NanocoCackhoanbosungkhac",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "NanocoIsphobiennoiquy",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaybaogiambhxh",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaybatdaudaotao",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaybatdaudongbhtn",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaybatdaudongbhxh",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaybatdauthuviec",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaybatdautinhthamnien",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycap",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycapbhyt",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycapgplx",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycapmst",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycappassport",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycapsobhxh",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ngaycapsolaodong",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycapthebhyt",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaycapthedang",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayhethanbhxh",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayhethanbhyt",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayhethangplx",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayhethanpassport",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayhethanthuviec",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayketthucdaotao",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaykythoiviec",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaynhanviecdukien",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaynhapngu",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaysinhchuho",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgaythamgiaOt",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ngaythamgiabhxh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaythamgiacongdoan",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaythoiviec",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaytrasobhxh",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngaytrathe",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayvaobienche",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayvaocty",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ngayvaodang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayvaodangchinthuc",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ngayvaodoan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayvaongachvienchuc",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Ngayxuatngu",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nguoigioithieu1",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nguoigioithieu2",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nguoikythoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nguoilienhe",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Nguontuyendungid",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Nhommau",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nickname",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noicap",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Noicapgplx",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noicappassport",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noicapthedang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Noidangkykcb",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noidungcancu",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noidungnoinhan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noinamtotnghiep",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noisinh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noivaodang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Noivaodangchinhthuc",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Passport",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Projectid",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Quanham",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuanheNguoilienhe",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Quanhegiadinh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Quanhevoichuho",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Quatrinhcongtac",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Quatrinhhoctap",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Quoctich",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReNgaythamgiaOt",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Sogiolamviec",
                table: "ViewNhanVien",
                type: "double precision",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sogplx",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Songayphep",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Songayphepconlai",
                table: "ViewNhanVien",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Songuoiphuthuoc",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Soqdthoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sosobhxh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sosobhyt",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sosohokhau",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sosolaodong",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sotaikhoan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sotaikhoan1",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sothe",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sothebhyt",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sothedang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Staffgroupid",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Tamnghi",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TamtruDiachi",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TamtruHuyen",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TamtruPhone",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TamtruTinh",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TamtruXa",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tenbv",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tenchucdanh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tenchucvu",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tenchuho",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tennguyenquan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tentruongtotnghiep",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Thangthamgiabh",
                table: "ViewNhanVien",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Thanhtoanquanh",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Thoiviec",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThoiviecLydoEn",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ThoiviecNgaythoiviectheodon",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ThoiviecNgayvietdon",
                table: "ViewNhanVien",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThuongtruDiachi",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ThuongtruHuyen",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThuongtruPhone",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ThuongtruTinh",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ThuongtruXa",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Tinh",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Tinhluongrieng",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Tinhtrang",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Tinhtranghn",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tinhtranghonnhan",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tinhtrangsuckhoe",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Toadodiachitamtru",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Toadodiachithuongtru",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Tongiao",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tongthunhap",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Totnghiepnganh",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Trathe",
                table: "ViewNhanVien",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Trinhdo",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Trinhdochinhtri",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Trinhdoquanlynhanuoc",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Trinhdovitinh",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Trocapkhac",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Trocapthoiviec",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Truongtotnghiep",
                table: "ViewNhanVien",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Truvaoluongthang",
                table: "ViewNhanVien",
                type: "text",
                nullable: true);
        }
    }
}
