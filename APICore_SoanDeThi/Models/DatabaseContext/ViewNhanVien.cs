using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public partial class ViewNhanVien
    {
        [Key]
        public long IdNv { get; set; }
        public string Manv { get; set; }
        public string Holot { get; set; }
        public string Ten { get; set; }
        public string HoTen
        {
            get
            {
                return Holot + " " + Ten;
            }
        }
        public string Phai { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string Email { get; set; }
        public long? IdChucdanh { get; set; }
        public short? Disable { get; set; }
        public string SodienthoaiNguoilienhe { get; set; }
        public long? Cocauid { get; set; }
        public long? IdMonHoc { get; set; }
        public long? IdLop { get; set; }
        public bool? isStudent { get; set; }
        public int AllowCode { get; set; }

    }
}
