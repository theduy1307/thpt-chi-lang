using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IMonHoc
    {
        public long Id { get; set; }
        public string MaMonHoc { get; set; }
        public string TenMonHoc { get; set; }
        public long NguoiTao { get; set; }
        public DateTime NgayTao { get; set; }
        public long NguoiSua { get; set; }
        public DateTime NgaySua { get; set; }
        public bool IsDisabled { get; set; }
    }
}
