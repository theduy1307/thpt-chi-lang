using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra_Print
    {
        public long Id { get; set; }
        public string TenBaiKiemTra { get; set; }
        public int ThoiGianLamBai { get; set; }
        public string NamHoc { get; set; }
        public string MonHoc { get; set; }
        public int HocKy { get; set; }
        public byte Lop { get; set; }
        public List<IBaiKiemTra> DanhSachBaiKiemTra { get; set; } = new List<IBaiKiemTra>();
    }
}
