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
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Data;
using System.Globalization;

namespace APICore_SoanDeThi.Controllers.QuanTri
{
    [Route("api/Account_Student")]
    [EnableCors("ExamPolicy")]
    public class QuanLiTaiKhoanHocSinhController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public QuanLiTaiKhoanHocSinhController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region DANH SÁCH HỌC SINH
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
                var _data = _context.ViewNhanVien.Where(x => x.Disable != 1 && x.AllowCode == 4).Join(_context.ViewAccount, emp => emp.IdNv, acc => acc.IdNv, (emp, acc) => new { emp = emp, acc = acc })
                                                                            .Join(_context.Lop, acc => acc.emp.IdLop, lop=>lop.Id, (acc, lop) => new { acc=acc, lop=lop})
                                                                            .Select(x => new IAccount { 
                                                                                Id = x.acc.acc.Id,
                                                                                IdNv = x.acc.emp.IdNv,
                                                                                Holot = x.acc.emp.Holot,
                                                                                Ten = x.acc.emp.Ten,
                                                                                Phai = x.acc.emp.Phai,
                                                                                Ngaysinh = x.acc.emp.Ngaysinh,
                                                                                Email = x.acc.emp.Email,
                                                                                IdChucdanh = x.acc.emp.IdChucdanh,
                                                                                LoaiTaiKhoan = x.acc.acc.Loaitaikhoan,
                                                                                Cocauid = x.acc.emp.Cocauid,
                                                                                Username = x.acc.acc.Username,
                                                                                Picture = x.acc.acc.Picture,
                                                                                Lop = x.lop.TenLop,
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
        [Route("Account_Create")]
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
                _emp.IdLop = Convert.ToInt32(data.Lop);
                _emp.SodienthoaiNguoilienhe = data.SodienthoaiNguoilienhe;
                _emp.Cocauid = data.Cocauid;
                _emp.AllowCode = 4;
                _emp.isStudent = true;

                _context.ViewNhanVien.Add(_emp);
                _context.SaveChanges();

                ViewAccount _item = new ViewAccount();

                _item.Username = setNewUserName(data.Username, data.Username, 0);//string.IsNullOrEmpty(data.Username) ? "" : data.Username.ToString().Trim();
                _item.Password = EncryptPassword("thptchilang@123");
                _item.IdNv = _emp.IdNv;
                _item.Lock = 0;
                _item.Disable = 0;
                _item.Lastlogin = DateTime.Now;
                _item.Lastpasschg = DateTime.Now;
                _item.Email = data.Email;
                _item.Token = "2021091118030131";
                _item.Loaitaikhoan = 1;
                _item.Isadmin = 1;                

                if(data.FileImport != null && !string.IsNullOrEmpty(data.FileImport.filename))
                {
                    string _path = "wwwroot/assets/account-images/";
                    string _pathToSave = "assets/account-images/";
                    string _targetPath = Path.Combine(_hosting.ContentRootPath, _path);
                    if (!Directory.Exists(_targetPath))
                        Directory.CreateDirectory(_targetPath);
                    string _fileName = _targetPath + data.FileImport.filename + "." + data.FileImport.extension;
                    
                    byte[] _fileByte = null;

                    if (data.FileImport.fileByte != null)
                        _fileByte = data.FileImport.fileByte;
                    else
                        _fileByte = Convert.FromBase64String(data.FileImport.base64);
                    System.IO.File.WriteAllBytes(_fileName, _fileByte);

                    _item.Picture = _pathToSave + data.FileImport.filename + "." + data.FileImport.extension;
                }
                _context.ViewAccount.Add(_item);
                _context.SaveChanges();

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Thêm mới tài khoản thành công", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại! Lỗi: " + ex.Message, null);
            }
        }
        #endregion

        #region THÊM MỚI TÀI KHOẢN
        [Route("Account_CreateImport")]
        //[Authorize(Roles = "10012")]
        [HttpPost]
        public BaseModel<object> Account_CreateImport([FromBody] List<IAccount> data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                if (data.Count == 0)
                    return Utilities._responseData(0, "Vui lòng nhập tên đắng nhập", null);

                _context.Database.BeginTransaction();

                foreach(var item in data)
                {
                    ViewNhanVien _emp = new ViewNhanVien();
                    _emp.Manv = "CK-HCM0310330";
                    _emp.Holot = item.Holot;
                    _emp.Ten = item.Ten;
                    _emp.Phai = item.Phai;
                    _emp.Ngaysinh = item.Ngaysinh;
                    _emp.Email = string.IsNullOrEmpty(item.Email) ? "Không có" : item.Email;
                    _emp.IdChucdanh = item.IdChucdanh;
                    _emp.Disable = 0;
                    _emp.SodienthoaiNguoilienhe = string.IsNullOrEmpty(item.SodienthoaiNguoilienhe) ? "Không có" : item.SodienthoaiNguoilienhe;
                    _emp.Cocauid = item.Cocauid;
                    _emp.AllowCode = 4;
                    _emp.isStudent = true;
                    var idLop = _context.Lop.Where(x => x.TenLop.Equals(item.Lop)).Select(x => x.Id).FirstOrDefault();

                    if(idLop == null)
                    {
                        _context.Database.RollbackTransaction();
                        return Utilities._responseData(0, "Lớp " + item.Lop + " không tồn tại trong hệ thống", null);
                    }
                    else
                    {
                        _emp.IdLop = idLop;
                    }

                    _context.ViewNhanVien.Add(_emp);
                    _context.SaveChanges();

                    ViewAccount _item = new ViewAccount();

                    _item.Username = setNewUserName(item.Username, item.Username, 0);//string.IsNullOrEmpty(data.Username) ? "" : data.Username.ToString().Trim();
                    _item.Password = EncryptPassword("thptchilang@123");
                    _item.IdNv = _emp.IdNv;
                    _item.Lock = 0;
                    _item.Disable = 0;
                    _item.Lastlogin = DateTime.Now;
                    _item.Lastpasschg = DateTime.Now;
                    _item.Email = string.IsNullOrEmpty(item.Email) ? "Không có" : item.Email;
                    _item.Token = "2021091118030131";
                    _item.Loaitaikhoan = 1;
                    _item.Isadmin = 1;

                    _context.ViewAccount.Add(_item);
                }                

                _context.SaveChanges();

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Thêm mới tài khoản thành công", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại! Lỗi: " + ex.Message, null);
            }
        }
        #endregion

        #region CẬP NHẬT BÀI KIỂM TRA
        [Route("Account_Update")]
        //[Authorize(Roles = "10013")]
        [HttpPost]
        public BaseModel<object> BaiKiemTra_Update([FromBody] IAccount data)
        {

            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                _context.Database.BeginTransaction();
                if (string.IsNullOrEmpty(data.Username))
                {
                    _context.Database.RollbackTransaction();
                    return Utilities._responseData(0, "Chưa có tên đăng nhập!!", null);
                }

                var _emp = _context.ViewNhanVien.Where(x => x.IdNv == data.IdNv && x.Disable == 0).FirstOrDefault();
                var _item = _context.ViewAccount.Where(x => x.Id == data.Id && x.Disable == 0).FirstOrDefault();
                if (_emp == null || _item == null)
                {
                    _context.Database.RollbackTransaction();
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu cần cập nhật, vui lòng tải lại danh sách!!", null);
                }

                _emp.Manv = "CK-HCM0310330";
                _emp.Holot = data.Holot;
                _emp.Ten = data.Ten;
                _emp.Phai = data.Phai;
                _emp.Ngaysinh = data.Ngaysinh;
                _emp.Email = data.Email;
                _emp.IdChucdanh = data.IdChucdanh;
                _emp.SodienthoaiNguoilienhe = data.SodienthoaiNguoilienhe;
                _emp.Cocauid = data.Cocauid;
                _context.SaveChanges();

                _item.Username = _item.Username.Equals(data.Username) ? _item.Username : setNewUserName(data.Username, data.Username, 0);//string.IsNullOrEmpty(data.Username) ? "" : data.Username.ToString().Trim();
                _item.IdNv = _emp.IdNv;
                _item.Lock = 0;
                _item.Disable = 0;
                _item.Password = EncryptPassword(data.Password);
                _item.Lastlogin = DateTime.Now;
                _item.Lastpasschg = DateTime.Now;
                _item.Email = data.Email;
                _item.Loaitaikhoan = 1;
                _item.Isadmin = 1;
                _item.Picture = string.IsNullOrEmpty(data.Picture) ? "" : data.Picture.ToString().Trim();

                if (data.FileImport != null && !string.IsNullOrEmpty(data.FileImport.filename))
                {
                    string _path = "wwwroot/assets/account-images/";
                    string _pathToSave = "assets/account-images/";
                    string _targetPath = Path.Combine(_hosting.ContentRootPath, _path);
                    if (!Directory.Exists(_targetPath))
                        Directory.CreateDirectory(_targetPath);
                    string _fileName = _targetPath + data.FileImport.filename + "." + data.FileImport.extension;

                    byte[] _fileByte = null;

                    if (data.FileImport.fileByte != null)
                        _fileByte = data.FileImport.fileByte;
                    else
                        _fileByte = Convert.FromBase64String(data.FileImport.base64);
                    System.IO.File.WriteAllBytes(_fileName, _fileByte);

                    _item.Picture = _pathToSave + data.FileImport.filename + "." + data.FileImport.extension;
                }
                _context.SaveChanges();

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Cập nhật tài khoản thành công", data);
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return Utilities._responseData(0, "Cập nhật thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region LẤY CHI TIẾT CÂU HỎI
        [Route("Account_Detail")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> Account_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _item = _context.ViewAccount.Where(x => x.Id == id && x.Disable == 0)
                                                .Join(_context.ViewNhanVien, acc => acc.IdNv, emp => emp.IdNv, (acc, emp) => new { acc, emp })
                                                .Join(_context.MonHoc, acc => acc.emp.Cocauid, org => org.Id, (acc, org) => new { acc, org })
                                                .Select(x => new IAccount {
                                                    Id = x.acc.acc.Id,
                                                    IdNv = x.acc.acc.IdNv ?? 0,
                                                    Manv = x.acc.emp.Manv,
                                                    Holot = x.acc.emp.Holot,
                                                    Ten = x.acc.emp.Ten,
                                                    Phai = x.acc.emp.Phai,
                                                    Ngaysinh = x.acc.emp.Ngaysinh,
                                                    Email = x.acc.emp.Email,
                                                    LoaiTaiKhoan = x.acc.acc.Loaitaikhoan,
                                                    Disable = x.acc.acc.Disable,
                                                    SodienthoaiNguoilienhe = x.acc.emp.SodienthoaiNguoilienhe,
                                                    Cocauid = x.acc.emp.Cocauid,
                                                    Username = x.acc.acc.Username,
                                                    Password = x.acc.acc.Password,
                                                    Picture = x.acc.acc.Picture,
                                                    TenCoCau = _context.MonHoc.Where(o => o.Id == x.acc.emp.Cocauid).Select(o => o.TenMonHoc).FirstOrDefault()
                                                })
                                                .FirstOrDefault();


                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu, vui lòng tải lại!!", null);

                return Utilities._responseData(1, "", _item);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region CẤP LẠI MẬT KHẨU
        [Route("Account_ResetPassword")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> Account_ResetPassword(long id)
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

        #region IMPORT EXCEL
        [Route("Account_Import")]
        [HttpPost, DisableRequestSizeLimit]

        public async Task<BaseModel<object>> ImportFileImport_NhaCC()
        {
            BaseModel<object> _baseModel = new BaseModel<object>();
            ErrorModel _error = new ErrorModel();
            var FileRequest = Request.Form.Files[0];
            byte[] ad;
            DataTable dataTable = new DataTable();
            List<IAccount> ListNCC = new List<IAccount>();
            try
            {

                if (FileRequest.Length > 0)
                {


                    string folderName = Constant.FileImport_HocSinh;
                    string RootPath = _hosting.ContentRootPath;
                    string newPath = Path.Combine(RootPath, folderName);


                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }


                    string path = Path.Combine(newPath, FileRequest.FileName);
                    if (System.IO.File.Exists(path))
                    {


                        System.IO.File.Delete(path);


                    }
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await FileRequest.CopyToAsync(stream);
                    }





                    using (SpreadsheetDocument document = SpreadsheetDocument.Open(path, true))
                    {


                        WorkbookPart workbookPart = document.WorkbookPart;
                        IEnumerable<Sheet> sheets = document.WorkbookPart.Workbook.GetFirstChild<Sheets>().Elements<Sheet>();
                        string relationshipId = sheets.First().Id.Value;
                        WorksheetPart worksheetPart = (WorksheetPart)document.WorkbookPart.GetPartById(relationshipId);
                        Worksheet workSheet = worksheetPart.Worksheet;
                        SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                        IEnumerable<Row> rows = sheetData.Descendants<Row>();


                        dataTable.Columns.Add("HoLot");
                        dataTable.Columns.Add("Ten");
                        dataTable.Columns.Add("GioiTinh");
                        dataTable.Columns.Add("NgaySinh");
                        dataTable.Columns.Add("Lop");
                        dataTable.Columns.Add("Khoi");
                        dataTable.Columns.Add("SoDienThoai");
                        foreach (Row row in rows)
                        {
                            DataRow dataRow = dataTable.NewRow();

                            int columnIndex = 0;
                            if (row.RowIndex != 1 && row.RowIndex != 2)
                            {

                                foreach (Cell cell in row.Descendants<Cell>())
                                {

                                    int cellColumnIndex = (int)GetColumnIndexFromName(GetColumnName(cell.CellReference));
                                    cellColumnIndex--;
                                    if (columnIndex < cellColumnIndex)
                                    {
                                        do
                                        {
                                            dataRow[columnIndex] = "";
                                            columnIndex++;
                                        }
                                        while (columnIndex < cellColumnIndex);
                                    }
                                    dataRow[columnIndex] = GetCellValue(document, cell);

                                    columnIndex++;
                                }
                                dataTable.Rows.Add(dataRow);
                            }



                        }
                    }

                    foreach (DataRow row in dataTable.Rows)
                    {
                        if(string.IsNullOrEmpty(row["HoLot"].ToString()) && string.IsNullOrEmpty(row["Ten"].ToString())
                            && string.IsNullOrEmpty(row["GioiTinh"].ToString()) && string.IsNullOrEmpty(row["NgaySinh"].ToString())
                            && string.IsNullOrEmpty(row["Lop"].ToString()) && string.IsNullOrEmpty(row["Khoi"].ToString())
                            && string.IsNullOrEmpty(row["SoDienThoai"].ToString()))
                        {
                            break;
                        }
                        IAccount ncc = new IAccount();
                        ncc.Holot = !string.IsNullOrEmpty(row["HoLot"].ToString()) ? row["HoLot"].ToString() : "";
                        ncc.Ten = !string.IsNullOrEmpty(row["Ten"].ToString()) ? row["Ten"].ToString() : "";
                        ncc.Phai = !string.IsNullOrEmpty(row["GioiTinh"].ToString()) ? row["GioiTinh"].ToString() : "";

                        //double date = Convert.ToDouble(row["NgaySinh"].ToString());
                        //DateTime dt = DateTime.FromOADate(date); 
                        ncc.Ngaysinh = !string.IsNullOrEmpty(row["NgaySinh"].ToString()) ? DateTime.FromOADate(Convert.ToDouble(row["NgaySinh"].ToString())) : DateTime.Now;
                        
                        ncc.Lop = !string.IsNullOrEmpty(row["Lop"].ToString()) ? row["Lop"].ToString() : "";  
                        ncc.SodienthoaiNguoilienhe = !string.IsNullOrEmpty(row["SoDienThoai"].ToString()) ? row["SoDienThoai"].ToString() : "";
                        //ncc.Id_LoaiNCC = !string.IsNullOrEmpty(row["IdLoaiNCC"].ToString()) ? (Regex.IsMatch(row["IdLoaiNCC"].ToString().ToLower(), Constant.REGEX_FORMAT_ONLYNUMBER) ? long.Parse(row["IdLoaiNCC"].ToString()) : 0) : 0;
                        //ncc.TenLoaiNCC = !string.IsNullOrEmpty(row["TenLoaiNCC"].ToString()) ? row["TenLoaiNCC"].ToString() : "";
                        //ncc.Id_NhomNCC = !string.IsNullOrEmpty(row["IdNhomNCC"].ToString()) ? (Regex.IsMatch(row["IdNhomNCC"].ToString().ToLower(), Constant.REGEX_FORMAT_ONLYNUMBER) ? int.Parse(row["IdNhomNCC"].ToString()) : 0) : 0;
                        //ncc.TenNhomNCC = !string.IsNullOrEmpty(row["TenNhomNCC"].ToString()) ? row["TenNhomNCC"].ToString() : "";
                        //ncc.DiaChi = !string.IsNullOrEmpty(row["DiaChi"].ToString()) ? row["DiaChi"].ToString() : "";
                        //ncc.DienThoai = !string.IsNullOrEmpty(row["SDT"].ToString()) ? row["SDT"].ToString() : "";
                        //ncc.Fax = !string.IsNullOrEmpty(row["Fax"].ToString()) ? row["Fax"].ToString() : "";
                        //ncc.MST = !string.IsNullOrEmpty(row["MaSoThue"].ToString()) ? row["MaSoThue"].ToString() : "";
                        //ncc.SoTK1 = !string.IsNullOrEmpty(row["STK1"].ToString()) ? row["STK1"].ToString() : "";
                        //ncc.NganHang1 = !string.IsNullOrEmpty(row["NH1"].ToString()) ? row["NH1"].ToString() : "";
                        //ncc.SoTK2 = !string.IsNullOrEmpty(row["STK2"].ToString()) ? row["STK2"].ToString() : "";
                        //ncc.NganHang2 = !string.IsNullOrEmpty(row["NH2"].ToString()) ? row["NH2"].ToString() : "";
                        //ncc.Email = !string.IsNullOrEmpty(row["Email"].ToString()) ? row["Email"].ToString() : "";
                        //ncc.NguoiLienHe = !string.IsNullOrEmpty(row["NguoiLH"].ToString()) ? row["NguoiLH"].ToString() : "";
                        //ncc.SoDT_NguoiLienHe = !string.IsNullOrEmpty(row["SDTNguoiLH"].ToString()) ? row["SDTNguoiLH"].ToString() : "";
                        //ncc.SoNgayThanhToan = !string.IsNullOrEmpty(row["SoNgayThanhToan"].ToString()) ? (Regex.IsMatch(row["SoNgayThanhToan"].ToString().ToLower(), Constant.REGEX_FORMAT_ONLYNUMBER) ? int.Parse(row["SoNgayThanhToan"].ToString()) : 0) : 0;
                        //ncc.XepLoai = !string.IsNullOrEmpty(row["XepLoai"].ToString()) ? row["XepLoai"].ToString() : "";
                        //ncc.GhiChu = !string.IsNullOrEmpty(row["GhiChu"].ToString()) ? row["GhiChu"].ToString() : "";
                        ListNCC.Add(ncc);
                    }
                }
                _baseModel.data = ListNCC;
                _baseModel.status = 1;

                return _baseModel;
            }
            catch (Exception ex)
            {
                _baseModel.status = 0;
                _error.message = "Xóa thất bại: " + ex;
                _error.code = Constant.ERRORCODE;
                _baseModel.error = _error;
                _baseModel.data = null;
                return _baseModel;
            }



        }
        #endregion

        #region DOWNLOAD FILE MẪU
        /// <summary>
        /// Tải file import mẫu
        /// </summary>
        /// <returns> File Excel </returns>
        [Route("Account_DownLoadTemplate")]
        [HttpGet]
        public FileResult DownLoadFileImportMauDynamic()
        {
            try
            {
                string fileName = "IMPORT_HOCSINH_MAU.xlsx";
                string path = Path.Combine(_hosting.ContentRootPath, "DuLieu/Templates/IMPORT_HOCSINH_MAU.xlsx");
                var fileExists = System.IO.File.Exists(path);
                return PhysicalFile(path, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        private string setNewUserName(string initialUsername, string? primaryUsername, int count)
        {
            string newUsername = initialUsername;
            var username = _context.ViewAccount.Where(x => x.Username.Equals(initialUsername)).Select(x=>x.Username).FirstOrDefault();
            if(username != null)
            {
                count++;
                newUsername = (primaryUsername + count).ToString();
                newUsername = setNewUserName(newUsername, primaryUsername, count);
            }
            return newUsername;
        }
        private static string EncryptPassword(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string GetCellValue(SpreadsheetDocument document, Cell cell)
        {
            SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
            if (cell.CellValue == null)
            {
                return "";
            }
            string value = cell.CellValue.InnerXml;
            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
            }
            else
            {
                return value;
            }
        }

        public static int? GetColumnIndexFromName(string columnName)
        {

            //return columnIndex;
            string name = columnName;
            int number = 0;
            int pow = 1;
            for (int i = name.Length - 1; i >= 0; i--)
            {
                number += (name[i] - 'A' + 1) * pow;
                pow *= 26;
            }
            return number;
        }

        public static string GetColumnName(string cellReference)
        {

            Regex regex = new Regex("[A-Za-z]+");
            Match match = regex.Match(cellReference);
            return match.Value;
        }
    }
}
