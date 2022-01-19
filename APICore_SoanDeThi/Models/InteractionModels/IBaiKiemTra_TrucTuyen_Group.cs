using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra_TrucTuyen_Group
    {
        public long Id { get; set; }
        public long Id_BaiKiemTra_Offline { get; set; }
        public string TenBaiKiemTra { get; set; }
        public int SoLuongDe { get; set; }
        public int CauBiet { get; set; }
        public int CauHieu { get; set; }
        public int CauVanDungThap { get; set; }
        public int CauVanDungCao { get; set; }
        public int ThoiGianLamBai { get; set; }
        public string NamHoc { get; set; }
        public long IdMonHoc { get; set; }
        public int HocKy { get; set; }
        public byte Lop { get; set; }
        public long NguoiTao { get; set; }
        public string TenNguoiTao { get; set; }
        public DateTime NgayTao { get; set; }
        public long? NguoiSua { get; set; }
        public DateTime? NgaySua { get; set; }
        public short TrangThai { get; set; }
        public bool IsDisabled { get; set; }
        public bool IsCustom { get; set; }
        public DateTime NgayThi { get; set; }
        public string GioThi { get; set; }
        public string Password { get; set; }
        public bool isExam { get; set; }
        public int TrangThai_BaiKiemTraOnline { get; set; }
    }
}
