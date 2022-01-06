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
using System.IO;

namespace APICore_SoanDeThi.Controllers.QuanTri
{
    [Route("api/NienKhoa")]
    [EnableCors("ExamPolicy")]
    public class QuanLiNienKhoaController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public QuanLiNienKhoaController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region DANH SÁCH NIÊN KHÓA
        [Route("NienKhoa_List")]
        [HttpPost]
        public BaseModel<object> NienKhoa_List([FromBody] ITableState _tableState)
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
                string _keywordSearch = "";
                bool _orderBy_ASC = false;

                Func<INienKhoa, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<INienKhoa, object>> _sortableFields = new Dictionary<string, Func<INienKhoa, object>>
                {
                    { "TenNienKhoa", x => x.TenNienKhoa },
                    { "NgayTao", x => x.NgayTao }
                };

                if (!string.IsNullOrEmpty(_tableState.sorting.direction) && _sortableFields.ContainsKey(_tableState.sorting.column))
                {
                    _orderBy_ASC = ("desc".Equals(_tableState.sorting.direction) ? false : true);
                    _orderByExpression = _sortableFields[_tableState.sorting.column];
                }
                string _rules = "";
                if (!string.IsNullOrEmpty(_tableState.filter["rules"]))
                {
                    _rules = _tableState.filter["rules"];
                }
                var _data = _context.NienKhoa.Where(x => x.Disabled == false)
                                            .Select(x => new INienKhoa
                                            {
                                                Id = x.Id,
                                                TenNienKhoa = x.TenNienKhoa,
                                                NgayTao = x.NgayTao,
                                                NguoiTao = x.NguoiTao,
                                                TenNguoiTao = _context.ViewNhanVien.Where(k => k.IdNv == x.NguoiTao && k.Disable == Convert.ToInt16(false)).Select(x => x.HoTen).FirstOrDefault()
                                            }) ;

                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.TenNienKhoa.ToLower().Contains(_keywordSearch)

                   );
                    IQueryable<INienKhoa> data = _data;
                }

                int _countRows = _data.Count();
                if (_countRows == 0)
                    return Utilities._responseData(0, "Không có dữ liệu hiển thị!", null);

                _pageModel.TotalCount = _countRows;
                _pageModel.AllPage = (int)Math.Ceiling(_countRows / (decimal)_tableState.paginator.PageSize);
                _pageModel.Size = _tableState.paginator.PageSize;
                _pageModel.Page = _tableState.paginator.page;

                _baseModel.status = 1;
                _baseModel.error = null;
                _baseModel.page = _pageModel;

                List<INienKhoa> listData = new List<INienKhoa>();
                if (_orderBy_ASC)
                {
                    listData = _data
                        .OrderBy(_orderByExpression)
                        .Skip((_tableState.paginator.page - 1) * _tableState.paginator.PageSize)
                        .Take(_tableState.paginator.PageSize)
                        .ToList();
                }
                else
                {
                    listData = _data
                        .OrderByDescending(_orderByExpression)
                        .Skip((_tableState.paginator.page - 1) * _tableState.paginator.PageSize)
                        .Take(_tableState.paginator.PageSize)
                        .ToList();
                }

                _baseModel.data = listData;
                return _baseModel;

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region THÊM MỚI NIÊN KHÓA
        [Route("NienKhoa_Add")]
        [HttpPost]
        public BaseModel<object> NienKhoa_Add([FromBody] INienKhoa data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                if (string.IsNullOrEmpty(data.TenNienKhoa))
                    return Utilities._responseData(0, "Vui lòng nhập tên niên khóa", null);
                _context.Database.BeginTransaction();
                NienKhoa item = new NienKhoa();
                item.TenNienKhoa = data.TenNienKhoa;
                item.NguoiTao = data.NguoiTao;
                item.NgayTao = DateTime.Now.ToString();
                _context.NienKhoa.Add(item);
                _context.SaveChanges();
                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Thêm mới tài khoản thành công", data);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại! Lỗi:", null);
            }
        }
        #endregion

        #region CHỈNH SỬA NIÊN KHÓA
        [Route("NienKhoa_Edit")]
        [HttpPost]
        public BaseModel<object> NienKhoa_Edit([FromBody] INienKhoa data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                var temp = _context.NienKhoa.Where(x => x.Id == data.Id).FirstOrDefault();
                temp.TenNienKhoa = data.TenNienKhoa;
                temp.NguoiSua = loginData.id;
                temp.NgaySua = DateTime.Now.ToString();
                _context.SaveChanges();

                return Utilities._responseData(1, "Chỉnh sửa tài khoản thành công", data);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Chỉnh sửa thất bại, vui lòng kiểm tra lại! Lỗi:", null);
            }
        }
        #endregion

        #region CHI TIẾT NIÊN KHÓA
        [Route("NienKhoa_Detail")]
        [HttpGet]
        public BaseModel<object> NienKhoa_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                var temp = _context.NienKhoa.Where(x => x.Id == id)
                                            .Select(x => new INienKhoa
                                            {
                                                Id = x.Id,
                                                TenNienKhoa = x.TenNienKhoa,
                                                NguoiTao = x.NguoiTao,
                                                TenNguoiTao = _context.ViewNhanVien.Where(k => k.IdNv == x.NguoiTao && k.Disable == Convert.ToInt16(false)).Select(x => x.HoTen).FirstOrDefault(),
                                                
                                            }).FirstOrDefault();
                return Utilities._responseData(1, "", temp);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "tìm dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region XÓA NIÊN KHÓA
        [Route("NienKhoa_Delete")]
        [HttpGet]
        public BaseModel<object> NienKhoa_Delete(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                var temp = _context.NienKhoa.Where(x => x.Id == id).FirstOrDefault();
                temp.Disabled = true;
                _context.SaveChanges();

                return Utilities._responseData(1, "Xóa tài khoản thành công", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Xóa thất bại, vui lòng kiểm tra lại! Lỗi:", null);
            }
        }
        #endregion
    }
}
