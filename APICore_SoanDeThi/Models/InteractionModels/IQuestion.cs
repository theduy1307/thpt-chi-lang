using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IQuestion
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public byte CorrectOption { get; set; }
        public long IdBaiHoc { get; set; }
        public string TenBaiHoc { get; set; }
        public long IdChuong { get; set; }
        public string TenChuong { get; set; }
        public short Class { get; set; }
        public byte Level { get; set; }
        public string TenNguoiTao { get; set; }
        public DateTime CreateDate { get; set; }
        public long CreateBy { get; set; }
        public DateTime? ModifyDate { get; set; }
        public long? ModifyBy { get; set; }
        public bool IsDisabled { get; set; }
    }
}
