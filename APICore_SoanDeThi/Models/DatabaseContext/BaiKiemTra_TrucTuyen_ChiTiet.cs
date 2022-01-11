using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class BaiKiemTra_TrucTuyen_ChiTiet
    {
        [Key]
        [Required]
        public long Id { get; set; }
        public long IdBaiKiemTra { get; set; }
        public long IdCauHoi { get; set; }
    }
}
