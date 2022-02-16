using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.DatabaseContext
{
    public class SysNotifyDetail
    {
        public long Id { get; set; }
        public long IdMaster { get; set; }
        public long IdHocSinh { get; set; }
        public bool IsRead { get; set; } = false;
    }
}
