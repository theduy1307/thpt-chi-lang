using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class INotify
    {
        public long IdDetail { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string CreateByName { get; set; }
        public DateTime CreateDate { get; set; }
        public bool IsRead { get; set; }
    }
}
