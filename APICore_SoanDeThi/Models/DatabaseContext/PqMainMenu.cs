using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APICore_SoanDeThi.Models
{
    [Table("PQ_MainMenu")]
    public partial class PqMainMenu
    {
        [Key]
        public long IdMain { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public long? IdModule { get; set; }
        public string Link { get; set; }
        public short? Position { get; set; }
        public string Icon { get; set; }
        public string GroupName { get; set; }
        public string Target { get; set; }
        public string AllowCode { get; set; }
        public long? AllowPermit { get; set; }
    }
}
