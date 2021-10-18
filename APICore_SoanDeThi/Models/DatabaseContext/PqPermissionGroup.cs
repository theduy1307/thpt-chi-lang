using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    [Table("PQ_Permission_Group")]
    public class PqPermissionGroup
    {
        //public PqPermissionGroup()
        //{
        //    PqPermission = new HashSet<PqPermission>();
        //}
        [StringLength(100)]
        public string Name { get; set; }

        public short? Position { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        [Key]
        [StringLength(20)]
        public string Code { get; set; }

        [StringLength(20)]
        public string IdParent { get; set; }

        //public virtual ICollection<PqPermission> PqPermission { get; set; }
    }
}
