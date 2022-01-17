using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class BaiKiemTra_TrucTuyen_HocSinh_ChiTiet
    {
        public long Id { get; set; }
        public long IdBaiKiemTraHocSinh { get; set; }
        public long IdQueston { get; set; }
        public long? choosen { get; set; }
    }
}
