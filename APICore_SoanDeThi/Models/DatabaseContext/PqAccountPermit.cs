using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    [Table("PQ_Account_Permit")]
    public class PqAccountPermit
    {
        [Key, Column(Order = 0)]
        [StringLength(255)]
        public string UserName { get; set; }

        //public long IdPermit { get; set; }

        [Key, Column(Order = 1)]
        [StringLength(20)]
        public string Code { get; set; }
    }
}
