using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class BaiKiemTra
    {
        [Key]
        [Required]
        public long Id { get; set; }
        public long IdGroup { get; set; }
        public string MaDe { get; set; }

    }
}
