using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public partial class ViewAccount
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public long? IdNv { get; set; }
        public string Password { get; set; }
        public short? Lock { get; set; }
        public short? Disable { get; set; }
        public DateTime Lastlogin { get; set; }
        public string DPassword { get; set; }
        public DateTime Createddate { get; set; }
        public DateTime Lastpasschg { get; set; }
        public string Email { get; set; }
        public DateTime? Lastsend { get; set; }
        public string Token { get; set; }
        public int? Faillogin { get; set; }
        public int? Solop { get; set; }
        public string Validatecode { get; set; }
        public DateTime? Expirevalidate { get; set; }
        public short? Loaitaikhoan { get; set; }
        public DateTime? Exppassword { get; set; }
        public int? Authentype { get; set; }
        public short? Iscreateldapaccount { get; set; }
        public short? Isadmin { get; set; }
        public int? Defaultmodule { get; set; }
    }
}
