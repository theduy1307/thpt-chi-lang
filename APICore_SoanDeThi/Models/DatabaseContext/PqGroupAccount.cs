using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    [Table("PQ_Group_Account")]
    public class PqGroupAccount
    {
        [Key, Column(Order = 1)]
        public long IdGroup { get; set; }

        [Key, Column(Order = 2), StringLength(255)]
        public string UserName { get; set; }
    }
}
