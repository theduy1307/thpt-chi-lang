using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class ILop
    {
        public long Id { get; set; }
        public string TenLop { get; set; }
        public string Loai { get; set; }
        public long IdNienKhoa { get; set; }
        public string TenNienKhoa { get; set; }
        public long IdChuNhiem { get; set; }
        public string TenChuNhiem { get; set; }
        public long NguoiTao { get; set; }
        public string TenNguoiTao { get; set; }
        public string NgayTao { get; set; }
        public long? NguoiSua { get; set; }
        public string? NgaySua { get; set; }
        public Boolean Disabled { get; set; }
    }
}
