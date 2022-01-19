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

namespace APICore_SoanDeThi.Controllers.DanhMuc
{
    [Route("api/BaiKiemTraOnline")]
    [EnableCors("ExamPolicy")]
    public class BaiKiemTraOnlineController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;
        readonly IGeneratePdf _generatePdf;

        public BaiKiemTraOnlineController(IHostingEnvironment hostingEnvironment, IGeneratePdf generatePdf)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
            _generatePdf = generatePdf;
        }
        #region DANH SÁCH BÀI KIỂM TRA
        [Route("BaiKiemTraOnline_List")]
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
                var _data = _context.BaiKiemTra_TrucTuyen_Group.Where(x => !x.IsDisabled && !x.IsCustom && x.isExam == true)
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
                                                      TrangThai_BaiKiemTraOnline = 1
                                                  }) ;


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.TenBaiKiemTra.ToLower().Contains(_keywordSearch)

                   );
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

        #region LẤY CHI TIẾT BÀI KIỂM TRA 
        [Route("BaiKiemTraOnline_Detail")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> BaiKiemTraTrucTuyen_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                var detail_BaiKiemTra = _context.BaiKiemTra_TrucTuyen_Group.Where(x => x.Id == id).FirstOrDefault();
                var _pickDe = _context.BaiKiemTra_TrucTuyen.Where(x => x.IdGroup == id)
                                                            .Select(x => new IBaiKiemTra_TrucTuyen
                                                            {
                                                                Id = x.Id,
                                                                MaDe = x.MaDe,
                                                                IdGroup = x.IdGroup
                                                            }).ToList();
                Random r = new Random();
                int a = r.Next(0, _pickDe.Count());
                var _MaDe = _pickDe[a].MaDe;
                var AA = _context.BaiKiemTra_TrucTuyen_HocSinh.Where(x => x.IdHocSinh == loginData.id).ToList();
                var checkExist = AA.Join(_pickDe,
                    a => a.IdBaiKiemTraOnline,
                    b => b.Id,
                    (a, b) => new { a, b })
                    .Select(k => new IBaiKiemTra_TrucTuyen
                    {
                        Id = k.b.Id,
                        MaDe = k.b.MaDe,
                        IdGroup = k.b.IdGroup,
                    }).ToList();


                if (checkExist.Count() == 0)
                {
                    // clone ra 2 bảng BaiKiemTra_TrucTuyen_HocSinh và BaiKiemTra_TrucTuyen_HocSinh_ChiTiet
                    BaiKiemTra_TrucTuyen_HocSinh hocsinh = new BaiKiemTra_TrucTuyen_HocSinh();
                    hocsinh.IdHocSinh = loginData.id;
                    hocsinh.IdBaiKiemTraOnline = _pickDe[a].Id;
                    hocsinh.TrangThai = 2;
                    hocsinh.ThoiGianLamBaiConLai = detail_BaiKiemTra.ThoiGianLamBai;
                    _context.BaiKiemTra_TrucTuyen_HocSinh.Add(hocsinh);
                    _context.SaveChanges();

                    var listQuestion = _context.BaiKiemTra_TrucTuyen_ChiTiet.Where(x => x.IdBaiKiemTra == _pickDe[a].Id).Select(x => x.IdCauHoi).ToList();
                    foreach (var vucan in listQuestion)
                    {
                        BaiKiemTra_TrucTuyen_HocSinh_ChiTiet hocsinh_chitiet = new BaiKiemTra_TrucTuyen_HocSinh_ChiTiet();
                        hocsinh_chitiet.IdBaiKiemTraHocSinh = hocsinh.Id;
                        hocsinh_chitiet.IdQueston = vucan;
                        _context.BaiKiemTra_TrucTuyen_HocSinh_ChiTiet.Add(hocsinh_chitiet);
                        _context.SaveChanges();
                    }

                    var _check = _context.BaiKiemTra_TrucTuyen_HocSinh_ChiTiet.Where(x => x.IdBaiKiemTraHocSinh == hocsinh.Id)
                                                                               .Join(_context.Question,
                                                                               a => a.IdQueston,
                                                                               b => b.Id,
                                                                               (a, b) => new { a, b })
                                                                               .Select(k => new IBaiKiemTra_TrucTuyen_HocSinh_ChiTiet
                                                                               {
                                                                                   Id = k.a.Id,
                                                                                   IdQueston = k.b.Id,
                                                                                   TieuDe = k.b.Title,
                                                                                   CauA = k.b.OptionA,
                                                                                   CauB = k.b.OptionB,
                                                                                   CauC = k.b.OptionC,
                                                                                   CauD = k.b.OptionD,
                                                                               }).ToList();

                    var time = _context.BaiKiemTra_TrucTuyen_HocSinh.Where(x => x.Id == hocsinh.Id).FirstOrDefault();
                    if (_check == null)
                        return Utilities._responseData(0, "Không tìm thấy dữ liệu, vui lòng tải lại!!", null);

                    return Utilities._responseData(1, "", new { _check, _MaDe, tenBaiKiemTra = detail_BaiKiemTra.TenBaiKiemTra, thoiGianLamBai = time.ThoiGianLamBaiConLai });
                }
                else
                {
                    var asd = checkExist.Select(x => x.Id).FirstOrDefault();
                    var balo = _context.BaiKiemTra_TrucTuyen_HocSinh.Where(x => x.IdBaiKiemTraOnline == asd && x.IdHocSinh == loginData.id).FirstOrDefault();
                    var _check = _context.BaiKiemTra_TrucTuyen_HocSinh_ChiTiet.Where(x => x.IdBaiKiemTraHocSinh == balo.Id)
                                                                               .Join(_context.Question,
                                                                               a => a.IdQueston,
                                                                               b => b.Id,
                                                                               (a, b) => new { a, b })
                                                                               .Select(k => new IBaiKiemTra_TrucTuyen_HocSinh_ChiTiet
                                                                               {
                                                                                   Id = k.a.Id,
                                                                                   IdQueston = k.b.Id,
                                                                                   TieuDe = k.b.Title,
                                                                                   CauA = k.b.OptionA,
                                                                                   CauB = k.b.OptionB,
                                                                                   CauC = k.b.OptionC,
                                                                                   CauD = k.b.OptionD,
                                                                                   choosen = k.a.choosen,
                                                                               }).ToList();

                    
                    return Utilities._responseData(1, "", new { _check, _MaDe, tenBaiKiemTra = detail_BaiKiemTra.TenBaiKiemTra, thoiGianLamBai = balo.ThoiGianLamBaiConLai });
                }
                
                
                
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region CHECK PASSWORD 
        [Route("BaiKiemTraOnline_CheckPassword")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> BaiKiemTraOnline_CheckPassword(long id, string pass)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                if (id == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu, vui lòng tải lại!!", null);

                var _item = _context.BaiKiemTra_TrucTuyen_Group.Where(x => x.Id == id && x.Password == pass).FirstOrDefault();
                if (_item != null)
                {
                    return Utilities._responseData(1, "", _item);
                }
                else
                {
                    return Utilities._responseData(0, "Sai password", _item);
                }
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region CẬP NHẬT CÂU HỎI
        [Route("BaiKiemTraOnline_Update")]
        //[Authorize(Roles = "10013")]
        [HttpGet]
        public BaseModel<object> BaiKiemTraOnline_Update(long id, long IdQueston, string eventValue,float time)
        {

            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                if (id == null)
                    return Utilities._responseData(0, "Vui lòng chọn số phiếu!!", null);

                var _item = _context.BaiKiemTra_TrucTuyen_HocSinh_ChiTiet.Where(x => x.Id == id).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu cần cập nhật, vui lòng tải lại danh sách!!", null);

                _item.choosen = Int32.Parse(eventValue);

                var temp = _context.BaiKiemTra_TrucTuyen_HocSinh.Where(k => k.Id == _item.IdBaiKiemTraHocSinh).FirstOrDefault();
                temp.ThoiGianLamBaiConLai = (time/1000)/60;
                _context.SaveChanges();

                return Utilities._responseData(1, "", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Cập nhật thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion
    }
}
