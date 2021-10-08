using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public class SysAttachment
    {
        [Key]
        public long Id { get; set; }
        public long NguoiTao { get; set; }
        public DateTime NgayTao { get; set; }
    }
}
