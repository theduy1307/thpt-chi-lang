using APICore_SoanDeThi.Models.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra_TrucTuyen_HocSinh_ChiTiet : BaiKiemTra_TrucTuyen_HocSinh_ChiTiet
    {
        public string TieuDe { get; set; }
        public string CauA { get; set; }
        public string CauB { get; set; }
        public string CauC { get; set; }
        public string CauD { get; set; }
    }
}
