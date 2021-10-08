using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public partial class ViewCoCauToChuc
    {
        [Key]
        public long Rowid { get; set; }
        public int? Capcocau { get; set; }
        public string Title { get; set; }
        public long? Parentid { get; set; }
        public DateTime? Createddate { get; set; }
        public long? Createdby { get; set; }
        public DateTime? Lastmodified { get; set; }
        public long? Modifiedby { get; set; }
        public DateTime? Deleteddate { get; set; }
        public long? Deletedby { get; set; }
        public long? Custemerid { get; set; }
        public int? Vitri { get; set; }
        public string Code { get; set; }
        public int? Loaidonvi { get; set; }
        public int? Chedolamviec { get; set; }
        public short? Disable { get; set; }
    }
}
