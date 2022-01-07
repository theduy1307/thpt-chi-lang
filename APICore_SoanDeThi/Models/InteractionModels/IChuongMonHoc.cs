using APICore_SoanDeThi.Models.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IChuongMonHoc : ChuongMonHoc
    {
        public List<IBaiHoc> DanhSachBaiHoc { get; set; } = new List<IBaiHoc>();
    }
}
