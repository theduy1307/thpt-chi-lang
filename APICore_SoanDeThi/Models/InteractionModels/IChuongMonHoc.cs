using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IChuongMonHoc
    {
        public long Id { get; set; }
        public long IdMonHoc { get; set; }
        public int SoThuTu { get; set; }
        public string MaChuong { get; set; }
        public string TenChuong { get; set; }
        public byte Lop { get; set; }
    }
}
