using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class SysRequestLogin
    {
        public long Id { get; set; }
        public string MaDinhDanh { get; set; }
        public string ThongTinThietBi { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgayXacNhan { get; set; }
        public long? NguoiXacNhan { get; set; }
        public string GhiChu { get; set; }
        public short? TinhTrang { get; set; }
    }
}
