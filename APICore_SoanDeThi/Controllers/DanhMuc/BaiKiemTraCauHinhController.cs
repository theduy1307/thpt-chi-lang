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
    /* -----------------CONTROLLER CHO HẠN MỨC CHIẾT KHẤU----------------
   * 
   * MENU:
   *  Hợp đồng > Danh mục > Hạn mức chiết khấu
   * 
   * DATABASE: nfc_dbdev
   * 
   * 
   * 
   * Tham chiếu DB:
   *   HD_HanMucChietKhau
   *   
   * #region danh sách hạn mức chiết khấu
   * #region thêm mới hạn mức chiết khấu
   * #region cập nhật hạn mức chiết khấu
   * #region chi tiết hạn mức chiết khấu
   * #region xóa hạn mức chiết khấu
   *   
   */
    [Route("api/BaiKiemTraCauHinh")]
    [EnableCors("ExamPolicy")]
    public class BaiKiemTraCauHinhConTroller : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;
        readonly IGeneratePdf _generatePdf;

        public BaiKiemTraCauHinhConTroller(IHostingEnvironment hostingEnvironment, IGeneratePdf generatePdf)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
            _generatePdf = generatePdf;
        }

        #region DANH SÁCH BÀI KIỂM TRA
        [Route("BaiKiemTraCauHinh_List")]
        //[Authorize(Roles = "")]
        [HttpPost]
        public BaseModel<object> BaiKiemTraCauHinh_List([FromBody] ITableState _tableState)
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
                string _keywordSearch = "";
                bool _orderBy_ASC = false;

                Func<IBaiKiemTra_Group, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<IBaiKiemTra_Group, object>> _sortableFields = new Dictionary<string, Func<IBaiKiemTra_Group, object>>
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
                var _data = _context.BaiKiemTra_Group.Where(x => !x.IsDisabled && x.IsCustom)
                                                  .Join(_context.ViewNhanVien, kiemtra => kiemtra.NguoiTao, nhanvien => nhanvien.IdNv, (kiemtra, nhanvien) => new { kiemtra, nhanvien })
                                                  .Select(x => new IBaiKiemTra_Group
                                                  {
                                                      Id = x.kiemtra.Id,
                                                      TenBaiKiemTra = "KIỂM TRA "+x.kiemtra.TenBaiKiemTra.ToUpper(),
                                                      SoLuongDe = x.kiemtra.SoLuongDe,
                                                      CauBiet = x.kiemtra.CauBiet,
                                                      CauHieu = x.kiemtra.CauHieu,
                                                      CauVanDungThap = x.kiemtra.CauVanDungThap,
                                                      CauVanDungCao = x.kiemtra.CauVanDungCao,
                                                      NamHoc = x.kiemtra.NamHoc.ToLower(),
                                                      Lop = x.kiemtra.Lop,
                                                      TenNguoiTao = x.nhanvien.HoTen,
                                                      TrangThai = x.kiemtra.TrangThai
                                                  });


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.TenBaiKiemTra.ToLower().Contains(_keywordSearch)

                   );
                    IQueryable<IBaiKiemTra_Group> data = _data;
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

                List<IBaiKiemTra_Group> listData = new List<IBaiKiemTra_Group>();
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
        [Route("_Insert")]
        //[Authorize(Roles = "10012")]
        [HttpPost]
        public BaseModel<object> BaiKiemTraCauHinh_Insert([FromBody] IBaiKiemTraCauHinh_Group data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            List<string> danhSachMaDeThi = layMaDeThi(data.SoLuongDe);
            List<Question> danhSachCauHoi = new List<Question>();
            try
            {
                if (string.IsNullOrEmpty(data.TenBaiKiemTra))
                    return Utilities._responseData(0, "Vui lòng nhập số hợp đồng mua!!", null);

                _context.Database.BeginTransaction();


                BaiKiemTra_Group _item = new BaiKiemTra_Group();

                _item.TenBaiKiemTra = string.IsNullOrEmpty(data.TenBaiKiemTra) ? "" : data.TenBaiKiemTra.ToString().Trim();
                _item.SoLuongDe = data.SoLuongDe;
                _item.CauBiet = data.CauBiet;
                _item.CauHieu = data.CauHieu;
                _item.CauVanDungThap = data.CauVanDungThap;
                _item.CauVanDungCao = data.CauVanDungCao;
                _item.NamHoc = data.NamHoc;
                _item.IdMonHoc = loginData.coCauId;
                _item.ThoiGianLamBai = data.ThoiGianLamBai;
                _item.HocKy = data.HocKy;
                _item.Lop = data.Lop;
                _item.NguoiTao = 1;
                _item.NgayTao = DateTime.Now;
                _item.IsDisabled = false;
                _item.IsCustom = true;
                _item.TrangThai = 2;
                _context.BaiKiemTra_Group.Add(_item);
                _context.SaveChanges();

                //Thêm danh sách câu hỏi vào database
                foreach(var item in data.DanhSachCauHoi)
                {
                    Question _cauHoi = new Question();
                    _cauHoi.Title = string.IsNullOrEmpty(item.Title) ? "" : item.Title.ToString().Trim();
                    _cauHoi.OptionA = string.IsNullOrEmpty(item.OptionA) ? "" : item.OptionA.ToString().Trim();
                    _cauHoi.OptionB = string.IsNullOrEmpty(item.OptionB) ? "" : item.OptionB.ToString().Trim();
                    _cauHoi.OptionC = string.IsNullOrEmpty(item.OptionC) ? "" : item.OptionC.ToString().Trim();
                    _cauHoi.OptionD = string.IsNullOrEmpty(item.OptionD) ? "" : item.OptionD.ToString().Trim();
                    _cauHoi.CorrectOption = item.CorrectOption;
                    _cauHoi.IdBaiHoc = item.IdBaiHoc;
                    _cauHoi.Level = item.Level;
                    _cauHoi.CreateDate = DateTime.Now;
                    _cauHoi.CreateBy = item.CreateBy;
                    _cauHoi.ModifyDate = DateTime.Now;
                    _cauHoi.CreateBy = item.CreateBy;
                    _cauHoi.ModifyBy = item.ModifyBy;
                    _cauHoi.IsDisabled = false;
                    _cauHoi.IsCustom = true;
                    _cauHoi.IdBaiKiemTra_Group = _item.Id;
                    _context.Question.Add(_cauHoi);
                    _context.SaveChanges();
                    danhSachCauHoi.Add(_cauHoi);
                } 
                    

                
                //lấy Id của BaiKiemTra_Group
                data.Id = _item.Id;

                //tạo đề thi theo số lượng đề
                for (int i = 0; i < data.SoLuongDe; i++)
                {
                    themMoiChiTietBaiKiemTra(data.Id, danhSachCauHoi, danhSachMaDeThi[i]);
                }
                

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Thêm mới bài kiểm tra thành công", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region LƯU TẠM BÀI KIỂM TRA
        [Route("BaiKiemTraCauHinh_SaveTemp")]
        //[Authorize(Roles = "10014")]
        [HttpPost]
        public BaseModel<object> BaiKiemTraCauHinh_SaveTemp([FromBody] IBaiKiemTraCauHinh_Group data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                if(data.DanhSachCauHoi.Count == 0)
                {
                    return Utilities._responseData(0, "Chưa có danh sách câu hỏi", null);
                }
                _context.Database.BeginTransaction();
                BaiKiemTra_Group _item = new BaiKiemTra_Group();
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
                _item.NguoiTao = 1;
                _item.NgayTao = DateTime.Now;
                _item.IsDisabled = false;
                _item.IsCustom = data.IsCustom;
                _item.TrangThai = 1;
                _context.BaiKiemTra_Group.Add(_item);
                _context.SaveChanges();

                //Thêm câu hỏi vào database
                foreach(var item in data.DanhSachCauHoi) {
                    Question _cauHoi = new Question();
                    _cauHoi.Title = string.IsNullOrEmpty(item.Title) ? "" : item.Title.ToString().Trim();
                    _cauHoi.OptionA = string.IsNullOrEmpty(item.OptionA) ? "" : item.OptionA.ToString().Trim();
                    _cauHoi.OptionB = string.IsNullOrEmpty(item.OptionB) ? "" : item.OptionB.ToString().Trim();
                    _cauHoi.OptionC = string.IsNullOrEmpty(item.OptionC) ? "" : item.OptionC.ToString().Trim();
                    _cauHoi.OptionD = string.IsNullOrEmpty(item.OptionD) ? "" : item.OptionD.ToString().Trim();
                    _cauHoi.CorrectOption = item.CorrectOption;
                    _cauHoi.IdBaiHoc = item.IdBaiHoc;
                    _cauHoi.Level = item.Level;
                    _cauHoi.CreateDate = DateTime.Now;
                    _cauHoi.CreateBy = item.CreateBy;
                    _cauHoi.ModifyDate = DateTime.Now;
                    _cauHoi.CreateBy = item.CreateBy;
                    _cauHoi.ModifyBy = item.ModifyBy;
                    _cauHoi.IsDisabled = false;
                    _cauHoi.IsCustom = true;
                    _cauHoi.IdBaiKiemTra_Group = _item.Id;
                    _context.Question.Add(_cauHoi);
                    _context.SaveChanges();
                };

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Lưu bài kiểm tra thành công", _item);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region LƯU TẠM BÀI KIỂM TRA
        [Route("BaiKiemTraCauHinh_EditSaveTemporary")]
        //[Authorize(Roles = "10014")]
        [HttpPost]
        public BaseModel<object> BaiKiemTraCauHinh_EditSaveTemporary([FromBody] IBaiKiemTraCauHinh_Group data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                if (data.DanhSachCauHoi.Count == 0)
                {
                    return Utilities._responseData(0, "Chưa có danh sách câu hỏi", null);
                }
                _context.Database.BeginTransaction();
                var _item = _context.BaiKiemTra_Group.Where(x => x.Id == data.Id).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy bài kiểm tra cần cập nhật, vui lòng tải lại danh sách!!", null);

                _item.TenBaiKiemTra = string.IsNullOrEmpty(data.TenBaiKiemTra) ? "" : data.TenBaiKiemTra.ToString().Trim();
                _item.SoLuongDe = data.SoLuongDe;
                _item.CauBiet = data.CauBiet;
                _item.CauHieu = data.CauHieu;
                _item.CauVanDungThap = data.CauVanDungThap;
                _item.CauVanDungCao = data.CauVanDungCao;
                _item.NamHoc = data.NamHoc;
                _item.IdMonHoc = loginData.coCauId;
                _item.ThoiGianLamBai = data.ThoiGianLamBai;
                _item.HocKy = data.HocKy;
                _item.Lop = data.Lop;
                _item.NguoiSua = loginData.id;
                _item.NgayTao = DateTime.Now;
                _item.IsDisabled = false;
                _item.IsCustom = true;
                _item.TrangThai = data.TrangThai;
                _context.SaveChanges();

                //Thêm câu hỏi vào database
                foreach (var item in data.DanhSachCauHoi)
                {
                    if(item.Id != 0)
                    {
                        var _question = _context.Question.Where(x => x.Id == item.Id).FirstOrDefault();
                        _question.Title = string.IsNullOrEmpty(item.Title) ? "" : item.Title.ToString().Trim();
                        _question.OptionA = string.IsNullOrEmpty(item.OptionA) ? "" : item.OptionA.ToString().Trim();
                        _question.OptionB = string.IsNullOrEmpty(item.OptionB) ? "" : item.OptionB.ToString().Trim();
                        _question.OptionC = string.IsNullOrEmpty(item.OptionC) ? "" : item.OptionC.ToString().Trim();
                        _question.OptionD = string.IsNullOrEmpty(item.OptionD) ? "" : item.OptionD.ToString().Trim();
                        _question.CorrectOption = item.CorrectOption;
                        _question.IdBaiHoc = item.IdBaiHoc;
                        _question.Level = item.Level;
                        _question.CreateDate = DateTime.Now;
                        _question.CreateBy = item.CreateBy;
                        _question.ModifyDate = DateTime.Now;
                        _question.CreateBy = item.CreateBy;
                        _question.ModifyBy = item.ModifyBy;
                        _question.IsDisabled = false;
                        _question.IsCustom = true;
                        _question.IdBaiKiemTra_Group = _item.Id;
                        _context.SaveChanges();
                    }
                    else
                    {
                        Question _question = new Question();
                        _question.Title = string.IsNullOrEmpty(item.Title) ? "" : item.Title.ToString().Trim();
                        _question.OptionA = string.IsNullOrEmpty(item.OptionA) ? "" : item.OptionA.ToString().Trim();
                        _question.OptionB = string.IsNullOrEmpty(item.OptionB) ? "" : item.OptionB.ToString().Trim();
                        _question.OptionC = string.IsNullOrEmpty(item.OptionC) ? "" : item.OptionC.ToString().Trim();
                        _question.OptionD = string.IsNullOrEmpty(item.OptionD) ? "" : item.OptionD.ToString().Trim();
                        _question.CorrectOption = item.CorrectOption;
                        _question.IdBaiHoc = item.IdBaiHoc;
                        _question.Level = item.Level;
                        _question.CreateDate = DateTime.Now;
                        _question.CreateBy = item.CreateBy;
                        _question.ModifyDate = DateTime.Now;
                        _question.CreateBy = item.CreateBy;
                        _question.ModifyBy = item.ModifyBy;
                        _question.IsDisabled = false;
                        _question.IsCustom = true;
                        _question.IdBaiKiemTra_Group = _item.Id;
                        _context.Question.Add(_question);
                        _context.SaveChanges();
                    }                    
                };

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Lưu bài kiểm tra thành công", _item);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy bài kiểm tra thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion



        #region LẤY CHI TIẾT BÀI KIỂM TRA
        [Route("BaiKiemTraCauHinh_Detail")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> BaiKiemTraCauHinh_Detail (long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);
            try
            {
                
                _context.Database.BeginTransaction();
                var _item = _context.BaiKiemTra_Group.Where(x => x.Id == id && !x.IsDisabled)
                                                     .Join(_context.MonHoc, exam => exam.IdMonHoc, subject => subject.Id, (exam, subject) =>  new { exam, subject})
                                                     .Select(x => new IBaiKiemTraCauHinh_Group 
                                                     {
                                                        Id = x.exam.Id,
                                                        TenBaiKiemTra = x.exam.TenBaiKiemTra,
                                                        SoLuongDe = x.exam.SoLuongDe,
                                                        CauBiet = x.exam.CauBiet,
                                                        CauHieu = x.exam.CauHieu,
                                                        CauVanDungThap = x.exam.CauVanDungThap,
                                                        CauVanDungCao = x.exam.CauVanDungCao,
                                                        NamHoc = x.exam.NamHoc,
                                                        IdMonHoc = x.exam.IdMonHoc,
                                                        ThoiGianLamBai = x.exam.ThoiGianLamBai,
                                                        HocKy = x.exam.HocKy,
                                                        Lop = x.exam.Lop,
                                                        NguoiTao = x.exam.NguoiTao,
                                                        NgayTao = x.exam.NgayTao,
                                                        IsDisabled = x.exam.IsDisabled,
                                                        IsCustom = x.exam.IsCustom,
                                                        TrangThai = x.exam.TrangThai,
                                                        DanhSachCauHoi = _context.Question.Where(x=>x.IdBaiKiemTra_Group == id && x.IsCustom && !x.IsDisabled)
                                                                                          .OrderBy(x=>x.Id)
                                                                                          .Select(x => new IQuestion
                                                                                          {
                                                                                              Id = x.Id,
                                                                                              Title = x.Title,
                                                                                              OptionA = x.OptionA,
                                                                                              OptionB = x.OptionB,
                                                                                              OptionC = x.OptionC,
                                                                                              OptionD = x.OptionD,
                                                                                              CorrectOption = x.CorrectOption,
                                                                                              Level = x.Level
                                                                                          }).ToList()
                                                    }).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu, vui lòng tải lại!!", null);

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", _item);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
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
            var _data = _context.BaiKiemTra_Group.Where(x => x.Id == id).Join(_context.MonHoc, kiemtra => kiemtra.IdMonHoc, monhoc => monhoc.Id, (kiemtra, monhoc) => new { kiemtra, monhoc })
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

        private List<string> layMaDeThi(int soLuongDe)
        {
            var rnd = new Random(); 
            var randomNumbers = Enumerable.Range(0, 999).OrderBy(x => rnd.Next()).Take(soLuongDe).ToList();
            List<string> danhSachMaDeThi = new List<string>();
            foreach(var item in randomNumbers)
            {
                string number;
                if(item < 10)
                {
                    number = "00" + item.ToString();
                } else if (item >=10 && item <100)
                {
                    number = "0" + item.ToString();
                } else
                {
                    number = item.ToString();
                }
                danhSachMaDeThi.Add(number);
            }
            return danhSachMaDeThi;
        }

        private void themMoiChiTietBaiKiemTra(long id, List<Question> danhSach, string maDe)
        {
                var danhSachCauBiet = Shuffle(danhSach.Where(x => x.Level == 1).Select(x=>x.Id).ToList());
                var danhSachCauHieu = Shuffle(danhSach.Where(x => x.Level == 2).Select(x => x.Id).ToList());
                var danhSachCauVanDungThap = Shuffle(danhSach.Where(x => x.Level == 3).Select(x => x.Id).ToList());
                var danhSachCauVanDungCao = Shuffle(danhSach.Where(x => x.Level == 4).Select(x => x.Id).ToList());
                var finalList = danhSachCauBiet.Union(danhSachCauHieu).Union(danhSachCauVanDungThap).Union(danhSachCauVanDungCao).ToList();

                BaiKiemTra _item = new BaiKiemTra();
                _item.IdGroup = id;
                _item.MaDe = maDe;
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
        private List<long> Shuffle(List<long> list)
        {
            var rng = new Random();
            var newList = list.OrderBy(item => rng.Next()).ToList();
            return newList;
        }
    }

}
