using APICore_SoanDeThi.Assets;
using APICore_SoanDeThi.Controllers.Users;
using APICore_SoanDeThi.Models;
using APICore_SoanDeThi.Models.Common;
using APICore_SoanDeThi.Models.DatabaseContext;
using APICore_SoanDeThi.Models.InteractionModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
//dotnet ef dbcontext scaffold "host=42.117.7.112;database=nfc_dbdev;user id=nfcuser1; password=Dps@123456" Npgsql.EntityFrameworkCore.PostgreSQL -o ModelsGen -t dm_nhacungcap -f
namespace APICore_SoanDeThi.Controllers.Common
{
    [Route("api/common")]
    [EnableCors("ExamPolicy")]
    public class CommonController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public CommonController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region DANH SÁCH CHƯƠNG MÔN HỌC
        [Route("GetList_ChuongMonHoc")]
        //[Authorize(Roles = "01011")]
        [HttpGet]
        public BaseModel<object> GetList_ChuongMonHoc()
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            BaseModel<object> _baseModel = new BaseModel<object>();
            PageModel _pageModel = new PageModel();
            ErrorModel _error = new ErrorModel();

            try
            {
                var _data = _context.ChuongMonHoc.Where(x => !x.IsDisabled)
                          .OrderBy(x => x.SoThuTu)
                          .Select(x => new ChuongMonHoc
                          {
                              Id = x.Id,
                              SoThuTu = x.SoThuTu,
                              TenChuong = x.TenChuong,
                              Lop = x.Lop
                          });

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;
                _baseModel.data = _data;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region DANH SÁCH BÀI HỌC
        [Route("GetList_BaiHoc")]
        //[Authorize(Roles = "01011")]
        [HttpGet]
        public BaseModel<object> GetList_BaiHoc()
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            BaseModel<object> _baseModel = new BaseModel<object>();
            PageModel _pageModel = new PageModel();
            ErrorModel _error = new ErrorModel();

            try
            {
                var _data = _context.BaiHoc.Where(x => !x.IsDisabled)
                          .OrderBy(x => x.SoThuTu)
                          .Select(x => new BaiHoc
                          {
                              Id = x.Id,
                              HocKy = x.HocKy,
                              SoThuTu = x.SoThuTu,
                              TenBaiHoc = x.TenBaiHoc,
                              IdChuong = x.IdChuong
                          });

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;
                _baseModel.data = _data;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region DANH SÁCH BỘ MON
        [Route("GetList_BoMon")]
        //[Authorize(Roles = "01011")]
        [HttpGet]
        public BaseModel<object> GetList_BoMon()
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            BaseModel<object> _baseModel = new BaseModel<object>();
            PageModel _pageModel = new PageModel();
            ErrorModel _error = new ErrorModel();

            try
            {
                var _data = _context.MonHoc.Where(x => !x.IsDisabled)
                          .OrderBy(x => x.TenMonHoc)
                          .Select(x => new MonHoc
                          {
                              Id = x.Id,
                              TenMonHoc = x.TenMonHoc
                          });

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;
                _baseModel.data = _data;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region DANH SÁCH NIÊN KHÓA
        [Route("GetList_NienKhoa")]
        //[Authorize(Roles = "01011")]
        [HttpGet]
        public BaseModel<object> GetList_NienKhoa()
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            BaseModel<object> _baseModel = new BaseModel<object>();
            PageModel _pageModel = new PageModel();
            ErrorModel _error = new ErrorModel();

            try
            {
                var _data = _context.NienKhoa.Where(x => !x.Disabled)
                          .OrderBy(x => x.Id)
                          .Select(x => new INienKhoa
                          {
                              Id = x.Id,
                              TenNienKhoa = x.TenNienKhoa,
                          });

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;
                _baseModel.data = _data;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region DANH SÁCH CHỦ NHIỆM
        [Route("GetList_ChuNhiem")]
        //[Authorize(Roles = "01011")]
        [HttpGet]
        public BaseModel<object> GetList_ChuNhiem()
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            BaseModel<object> _baseModel = new BaseModel<object>();
            PageModel _pageModel = new PageModel();
            ErrorModel _error = new ErrorModel();

            try
            {
                var _data = _context.ViewNhanVien.Where(x => x.Disable == Convert.ToInt16(false))
                    .Join(_context.ViewAccount, emp => emp.IdNv, acc => acc.IdNv, (emp, acc) => new { emp, acc })
                          .Select(x => new IViewNhanVien
                          {
                              Id_NV = x.emp.IdNv,
                              TenNV = x.emp.HoTen + " ("+x.acc.Username+")"
                          });

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;
                _baseModel.data = _data;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region DANH SÁCH LỚP HỌC
        [Route("GetList_LopHoc")]
        //[Authorize(Roles = "01011")]
        [HttpGet]
        public BaseModel<object> GetList_LopHoc()
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            BaseModel<object> _baseModel = new BaseModel<object>();
            PageModel _pageModel = new PageModel();
            ErrorModel _error = new ErrorModel();

            try
            {
                //long currentYear = _context.NienKhoa.Where(x => !x.Disabled).Select(x=>x.Id).ToList().LastOrDefault();
                var _data = _context.Lop.Where(x => !x.Disabled /*&& x.IdNienKhoa == currentYear*/)
                          .Select(x => new Lop
                          {
                              Id = x.Id,
                              TenLop = x.TenLop
                          }).ToList();

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;
                _baseModel.data = _data;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region DANH SÁCH THÔNG BÁO
        [Route("GetList_ThongBao")]
        //[Authorize(Roles = "01011")]
        [HttpGet]
        public BaseModel<object> GetList_ThongBao()
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            BaseModel<object> _baseModel = new BaseModel<object>();
            PageModel _pageModel = new PageModel();
            ErrorModel _error = new ErrorModel();

            try
            {
                //long currentYear = _context.NienKhoa.Where(x => !x.Disabled).Select(x=>x.Id).ToList().LastOrDefault();
                var _data = _context.SysNotifyDetail.Where(x => x.IdHocSinh == loginData.id /*&& x.IdNienKhoa == currentYear*/)
                                    .Join(_context.SysNotifyMaster, detail => detail.IdMaster, master => master.Id, (detail, master) => new { detail = detail, master = master })
                                    .Join(_context.ViewNhanVien, notify => notify.master.CreateBy, emp => emp.IdNv, (notify, emp) => new { notify = notify, emp = emp })
                                    .OrderByDescending(x => x.notify.detail.Id)
                                      .Select(x => new INotify
                                      {
                                          IdMaster = x.notify.master.Id,
                                          IdDetail = x.notify.detail.Id,
                                          Title = x.notify.master.Title,
                                          Content = x.notify.master.Content,
                                          CreateByName = x.emp.HoTen,
                                          CreateDate = x.notify.master.CreateDate,
                                          IsRead = x.notify.detail.IsRead,
                                          NotifyIcon = x.notify.master.NotifyIcon
                                      }).ToList().Take(5);

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;
                _baseModel.data = _data;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion
    }
}
