using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra
    {
        public long Id { get; set; }
        public long IdGroup { get; set; }
        public string MaDe { get; set; }
        public List<IBaiKiemTra_ChiTiet> DanhSachCauHoi { get; set; } = new List<IBaiKiemTra_ChiTiet>();
    }
}
