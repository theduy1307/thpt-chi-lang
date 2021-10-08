using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra_ChiTiet
    {
        public long Id { get; set; }
        public long IdBaiKiemTra { get; set; }
        public long IdCauHoi { get; set; }
        public string TieuDe { get; set; }
        public string CauA { get; set; }
        public string CauB { get; set; }
        public string CauC { get; set; }
        public string CauD { get; set; }
        public byte CauDung { get; set; }

    }
}
