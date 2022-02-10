using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.InteractionModels
{
    public class IAccountInformation
    {
        public long Id { get; set; }
        public string HoLot { get; set; }
        public string Ten { get; set; }
        public int Gender { get; set; }
        public string Username { get; set; }
        public DateTime? Birthday { get; set; }
        public string Email { get; set; }
        public string SoDienThoai { get; set; }
        public string? ClassName { get; set; }
        public string ManageClass { get; set; }
        public string? Department { get; set; }
        public int AllowCode { get; set; }
        public bool? IsStudent { get; set; }
    }
}
