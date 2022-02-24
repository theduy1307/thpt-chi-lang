using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IDanhSachHocSinh
    {
        public long IdNv { get; set; }
        public string Manv { get; set; }
        public string Holot { get; set; }
        public string Ten { get; set; }
        public string HoTen { get; set; }
        public string Phai { get; set; }
        public DateTime NgaySinh { get; set; }
        public string SdtNguoiLienHe { get; set; }
        public string TenLop { get; set; }
        public long IdNienKhoa { get; set; }
        public string TenNienKhoa { get; set; }
        public string TenDangNhap { get; set; }

    }
}
