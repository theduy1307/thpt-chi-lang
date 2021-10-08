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

        #region DANH SÁCH CHƯƠNG MÔN HỌC
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
    }
}
