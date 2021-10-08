using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    [Table("Question")]
    public class Question
    {
        [Key]
        [Column(Order = 0)]
        public long Id { get; set; }

        [Column(Order = 1)]
        public string Title { get; set; }

        [Column(Order = 2)]
        public string OptionA { get; set; }

        [Column(Order = 3)]
        public string OptionB { get; set; }

        [Column(Order = 4)]
        public string OptionC { get; set; }

        [Column(Order = 5)]
        public string OptionD { get; set; }

        [Column(Order = 6)]
        public byte CorrectOption { get; set; }

        [Column(Order = 7)]
        public long IdBaiHoc { get; set; }

        [Column(Order = 8)]
        public byte Level { get; set; }

        [Column(Order = 9)]
        public DateTime CreateDate { get; set; }

        [Column(Order = 10)]
        public long CreateBy { get; set; }

        [Column(Order = 11)]
        public DateTime? ModifyDate { get; set; }

        [Column(Order = 12)]
        public long? ModifyBy { get; set; }

        [Column(Order = 13)]
        public bool IsDisabled { get; set; }

        [Column(Order = 14)]
        public bool IsCustom { get; set; }
    }
}
