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
    [Route("api/Lop")]
    [EnableCors("ExamPolicy")]
    public class QuanLiLopController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public QuanLiLopController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }
        #region DANH SÁCHLỚP
        [Route("Lop_List")]
        [HttpPost]
        public BaseModel<object> Lop_List([FromBody] ITableState _tableState)
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

                Func<ILop, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<ILop, object>> _sortableFields = new Dictionary<string, Func<ILop, object>>
                {
                    { "TenLop", x => x.TenLop },
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
                var _data = _context.Lop.Where(x => x.Disabled == false)
                                            .Select(x => new ILop
                                            {
                                                Id = x.Id,
                                                TenLop = x.TenLop,
                                                Loai = x.Loai,
                                                TenNienKhoa = _context.NienKhoa.Where(k => k.Disabled == false && k.Id == x.IdNienKhoa).Select(x => x.TenNienKhoa).FirstOrDefault(),
                                                TenChuNhiem = _context.ViewNhanVien.Where(k => k.Disable == Convert.ToInt16(false) && k.IdNv == x.IdChuNhiem).Select(x => x.HoTen).FirstOrDefault(),
                                                NgayTao = x.NgayTao,
                                                NguoiTao = x.NguoiTao,
                                                TenNguoiTao = _context.ViewNhanVien.Where(k => k.IdNv == x.NguoiTao && k.Disable == Convert.ToInt16(false)).Select(x => x.HoTen).FirstOrDefault()
                                            }) ;

                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.TenLop.ToLower().Contains(_keywordSearch) ||
                          x.Loai.ToLower().Contains(_keywordSearch) ||
                          x.TenNienKhoa.ToLower().Contains(_keywordSearch) ||
                          x.TenChuNhiem.ToLower().Contains(_keywordSearch) 
                   );
                    IQueryable<ILop> data = _data;
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

                List<ILop> listData = new List<ILop>();
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



        #region CHI TIẾL LỚP
        [Route("Lop_Detail")]
        [HttpGet]
        public BaseModel<object> Lop_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                var item = _context.Lop.Where(x => x.Id == id).FirstOrDefault();
                return Utilities._responseData(1, "", item);
            }
            catch
            {
                return Utilities._responseData(0, "", null);
            }
        }
        #endregion

        #region XÓA LỚP
        [Route("Lop_Delete")]
        [HttpGet]
        public BaseModel<object> Lop_Delete(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                var item = _context.Lop.Where(x => x.Id == id).FirstOrDefault();
                item.Disabled = true;
                _context.SaveChanges();
                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Xóa tài khoản thành công", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "xóa thất bại, vui lòng kiểm tra lại! Lỗi:", null);
            }
        }
        #endregion

        #region CHỈNH SỬA LỚP
        [Route("Lop_Edit")]
        [HttpPost]
        public BaseModel<object> Lop_Edit([FromBody] ILop data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                if (string.IsNullOrEmpty(data.TenLop))
                    return Utilities._responseData(0, "Vui lòng nhập tên lớp", null);
                var item = _context.Lop.Where(x => x.Id == data.Id).FirstOrDefault();
                item.TenLop = data.TenLop;
                item.Loai = data.TenLop.Substring(0, 2);
                item.IdChuNhiem = Convert.ToInt64(data.IdChuNhiem);
                item.IdNienKhoa = data.IdNienKhoa;
                item.NguoiSua = loginData.id;
                item.NgaySua = DateTime.Now.ToString();
                _context.SaveChanges();
                return Utilities._responseData(1, "Thêm mới tài khoản thành công", data);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại! Lỗi:", null);
            }
        }
        #endregion

        #region THÊM MỚI LỚP
        [Route("Lop_Add")]
        [HttpPost]
        public BaseModel<object> Lop_Add([FromBody] ILop data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                if (string.IsNullOrEmpty(data.TenLop))
                    return Utilities._responseData(0, "Vui lòng nhập tên lớp", null);
                _context.Database.BeginTransaction();
                Lop item = new Lop();
                item.TenLop = data.TenLop;
                item.Loai = data.TenLop.Substring(0, 2);
                item.IdChuNhiem = data.IdChuNhiem;
                item.IdNienKhoa = data.IdNienKhoa;
                item.NguoiTao = loginData.id;
                item.NgayTao = DateTime.Now.ToString();
                _context.Lop.Add(item);
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


    }
}
