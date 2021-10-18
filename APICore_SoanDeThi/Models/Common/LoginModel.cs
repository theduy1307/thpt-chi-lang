using APICore_SoanDeThi.Models.DatabaseContext;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.Common
{
    public class LoginModel : BaseModel<LoginData>
    {
    }
    public class LoginData
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        /// <summary>
        /// Trạng thái (0 là khoá, 1 là kích hoạt)
        /// </summary>
        public int Status { get; set; } = 0;
        /// <summary>
        /// Mảng quyền của người dùng
        /// </summary>
        public List<string> Rules { get; set; }
        /// <summary>
        /// ID khách hàng dps (id nhóm đa người dùng)
        /// </summary>
        public long IDKHDPS { get; set; }
        /// <summary>
        /// Loại người dùng (-1: admin dps; 0: user gốc; 1: user thường)
        /// </summary>
        public int UserType { get; set; } = 0;
        public string FullName { get { return FirstName + " " + LastName; } }
        public string Token { get; set; }
        public string TokenFlow { get; set; }
        public string SecurityStamp { get; set; } = "dps";
        public long? Cocauid { get; set; }
        public long? IdChucdanh { get; set; }
        public string TenChucDanh { get; set; }
        public string Manv { get; set; }
        public List<SysConfigDashboard> dashboardWidgets { get; set; }
        public string isMessageError { get; set; } = "";
        public bool? isEnableError { get; set; } = false;
        public string Email { get; set; }
        public DateTime? TimeServe { get; set; } = DateTime.Now;
    }
    public class LoginViewModel
    {
        public LoginViewModel() { }
        [Required(ErrorMessage = "Vui nhập tên đăng nhập.")]
        [MaxLength(99, ErrorMessage = "Tài khoản tối đa 99 ký tự.")]
        [DisplayName("Tài khoản")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Mật khẩu không được để trống.")]
        [DisplayName("Mật khẩu")]
        public string Password { get; set; }
        [DisplayName("Ghi nhớ")]
        public bool isPersistent { get; set; }
        public string ReturnUrl { get; set; }
    }
    public class LoginAPIModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }

    public class DataTokenModel
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
    }
}
