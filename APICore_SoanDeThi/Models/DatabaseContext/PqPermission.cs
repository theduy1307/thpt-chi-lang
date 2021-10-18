using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    [Table("PQ_Permission")]
    public class PqPermission
    {
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        public long? IdGroup { get; set; }
        
        public short? Position { get; set; }

        [Key]
        [StringLength(20)]
        public string Code { get; set; }

        [StringLength(20)]
        public string CodeGroup { get; set; }

        public bool? IsDisable { get; set; }

        //public virtual PqPermissionGroup CodeGroupNavigation { get; set; }
    }
}
