using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IQuestion : Question
    {
        public long IdChuong { get; set; }
        public string TenChuong { get; set; }
        public short Class { get; set; }
        public string TenNguoiTao { get; set; }
        public string TenBaiHoc { get; set; }
    }
}
