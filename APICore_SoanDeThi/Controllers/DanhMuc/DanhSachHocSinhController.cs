using APICore_SoanDeThi.Assets;
using APICore_SoanDeThi.Controllers.Users;
using APICore_SoanDeThi.Models;
using APICore_SoanDeThi.Models.Common;
using APICore_SoanDeThi.Models.InteractionModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using APICore_SoanDeThi.Models.DatabaseContext;


namespace APICore_SoanDeThi.Controllers.DanhMuc
{
    [Route("api/DanhSachHocSinh")]
    [EnableCors("ExamPolicy")]
    public class DanhSachHocSinhController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public DanhSachHocSinhController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region DANH SÁCH HỌC SINH
        [Route("DanhSachHocSinh_List")]
        //[Authorize(Roles = "")]
        [HttpPost]
        public BaseModel<object> DanhSachHocSinh_List([FromBody] ITableState _tableState)
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

                Func<IDanhSachHocSinh, object> _orderByExpression = x => x.IdNv;

                Dictionary<string, Func<IDanhSachHocSinh, object>> _sortableFields = new Dictionary<string, Func<IDanhSachHocSinh, object>>
                {
                    { "Manv", x => x.Manv },
                    { "HoTen", x => x.HoTen }
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
                var _getIdLop = _context.Lop.Where(x => x.IdChuNhiem == loginData.id).FirstOrDefault();
                var _data = _context.ViewNhanVien.Where(x => x.IdLop == _getIdLop.Id)
                                                  .Select(x => new IDanhSachHocSinh
                                                  {
                                                      IdNv = x.IdNv,
                                                      Manv = x.Manv,
                                                      HoTen = x.HoTen,
                                                      Phai = x.Phai == "1" ? "Nam" : "Nữ",
                                                      NgaySinh = x.Ngaysinh.Value,
                                                      SdtNguoiLienHe = x.SodienthoaiNguoilienhe,
                                                      TenLop = _getIdLop.TenLop,
                                                      TenNienKhoa = _context.NienKhoa.Where(x => x.Id == _getIdLop.IdNienKhoa).Select(t => t.TenNienKhoa).FirstOrDefault(),

                                                  });


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.HoTen.ToLower().Contains(_keywordSearch)
                   );
                    IQueryable<IDanhSachHocSinh> data = _data;
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

                List<IDanhSachHocSinh> listData = new List<IDanhSachHocSinh>();
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
            catch
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region CẤP LẠI MẬT KHẨU
        [Route("DanhSachHocSinh_ResetPassword")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> DanhSachHocSinh_ResetPassword(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _item = _context.ViewAccount.Where(x => x.Id == id && x.Disable == 0).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy tài khoản cần cấp lại mật khẩu, vui lòng tải lại danh sách!!", null);

                _item.Password = EncryptPassword("thptchilang@123");

                _context.SaveChanges();

                return Utilities._responseData(1, "Cập nhật mật khẩu mới thành công", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Cập nhật mật khẩu mới thất bại, vui lòng kiểm tra lại!", null);
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
