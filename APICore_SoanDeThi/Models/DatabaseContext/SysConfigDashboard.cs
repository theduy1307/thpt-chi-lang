using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class SysConfigDashboard
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Component { get; set; }
        public string RouterLink { get; set; }
        public string Code { get; set; }
        public bool Default { get; set; }
    }
}
