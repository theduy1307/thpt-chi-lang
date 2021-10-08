using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace APICore_SoanDeThi.Models
{
    public partial class PqSubMenu
    {
        [Key]
        public long IdSubMenu { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Link { get; set; }
        public string PageKey { get; set; }
        public string Target { get; set; }
        public short? Position { get; set; }
        public string Icon { get; set; }
        public long? IdMainMenu { get; set; }
        public string GroupName { get; set; }
        public string AllowCode { get; set; }
        public long? AllowPermit { get; set; }
    }
}
