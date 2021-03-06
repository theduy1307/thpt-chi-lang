using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class ChuongMonHoc
    {
        [Key]
        [Required]
        public long Id { get; set; }
        public long IdMonHoc { get; set; }
        public int SoThuTu { get; set; }
        public string MaChuong { get; set; }
        public string TenChuong { get; set; }
        public byte Lop  { get; set; }
        public long NguoiTao { get; set; }
        public DateTime NgayTao { get; set; }
        public long NguoiSua { get; set; }
        public DateTime NgaySua { get; set; }
        public bool IsDisabled { get; set; }
    }
}
