using APICore_SoanDeThi.Models.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra : BaiKiemTra
    {
        public List<IBaiKiemTra_ChiTiet> DanhSachCauHoi { get; set; } = new List<IBaiKiemTra_ChiTiet>();
    }
}
