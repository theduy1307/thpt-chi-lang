using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IViewNhanVien
    {
        public decimal Id_NV { get; set; }
        public string MaNV { get; set; }
        public string TenNV { get; set; }
        public string Username { get; set; }
        public long? pbId { get; set; }
        public string pbName { get; set; }
    }
}
