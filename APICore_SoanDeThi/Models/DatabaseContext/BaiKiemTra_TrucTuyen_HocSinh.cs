using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class BaiKiemTra_TrucTuyen_HocSinh
    {
        public long Id { get; set; }
        public long IdHocSinh { get; set; }
        public long IdBaiKiemTraOnline { get; set; }

    }
}
