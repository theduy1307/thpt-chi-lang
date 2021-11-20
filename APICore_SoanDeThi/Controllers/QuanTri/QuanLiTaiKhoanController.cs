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

namespace APICore_SoanDeThi.Controllers.QuanTri
{
    [Route("api/account")]
    [EnableCors("ExamPolicy")]
    public class QuanLiTaiKhoanController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public QuanLiTaiKhoanController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region DANH SÁCH NGƯỜI DÙNG
        [Route("Account_List")]
        //[Authorize(Roles = "")]
        [HttpPost]
        public BaseModel<object> Account_List([FromBody] ITableState _tableState)
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

                Func<IAccount, object> _orderByExpression = x => x.IdNv;

                Dictionary<string, Func<IAccount, object>> _sortableFields = new Dictionary<string, Func<IAccount, object>>
                {
                    { "Title", x => x.Ten },              
                    //{ "GiaTriMacDinh", x => x.GiaTriMacDinh },
                    //{ "NguoiTao", x => x.NguoiTao },
                    //{ "NgayTao", x => x.NgayTao },
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
                var _data = _context.ViewNhanVien.Where(x => x.Disable != 1).Join(_context.ViewAccount, emp => emp.IdNv, acc => acc.IdNv, (emp, acc) => new { emp = emp, acc = acc })
                                                                            .Select(x => new IAccount { 
                                                                                IdNv = x.emp.IdNv,
                                                                                Holot = x.emp.Holot,
                                                                                Ten = x.emp.Ten,
                                                                                Phai = x.emp.Phai,
                                                                                Ngaysinh = x.emp.Ngaysinh,
                                                                                Email = x.emp.Email,
                                                                                IdChucdanh = x.emp.IdChucdanh,
                                                                                LoaiTaiKhoan = x.acc.Loaitaikhoan,
                                                                                Cocauid = x.emp.Cocauid,
                                                                                Username = x.acc.Username,
                                                                                Picture = x.acc.Picture
                                                                            });


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.Ten.ToLower().Contains(_keywordSearch)

                   );
                    IQueryable<IAccount> data = _data;
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

                List<IAccount> listData = new List<IAccount>();
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

        #region THÊM MỚI TÀI KHOẢN
        [Route("create")]
        //[Authorize(Roles = "10012")]
        [HttpPost]
        public BaseModel<object> Account_Create([FromBody] IAccount data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                if (string.IsNullOrEmpty(data.Username))
                    return Utilities._responseData(0, "Vui lòng nhập tên đắng nhập", null);

                _context.Database.BeginTransaction();

                ViewNhanVien _emp = new ViewNhanVien();
                _emp.Manv = "CK-HCM0310330";
                _emp.Holot = data.Holot;
                _emp.Ten = data.Ten;
                _emp.Phai = data.Phai;
                _emp.Ngaysinh = data.Ngaysinh;
                _emp.Email = data.Email;
                _emp.IdChucdanh = data.IdChucdanh;
                _emp.Disable = 0;
                _emp.SodienthoaiNguoilienhe = data.SodienthoaiNguoilienhe;
                _emp.Cocauid = data.Cocauid;
                _context.ViewNhanVien.Add(_emp);
                _context.SaveChanges();

                ViewAccount _item = new ViewAccount();

                _item.Username = string.IsNullOrEmpty(data.Username) ? "" : data.Username.ToString().Trim();
                _item.IdNv = _emp.IdNv;
                _item.Lock = 0;
                _item.Disable = 0;
                _item.Password = EncryptPassword(data.Password);
                _item.Lastlogin = DateTime.Now;
                _item.Lastpasschg = DateTime.Now;
                _item.Email = data.Email;
                _item.Token = "2021091118030131";
                _item.Loaitaikhoan = 1;
                _item.Isadmin = 1;
                _item.Picture = string.IsNullOrEmpty(data.Picture) ? "" : data.Picture.ToString().Trim();

                _context.ViewAccount.Add(_item);
                _context.SaveChanges();

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại! Lỗi: " + ex.Message, null);
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
