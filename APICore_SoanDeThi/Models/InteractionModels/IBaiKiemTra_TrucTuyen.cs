using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra_TrucTuyen
    {
        public long Id { get; set; }
        public long IdGroup { get; set; }
        public string MaDe { get; set; }
        public List<IBaiKiemTra_TrucTuyen_ChiTiet> DanhSachCauHoi { get; set; } = new List<IBaiKiemTra_TrucTuyen_ChiTiet>();
    }
}
