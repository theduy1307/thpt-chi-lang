using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IBaiHoc
    {
        public long Id { get; set; }
        public long IdChuong { get; set; }
        public int SoThuTu { get; set; }
        public string MaBaiHoc { get; set; }
        public string TenBaiHoc { get; set; }
    }
}
