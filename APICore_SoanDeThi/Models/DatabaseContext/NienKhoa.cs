using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class NienKhoa
    {
        [Key]
        [Required]
        public long Id { get; set; }
        public string TenNienKhoa {get;set;}
        public long NguoiTao {get;set;}
        public string NgayTao { get; set; }
        public long? NguoiSua { get; set; }
        public string? NgaySua { get; set; }
        public Boolean Disabled { get; set; }



    }
}
