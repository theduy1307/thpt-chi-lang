using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public class SysAttachmentDetail
    {
        [Key]
        public long Id { get; set; }
        public long AttachmentId { get; set; }
        public string TenFile { get; set; }
        public string LoaiFile { get; set; }
        public string Type { get; set; }
        public long NguoiTao { get; set; }
        public DateTime NgayTao { get; set; }
        public long? NguoiSua { get; set; }
        public DateTime? NgaySua { get; set; }
        public bool IsDisable { get; set; }
        public string TenFileGoc { get; set; }
        public string GhiChu { get; set; }
    }
}
