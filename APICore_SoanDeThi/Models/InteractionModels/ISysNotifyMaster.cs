using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class ISysNotifyMaster
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public long CreateBy { get; set; }
        public int Type { get; set; } //1: Giáo viên bộ môn, 2: Quản trị, 3: Giáo viên CN
        public string NotifyIcon { get; set; }
        public bool Disabled { get; set; } = false;
    }
}
