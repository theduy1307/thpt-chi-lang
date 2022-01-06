using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class Lop
    {
        public long Id { get; set; }
        public string TenLop { get; set; }
        public string Loai { get; set; }
        public long IdNienKhoa { get; set; }
        public long IdChuNhiem { get; set; }
        public long NguoiTao { get; set; }
        public string NgayTao { get; set; }
        public long? NguoiSua { get; set; }
        public string? NgaySua { get; set; }
        public Boolean Disabled { get; set; }
    }
}
