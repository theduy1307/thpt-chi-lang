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
    [Route("api/ListBaiKiemTraOnline")]
    [EnableCors("ExamPolicy")]
    public class ListBaiKiemTraOnlineController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;
        readonly IGeneratePdf _generatePdf;

        public ListBaiKiemTraOnlineController(IHostingEnvironment hostingEnvironment, IGeneratePdf generatePdf)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
            _generatePdf = generatePdf;
        }

        #region DANH SÁCH BÀI KIỂM TRA
        [Route("ListBaiKiemTraOnline_List")]
        //[Authorize(Roles = "")]
        [HttpPost]
        public BaseModel<object> BaiKiemTra_List([FromBody] ITableState _tableState)
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

                Func<IBaiKiemTra_TrucTuyen_Group, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<IBaiKiemTra_TrucTuyen_Group, object>> _sortableFields = new Dictionary<string, Func<IBaiKiemTra_TrucTuyen_Group, object>>
                {
                    { "Title", x => x.TenBaiKiemTra },              
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
                var _data = _context.BaiKiemTra_TrucTuyen_Group.Where(x => !x.IsDisabled && !x.IsCustom)
                                                  .Join(_context.ViewNhanVien, kiemtra => kiemtra.NguoiTao, nhanvien => nhanvien.IdNv, (kiemtra, nhanvien) => new { kiemtra, nhanvien })
                                                  .Select(x => new IBaiKiemTra_TrucTuyen_Group
                                                  {
                                                      Id = x.kiemtra.Id,
                                                      TenBaiKiemTra = "KIỂM TRA " + x.kiemtra.TenBaiKiemTra.ToUpper(),
                                                      SoLuongDe = x.kiemtra.SoLuongDe,
                                                      CauBiet = x.kiemtra.CauBiet,
                                                      CauHieu = x.kiemtra.CauHieu,
                                                      CauVanDungThap = x.kiemtra.CauVanDungThap,
                                                      CauVanDungCao = x.kiemtra.CauVanDungCao,
                                                      NamHoc = x.kiemtra.NamHoc.ToUpper(),
                                                      IsCustom = x.kiemtra.IsCustom,
                                                      Lop = x.kiemtra.Lop,
                                                      TenNguoiTao = x.nhanvien.HoTen,
                                                      NguoiTao = x.kiemtra.NguoiTao,
                                                      HocKy = x.kiemtra.HocKy,
                                                      IdMonHoc = x.kiemtra.IdMonHoc,
                                                      TrangThai = x.kiemtra.TrangThai,
                                                      ThoiGianLamBai = x.kiemtra.ThoiGianLamBai,
                                                      NgayTao = x.kiemtra.NgayTao,
                                                      NgayThi = x.kiemtra.NgayThi,
                                                      Password = x.kiemtra.Password,
                                                      GioThi = x.kiemtra.GioThi,
                                                      isExam = x.kiemtra.isExam
                                                  });


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.TenBaiKiemTra.ToLower().Contains(_keywordSearch)

                   );
                    IQueryable<IBaiKiemTra_TrucTuyen_Group> data = _data;
                }

                if(_tableState.filter.vals != "")
                {
                    _data = _data.Where(x => x.Lop == Int32.Parse(_tableState.filter.vals));
                    IQueryable<IBaiKiemTra_TrucTuyen_Group> data = _data;
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

                List<IBaiKiemTra_TrucTuyen_Group> listData = new List<IBaiKiemTra_TrucTuyen_Group>();
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

        #region THÊM MỚI BÀI KIỂM TRA
        [Route("ListBaiKiemTraOnline_Add")]
        //[Authorize(Roles = "10012")]
        [HttpPost]
        public BaseModel<object> ListBaiKiemTraOnline_Add([FromBody] IBaiKiemTra_TrucTuyen_Group data)
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            
            try
            {
                if (string.IsNullOrEmpty(data.TenBaiKiemTra))
                    return Utilities._responseData(0, "Vui lòng nhập số hợp đồng mua!!", null);

                _context.Database.BeginTransaction();
                BaiKiemTra_TrucTuyen_Group _item = new BaiKiemTra_TrucTuyen_Group();

                _item.TenBaiKiemTra = string.IsNullOrEmpty(data.TenBaiKiemTra) ? "" : data.TenBaiKiemTra.ToString().Trim();
                _item.SoLuongDe = data.SoLuongDe;
                _item.CauBiet = data.CauBiet;
                _item.CauHieu = data.CauHieu;
                _item.CauVanDungThap = data.CauVanDungThap;
                _item.CauVanDungCao = data.CauVanDungCao;
                _item.NamHoc = data.NamHoc;
                _item.IdMonHoc = data.IdMonHoc;
                _item.ThoiGianLamBai = data.ThoiGianLamBai;
                _item.HocKy = data.HocKy;
                _item.Lop = data.Lop;
                _item.NguoiTao = data.NguoiTao;
                _item.NgayTao = DateTime.Now;
                _item.TrangThai = data.TrangThai;
                _item.IsDisabled = false;
                _item.IsCustom = false;
                _item.NgayThi = data.NgayThi;
                _item.GioThi = data.GioThi;
                _item.Password = data.Password;

                _context.BaiKiemTra_TrucTuyen_Group.Add(_item);
                _context.SaveChanges();

                var listDeOffline = _context.BaiKiemTra.Where(x => x.IdGroup == data.Id_BaiKiemTra_Offline).ToList();
                foreach(var item in listDeOffline)
                {
                    BaiKiemTra_TrucTuyen temp = new BaiKiemTra_TrucTuyen();
                    temp.IdGroup = _item.Id;
                    temp.MaDe = item.MaDe;
                    _context.BaiKiemTra_TrucTuyen.Add(temp);
                    _context.SaveChanges();

                    var listCauHoi = _context.BaiKiemTra_ChiTiet.Where(x => x.IdBaiKiemTra == item.Id).ToList();
                    foreach(var lego in listCauHoi)
                    {
                        BaiKiemTra_TrucTuyen_ChiTiet ulatroi = new BaiKiemTra_TrucTuyen_ChiTiet();
                        ulatroi.IdBaiKiemTra = temp.Id;
                        ulatroi.IdCauHoi = lego.IdCauHoi;
                        _context.BaiKiemTra_TrucTuyen_ChiTiet.Add(ulatroi);
                        _context.SaveChanges();
                    }
                }


                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region CHỈNH SỬA BÀI KIỂM TRA
        [Route("ListBaiKiemTraOnline_Edit")]
        //[Authorize(Roles = "10012")]
        [HttpPost]
        public BaseModel<object> BaiKiemTraOnline_Edit([FromBody] IBaiKiemTra_TrucTuyen_Group data)
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                
                if (string.IsNullOrEmpty(data.TenBaiKiemTra))
                    return Utilities._responseData(0, "Vui lòng nhập số hợp đồng mua!!", null);

                _context.Database.BeginTransaction();
                var _item = _context.BaiKiemTra_TrucTuyen_Group.Where(x => x.Id == data.Id).FirstOrDefault();
                _item.NgayThi = data.NgayThi;
                _item.GioThi = data.GioThi;
                _item.Password = data.Password;

                //_context.BaiKiemTra_TrucTuyen_Group.Add(_item);
                _context.SaveChanges();

                //var listDeOffline = _context.BaiKiemTra.Where(x => x.IdGroup == data.Id_BaiKiemTra_Offline).ToList();
                //foreach (var item in listDeOffline)
                //{
                //    BaiKiemTra_TrucTuyen temp = new BaiKiemTra_TrucTuyen();
                //    temp.IdGroup = item.IdGroup;
                //    temp.MaDe = item.MaDe;
                //    _context.BaiKiemTra_TrucTuyen.Add(temp);
                //    _context.SaveChanges();

                //    var listCauHoi = _context.BaiKiemTra_ChiTiet.Where(x => x.IdBaiKiemTra == item.Id).ToList();
                //    foreach (var lego in listCauHoi)
                //    {
                //        BaiKiemTra_TrucTuyen_ChiTiet ulatroi = new BaiKiemTra_TrucTuyen_ChiTiet();
                //        ulatroi.IdBaiKiemTra = lego.IdBaiKiemTra;
                //        ulatroi.IdCauHoi = lego.IdCauHoi;
                //        _context.BaiKiemTra_TrucTuyen_ChiTiet.Add(ulatroi);
                //        _context.SaveChanges();
                //    }
                //}


                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region CHI TIẾT BÀI KIỂM TRA
        [Route("ListBaiKiemTraOnline_Detail")]
        //[Authorize(Roles = "10012")]
        [HttpGet]
        public BaseModel<object> BaiKiemTraOnline_Detail(long id)
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _data = _context.BaiKiemTra_TrucTuyen_Group.Where(x => !x.IsDisabled && x.Id == id)
                                                  .Join(_context.ViewNhanVien, kiemtra => kiemtra.NguoiTao, nhanvien => nhanvien.IdNv, (kiemtra, nhanvien) => new { kiemtra, nhanvien })
                                                  .Select(x => new IBaiKiemTra_TrucTuyen_Group
                                                  {
                                                      Id = x.kiemtra.Id,
                                                      TenBaiKiemTra = "KIỂM TRA " + x.kiemtra.TenBaiKiemTra.ToUpper(),
                                                      SoLuongDe = x.kiemtra.SoLuongDe,
                                                      CauBiet = x.kiemtra.CauBiet,
                                                      CauHieu = x.kiemtra.CauHieu,
                                                      CauVanDungThap = x.kiemtra.CauVanDungThap,
                                                      CauVanDungCao = x.kiemtra.CauVanDungCao,
                                                      NamHoc = x.kiemtra.NamHoc.ToUpper(),
                                                      IsCustom = x.kiemtra.IsCustom,
                                                      Lop = x.kiemtra.Lop,
                                                      TenNguoiTao = x.nhanvien.HoTen,
                                                      NguoiTao = x.kiemtra.NguoiTao,
                                                      HocKy = x.kiemtra.HocKy,
                                                      IdMonHoc = x.kiemtra.IdMonHoc,
                                                      TrangThai = x.kiemtra.TrangThai,
                                                      ThoiGianLamBai = x.kiemtra.ThoiGianLamBai,
                                                      NgayTao = x.kiemtra.NgayTao,
                                                      GioThi = x.kiemtra.GioThi,
                                                      Password = x.kiemtra.Password,
                                                      NgayThi = x.kiemtra.NgayThi
                                                  }).FirstOrDefault();
                return Utilities._responseData(1, "", _data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region XÓA BÀI KIỂM TRA
        [Route("ListBaiKiemTraOnline_Delete")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> BaiKiemTraOnline_Delete(long id)
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _item = _context.BaiKiemTra_TrucTuyen_Group.Where(x => x.Id == id && !x.IsDisabled).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu cần xóa, vui lòng tải lại danh sách!!", null);

                _item.IsDisabled = true;

                _context.SaveChanges();

                return Utilities._responseData(1, "", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Xóa thất bại, vui lòng kiểm tra lại! Lỗi: "+ex.Message, null);
            }
        }
        #endregion

        #region ACTIVE BÀI KIỂM TRA ONLINE
        [Route("ListBaiKiemTraOnline_Active")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> BaiKiemTraOnline_Active(long id)
        {
            //string Token = Utilities._GetHeader(Request);
            //UserLogin loginData = _account._GetInfoUser(Token);

            //if (loginData == null)
            //    return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _item = _context.BaiKiemTra_TrucTuyen_Group.Where(x => x.Id == id && !x.IsDisabled).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu cần xóa, vui lòng tải lại danh sách!!", null);

                _item.isExam = true;

                _context.SaveChanges();

                return Utilities._responseData(1, "", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Xóa thất bại, vui lòng kiểm tra lại! Lỗi: " + ex.Message, null);
            }
        }
        #endregion

        [Route("_Print")]
        //[Authorize(Roles = "10012")]
        [HttpGet]
        public async Task<IActionResult> _Print(long id)
        {
            var _item = _context.BaiKiemTra.Join(_context.BaiKiemTra_Group, baikiemtra => baikiemtra.IdGroup, group => group.Id, (baikiemtra, group) => new { baikiemtra, group })
                                            .Where(group => group.group.Id == id)
                                            .Select(x => new IBaiKiemTra
                                            {
                                                Id = x.baikiemtra.Id,
                                                IdGroup = x.group.Id,
                                                MaDe = x.baikiemtra.MaDe,
                                                DanhSachCauHoi = _context.BaiKiemTra_ChiTiet.Where(chitiet => chitiet.IdBaiKiemTra == x.baikiemtra.Id)
                                                                                            .Join(_context.Question, chitiet => chitiet.IdCauHoi, cauhoi => cauhoi.Id, (chitiet, cauhoi) => new { chitiet, cauhoi })
                                                                                            .Select(x => new IBaiKiemTra_ChiTiet
                                                                                            {
                                                                                                Id = x.chitiet.Id,
                                                                                                TieuDe = x.cauhoi.Title,
                                                                                                CauA = x.cauhoi.OptionA,
                                                                                                CauB = x.cauhoi.OptionB,
                                                                                                CauC = x.cauhoi.OptionC,
                                                                                                CauD = x.cauhoi.OptionD,
                                                                                                CauDung = x.cauhoi.CorrectOption,                                                                                                
                                                                                            }).ToList()
                                            }).ToList();
            var _data = _context.BaiKiemTra_Group.Where(x => x.Id == id).Join(_context.MonHoc, kiemtra => kiemtra.IdMonHoc, monhoc => monhoc.Id, (kiemtra, monhoc) => new {kiemtra, monhoc})
                                                .Select(x => new IBaiKiemTra_Print
                                                {
                                                    Id = x.kiemtra.Id,
                                                    TenBaiKiemTra = x.kiemtra.TenBaiKiemTra,
                                                    ThoiGianLamBai = x.kiemtra.ThoiGianLamBai,
                                                    NamHoc = x.kiemtra.NamHoc,
                                                    MonHoc = x.monhoc.TenMonHoc,
                                                    HocKy = x.kiemtra.HocKy,
                                                    Lop = x.kiemtra.Lop,
                                                    DanhSachBaiKiemTra = _item
                                                }).FirstOrDefault();
            return await _generatePdf.GetPdf("Views/Print/index.cshtml", _data);
        }
        /* -------------------- CÁC HÀM HỖ TRỢ -------------------- */

        private List<int> layMaDeThi(int soLuongDe)
        {
            var rnd = new Random();
            var randomNumbers = Enumerable.Range(100, 999).OrderBy(x => rnd.Next()).Take(soLuongDe).ToList();
            return randomNumbers;
        }

        private void themMoiChiTietBaiKiemTra(long id, List<Question> danhSach, int cauBiet, int cauHieu, int cauVanDungThap, int cauVanDungCao, int maDe)
        {
            var danhSachCauHoiBiet = danhSach.Where(x => x.Level == 1).OrderBy(r => Guid.NewGuid()).Take(cauBiet).Select(x => x.Id).ToList();
            var danhSachCauHoiHieu = danhSach.Where(x => x.Level == 2).OrderBy(r => Guid.NewGuid()).Take(cauHieu).Select(x => x.Id).ToList();
            var danhSachCauHoiVanDungThap = danhSach.Where(x => x.Level == 3).OrderBy(r => Guid.NewGuid()).Take(cauVanDungThap).Select(x => x.Id).ToList();
            var danhSachCauHoiVanDungCao = danhSach.Where(x => x.Level == 3).OrderBy(r => Guid.NewGuid()).Take(cauVanDungCao).Select(x => x.Id).ToList();
            var finalList = danhSachCauHoiBiet.Union(danhSachCauHoiHieu).Union(danhSachCauHoiVanDungThap).Union(danhSachCauHoiVanDungCao).ToList();
            BaiKiemTra _item = new BaiKiemTra();
            _item.IdGroup = id;
            _item.MaDe = maDe.ToString();
            _context.BaiKiemTra.Add(_item);
            _context.SaveChanges();

            long baiKiemTraId = _item.Id;
            foreach (var item in finalList)
            {
                BaiKiemTra_ChiTiet _baiKiemTraChiTiet = new BaiKiemTra_ChiTiet();
                _baiKiemTraChiTiet.IdBaiKiemTra = baiKiemTraId;
                _baiKiemTraChiTiet.IdCauHoi = item;
                _context.BaiKiemTra_ChiTiet.Add(_baiKiemTraChiTiet);
                _context.SaveChanges();
            }

        }

        /*THƯ VIỆN CHUẨN HÓA FILE WORD*/
        //private void convertWordToHtml()
        //{
        //    Regex rgx = new Regex("<p>|</p>");
        //    var converter = new DocumentConverter();
        //    var result = converter.ConvertToHtml("DuLieu/SAMPLE.docx");
        //    var html = result.Value; // The generated HTML
        //    var warnings = result.Warnings; // Any warnings during conversion


        //    string[] levelRange = html.Split("<p>&lt;level&gt;</p>"); // Phân cấp câu hỏi
        //    List<IQuestion> _listQuestion = new List<IQuestion>();
        //    foreach(var item in levelRange)
        //    {                
        //        IQuestion _data = splitString(item); // Tách câu hỏi ra 
        //        _listQuestion.Add(_data);
        //    }    
        //}

        //private IQuestion splitString(string content)
        //{

        //    IQuestion _question = new IQuestion();            
        //    var listConvertStringLine = content.Split("</p>").Select(x => x.Replace("<p>", string.Empty)).ToArray(); ; // Chia từng dòng thành các mảng string
        //    listConvertStringLine = listConvertStringLine.Where(x => !string.IsNullOrEmpty(x)).ToArray(); // Xóa những mảng rỗng
        //    //int iItems = System.Convert.ToInt32(listConvertStringLine[0]);
        //    List<IQuestion> _lstQuestion = new List<IQuestion>();

        //    for (int i = 0; i < listConvertStringLine.Length; i+=6)
        //    {
        //        IQuestion _temp = new IQuestion();
        //        _temp.IdBaiHoc = 0;
        //        _temp.IdChuong = 0;
        //        _temp.Title = listConvertStringLine[i];
        //        _temp.OptionA = listConvertStringLine[i + 1].Replace("A. ", "");
        //        _temp.OptionB = listConvertStringLine[i + 2].Replace("B. ", "");
        //        _temp.OptionC = listConvertStringLine[i + 3].Replace("C. ", "");
        //        _temp.OptionD = listConvertStringLine[i + 4].Replace("D. ", "");
        //        _temp.CorrectOption = convertCorrectOption(listConvertStringLine[i + 5]);
        //        _temp.CreateDate = DateTime.Now;
        //        _temp.CreateBy = 1;
        //        _temp.Level = 1;
        //        _lstQuestion.Add(_temp);
        //    }    
        //    foreach (var item in listConvertStringLine)
        //    {

        //    }    
        //    return _question;
        //}
        //private byte convertCorrectOption(string correctOption)
        //{
        //    switch(correctOption)
        //    {
        //        case "A":
        //            return 1;
        //            break;
        //        case "B":
        //            return 2;
        //            break;
        //        case "C":
        //            return 3;
        //            break;
        //        case "D":
        //            return 4;
        //            break;
        //        default:
        //            return 0;
        //            break;
        //    }
        //}

    }

}
