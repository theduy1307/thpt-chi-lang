using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public partial class ViewChucDanh
    {
        [Key]
        public long IdRow { get; set; }
        public string Tenchucdanh { get; set; }
        public long? IdCv { get; set; }
        public long? IdBp { get; set; }
        public long? IdParent { get; set; }
        public int? Vitri { get; set; }
        public int? Sonhanviencan { get; set; }
        public short? Disable { get; set; }
        public string Macd { get; set; }
        public string Yeucaubangcap { get; set; }
        public string Yeucaukynanglamviec { get; set; }
        public string Yeucaukynangkhac { get; set; }
        public string Motacongviec { get; set; }
        public string Ghichu { get; set; }
        public long? Nhom { get; set; }
        public string Tentienganh { get; set; }
        public DateTime? Lastmodified { get; set; }
        public long? Nguoisua { get; set; }
        public short? Isleading { get; set; }
        public short? Isstop { get; set; }
        public short? Visiblecap { get; set; }
        public short? Visiblebophan { get; set; }
        public long? IdCapquanly { get; set; }
        public long? Cocauid { get; set; }
    }
}
