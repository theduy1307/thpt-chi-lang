using APICore_SoanDeThi.Assets;
using APICore_SoanDeThi.Controllers.Users;
using APICore_SoanDeThi.Models;
using APICore_SoanDeThi.Models.Common;
using APICore_SoanDeThi.Models.InteractionModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APICore_SoanDeThi.Models.DatabaseContext;
using Wkhtmltopdf.NetCore;
using Mammoth;
using System.Text.RegularExpressions;

namespace APICore_SoanDeThi.Controllers.CaNhan
{
    [Route("api/AccountInformation")]
    [EnableCors("ExamPolicy")]
    public class ThongTinCaNhanController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;
        readonly IGeneratePdf _generatePdf;

        public ThongTinCaNhanController(IHostingEnvironment hostingEnvironment, IGeneratePdf generatePdf)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
            _generatePdf = generatePdf;
        }

        #region LẤY CHI TIẾT THÔNG TIN CÁ NHÂN
        [Route("AccountInformation_Detail")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> AccountInformation_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {

                _context.Database.BeginTransaction();
                var _item = _context.ViewNhanVien.Where(x => x.IdNv == id && x.Disable == 0).Join(_context.ViewAccount, emp => emp.IdNv, acc => acc.IdNv, (emp, acc) => new { emp, acc })
                                                                                      .Select(x => new IAccountInformation
                                                                                      {
                                                                                          Id = x.emp.IdNv,
                                                                                          HoLot = x.emp.Holot,
                                                                                          Ten = x.emp.Ten,
                                                                                          Username = x.acc.Username,
                                                                                          Birthday = x.emp.Ngaysinh,
                                                                                          SoDienThoai = x.emp.SodienthoaiNguoilienhe,
                                                                                          Email = x.emp.Email,
                                                                                          ClassName = x.emp.IdLop != null ? _context.Lop.Where(lop => lop.Id == x.emp.IdLop).OrderByDescending(lop => lop.Id).Select(x => x.TenLop).FirstOrDefault():"",
                                                                                          ManageClass = x.emp.isStudent != true && x.emp.AllowCode.ToString().Contains("3") ? _context.Lop.Where(lop => lop.IdChuNhiem == x.emp.IdNv).OrderByDescending(lop=>lop.Id).Select(x => x.TenLop).FirstOrDefault() : "",
                                                                                          Department = x.emp.isStudent != true && x.emp.IdMonHoc != null ? _context.MonHoc.Where(monHoc => monHoc.Id == x.emp.IdMonHoc).OrderByDescending(monHoc => monHoc.Id).Select(x => x.TenMonHoc).FirstOrDefault():"",
                                                                                          AllowCode = x.emp.AllowCode,
                                                                                          IsStudent = x.emp.isStudent,
                                                                                          Gender = Int32.Parse(x.emp.Phai),
                                                                                          IdLop = x.emp.IdLop
                                                                                      }).FirstOrDefault();
                var GiaoVienChuNhiem = _context.Lop.Where(x => x.Id == _item.IdLop).Select(x => x.IdChuNhiem).FirstOrDefault();
                var TenGiaoVien = _context.ViewNhanVien.Where(x => x.IdNv == GiaoVienChuNhiem).Select(x => x.HoTen).FirstOrDefault();

                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu, vui lòng tải lại!!", null);

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", new {_item, TenGiaoVien });
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region ĐỔI PASSWORD
        [Route("NotificationForStudent_ChangePassword")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> NotificationForStudent_ChangePassword(string oldPassword, string newPassword)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                _context.Database.BeginTransaction();
                var _item = _context.ViewAccount.Where(x => x.Id == loginData.id && x.Disable == 0).FirstOrDefault();

                if (_item == null)
                {
                    _context.Database.RollbackTransaction();
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu, vui lòng tải lại!!", null);

                }

                if (!_item.Password.Equals(EncryptPassword(oldPassword)))
                {
                    _context.Database.RollbackTransaction();
                    return Utilities._responseData(0, "Mật khẩu cũ nhập không chính xác", null);
                }

                _item.Password = EncryptPassword(newPassword);
                _context.SaveChanges();

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Thay đồi mật khẩu thành công", _item);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        private static string EncryptPassword(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }
}
