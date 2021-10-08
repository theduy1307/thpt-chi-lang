using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.Common
{
    public class PageModel
    {
        public int Page { get; set; } = 1;
        public int AllPage { get; set; } = 0;
        public int Size { get; set; } = 10;
        public int TotalCount { get; set; } = 0;
    }
}
