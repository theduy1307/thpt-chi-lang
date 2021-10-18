using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    [Table("PQ_Group_Permit")]
    public class PqGroupPermit
    {
        [Key, Column(Order = 0)]
        public long IdGroup { get; set; }

        [Key, Column(Order = 1), StringLength(20)]
        public string Code { get; set; }
    }
}
