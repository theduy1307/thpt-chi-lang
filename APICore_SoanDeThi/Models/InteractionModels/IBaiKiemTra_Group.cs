using APICore_SoanDeThi.Models.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiKiemTra_Group : BaiKiemTra_Group
    {
        public string TenNguoiTao { get; set; }
        public List<IBaiHoc> DanhSachBaiHoc { get; set; } = new List<IBaiHoc>();
    }
}
