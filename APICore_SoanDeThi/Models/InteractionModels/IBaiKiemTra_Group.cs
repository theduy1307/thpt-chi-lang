using APICore_SoanDeThi.Models.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra_Group
    {
        public long Id { get; set; }
        public string TenBaiKiemTra { get; set; }
        public int SoLuongDe { get; set; }
        public int CauDe { get; set; }
        public int CauTrungBinh { get; set; }
        public int CauKho { get; set; }
        public int ThoiGianLamBai { get; set; }
        public int HocKy { get; set; }
        public byte Lop { get; set; }
        public string NamHoc { get; set; }
        public long IdMonHoc { get; set; }
        public long NguoiTao { get; set; }
        public string TenNguoiTao { get; set; }
        public DateTime NgayTao { get; set; }
        public long? NguoiSua { get; set; }
        public DateTime? NgaySua { get; set; }
        public short TrangThai { get; set; }
        public bool IsDisabled { get; set; }
        public List<IBaiHoc> DanhSachBaiHoc { get; set; } = new List<IBaiHoc>();
    }
}
