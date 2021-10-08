using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class BaiKiemTra_Group
    {
        [Key]
        [Required]
        [Column(Order = 0)]
        public long Id { get; set; }

        [Column(Order = 1)]
        public string TenBaiKiemTra { get; set; }

        [Column(Order = 2)]
        public int SoLuongDe { get; set; }
        [Column(Order = 3)]
        public int CauBiet { get; set; }
        [Column(Order = 4)]
        public int CauHieu { get; set; }
        [Column(Order = 5)]
        public int CauVanDungThap { get; set; }
        [Column(Order = 6)]
        public int CauVanDungCao { get; set; }
        [Column(Order = 7)]
        public int ThoiGianLamBai { get; set; }
        [Column(Order = 8)]
        public string NamHoc { get; set; }
        [Column(Order = 9)]
        public long IdMonHoc { get; set; }
        [Column(Order = 10)]
        public int HocKy { get; set; }
        [Column(Order = 11)]
        public byte Lop { get; set; }
        [Column(Order = 12)]
        public long NguoiTao { get; set; }
        [Column(Order = 13)]
        public DateTime NgayTao { get; set; }
        [Column(Order = 14)]
        public long? NguoiSua { get; set; }
        [Column(Order = 15)]
        public DateTime? NgaySua { get; set; }
        [Column(Order = 16)]
        public short TrangThai { get; set; }
        [Column(Order = 17)]
        public bool IsDisabled { get; set; }
        [Column(Order = 18)]
        public bool IsCustom { get; set; }
    }
}
