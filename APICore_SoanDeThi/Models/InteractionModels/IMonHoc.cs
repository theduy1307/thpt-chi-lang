using APICore_SoanDeThi.Models.DatabaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IMonHoc : MonHoc
    {
        public List<long> QuestionCount { get; set; }
        public List<long> ExamCount { get; set; }
        public List<GiaoVien> DanhSachGiaoVien { get; set; }
    }

    public class GiaoVien
    {
        public long IdNv { get; set; }
        public string MaNv { get; set; }
        public string HoLot { get; set; }
        public string Ten { get; set; }
        public string HoTen
        {
            get
            {
                return HoLot + " " + Ten;
            }
        }
        public string Phai { get; set; }
        public string BoMon { get; set; }

    }
}
