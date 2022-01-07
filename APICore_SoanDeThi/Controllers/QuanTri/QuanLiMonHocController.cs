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
    [Route("api/MonHoc")]
    [EnableCors("ExamPolicy")]
    public class QuanLiMonHocController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;
        readonly IGeneratePdf _generatePdf;

        public QuanLiMonHocController(IHostingEnvironment hostingEnvironment, IGeneratePdf generatePdf)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
            _generatePdf = generatePdf;
        }

        #region DANH SÁCH MÔN HỌC
        [Route("MonHoc_List")]
        //[Authorize(Roles = "")]
        [HttpPost]
        public BaseModel<object> MonHoc_List([FromBody] ITableState _tableState)
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

                Func<IMonHoc, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<IMonHoc, object>> _sortableFields = new Dictionary<string, Func<IMonHoc, object>>
                {
                    { "Title", x => x.MaMonHoc },              
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
                var ListQuestion = _context.ChuongMonHoc.Where(p => p.IdMonHoc == 2).Join(_context.BaiHoc, p => p.Id, s => s.IdChuong, (p, s) => new { p = p, s = s })
                                                                                           .Join(_context.Question, s => s.s.Id, q => q.IdBaiHoc, (s, q) => new { q = q, s = s })
                                                                                           .Where(q => !q.q.IsDisabled && !q.q.IsCustom)
                                                                                           .Select(q => new { 
                                                                                                IdMonHoc = q.s.p.IdMonHoc,
                                                                                                
                                                                                           }).ToList();
                var _data = _context.MonHoc.Where(x => !x.IsDisabled)
                                                  .Select(x => new IMonHoc
                                                  {
                                                      Id = x.Id,
                                                      MaMonHoc = x.MaMonHoc,
                                                      TenMonHoc = x.TenMonHoc,
                                                      QuestionCount = _context.ChuongMonHoc.Where(p => p.IdMonHoc == x.Id).Join(_context.BaiHoc, p => p.Id, s => s.IdChuong, (p, s) => new { p = p, s = s })
                                                                                           .Join(_context.Question, s => s.s.Id, q => q.IdBaiHoc, (s, q) => new { q = q, s = s })
                                                                                           .Where(q => !q.q.IsDisabled && !q.q.IsCustom)
                                                                                           .Select(q => q.q.Id).ToList(),
                                                      ExamCount = _context.BaiKiemTra_Group.Where(e => e.IdMonHoc == x.Id).Select(e=>e.Id).ToList(),
                                                      DanhSachGiaoVien = _context.ViewNhanVien.Where(emp => emp.Cocauid == x.Id && emp.Disable == 0)
                                                                                              .Select(emp => new GiaoVien
                                                                                              {
                                                                                                  IdNv = emp.IdNv,
                                                                                                  MaNv = emp.Manv,
                                                                                                  HoLot = emp.Holot,
                                                                                                  Ten = emp.Ten,
                                                                                                  Phai = emp.Phai,
                                                                                                  BoMon = x.TenMonHoc
                                                                                              }).ToList()
                                                  }).ToList();


                //if (!string.IsNullOrEmpty(_tableState.searchTerm))
                //{
                //    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                //    _data = _data.Where(x =>
                //          x.MaMonHoc.ToLower().Contains(_keywordSearch)

                //   );
                //    IQueryable<IMonHoc> data = _data;
                //}

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

                //List<IMonHoc> listData = new List<IMonHoc>();
                //if (_orderBy_ASC)
                //{
                //    listData = _data
                //        .OrderBy(_orderByExpression)
                //        .Skip((_tableState.paginator.page - 1) * _tableState.paginator.PageSize)
                //        .Take(_tableState.paginator.PageSize)
                //        .ToList();
                //}
                //else
                //{
                //    listData = _data
                //        .OrderByDescending(_orderByExpression)
                //        .Skip((_tableState.paginator.page - 1) * _tableState.paginator.PageSize)
                //        .Take(_tableState.paginator.PageSize)
                //        .ToList();
                //}

                _baseModel.data = _data;
                return _baseModel;

            }
            catch
            {
                return Utilities._responseData(0, "Lỗi dữ liệu!", null);
            }
        }
        #endregion

        #region LẤY CHI TIẾT CHƯƠNG MÔN HỌC
        [Route("detail")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> ChuongMonHoc_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                //var _item = _context.Question.Where(x => x.Id == id && !x.IsDisabled)
                //                            .Join(_context.BaiHoc, question => question.IdBaiHoc, subject => subject.Id, (question, subject) => new { question, subject })
                //                            .Join(_context.ChuongMonHoc, question => question.subject.IdChuong, chapter => chapter.Id, (question, chapter) => new { question, chapter })
                //                            .Join(_context.ViewNhanVien, question => question.question.question.CreateBy, emp => emp.IdNv, (question, emp) => new { question, emp })
                //                            .Select(x => new IQuestion
                //                            {
                //                                Id = x.question.question.question.Id,
                //                                Title = x.question.question.question.Title,
                //                                OptionA = x.question.question.question.OptionA,
                //                                OptionB = x.question.question.question.OptionB,
                //                                OptionC = x.question.question.question.OptionC,
                //                                OptionD = x.question.question.question.OptionD,
                //                                Class = x.question.chapter.Lop,
                //                                CorrectOption = x.question.question.question.CorrectOption,
                //                                TenNguoiTao = x.emp.HoTen,
                //                                IdBaiHoc = x.question.question.question.IdBaiHoc,
                //                                TenBaiHoc = x.question.question.subject.TenBaiHoc,
                //                                TenChuong = x.question.chapter.TenChuong,
                //                                Level = x.question.question.question.Level,
                //                            }).FirstOrDefault();
                var _item = _context.ChuongMonHoc.Where(x => x.IdMonHoc == id && !x.IsDisabled)
                                                 .Select(x => new IChuongMonHoc
                                                 {
                                                     Id = x.Id,
                                                     IdMonHoc = x.IdMonHoc,
                                                     SoThuTu = x.SoThuTu,
                                                     MaChuong = x.MaChuong,
                                                     TenChuong = x.TenChuong,
                                                     Lop = x.Lop,
                                                     DanhSachBaiHoc = _context.BaiHoc.Where(s => s.IdChuong == x.Id && !s.IsDisabled).Select(s => new IBaiHoc
                                                     {
                                                         Id = s.Id,
                                                         IdChuong = s.IdChuong,
                                                         SoThuTu = s.SoThuTu,
                                                         MaBaiHoc = s.MaBaiHoc,
                                                         TenBaiHoc = s.TenBaiHoc,
                                                         HocKy = s.HocKy
                                                     }).ToList(),
                                                 }).ToList();

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

        #region LẤY CHI TIẾT BÀI HỌC
        [Route("detail-subject")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> BaiHoc_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                //var _item = _context.Question.Where(x => x.Id == id && !x.IsDisabled)
                //                            .Join(_context.BaiHoc, question => question.IdBaiHoc, subject => subject.Id, (question, subject) => new { question, subject })
                //                            .Join(_context.ChuongMonHoc, question => question.subject.IdChuong, chapter => chapter.Id, (question, chapter) => new { question, chapter })
                //                            .Join(_context.ViewNhanVien, question => question.question.question.CreateBy, emp => emp.IdNv, (question, emp) => new { question, emp })
                //                            .Select(x => new IQuestion
                //                            {
                //                                Id = x.question.question.question.Id,
                //                                Title = x.question.question.question.Title,
                //                                OptionA = x.question.question.question.OptionA,
                //                                OptionB = x.question.question.question.OptionB,
                //                                OptionC = x.question.question.question.OptionC,
                //                                OptionD = x.question.question.question.OptionD,
                //                                Class = x.question.chapter.Lop,
                //                                CorrectOption = x.question.question.question.CorrectOption,
                //                                TenNguoiTao = x.emp.HoTen,
                //                                IdBaiHoc = x.question.question.question.IdBaiHoc,
                //                                TenBaiHoc = x.question.question.subject.TenBaiHoc,
                //                                TenChuong = x.question.chapter.TenChuong,
                //                                Level = x.question.question.question.Level,
                //                            }).FirstOrDefault();
                var _item = _context.BaiHoc.Where(x => x.IdChuong == id && !x.IsDisabled)
                                                 .Select(x => new IBaiHoc
                                                 {
                                                     Id = x.Id,
                                                     IdChuong = x.IdChuong,
                                                     SoThuTu = x.SoThuTu,
                                                     HocKy = x.HocKy,
                                                     MaBaiHoc = x.MaBaiHoc,
                                                     TenBaiHoc = x.TenBaiHoc,
                                                     NguoiTao = x.NguoiTao,
                                                     NgaySua = x.NgaySua,
                                                     NguoiSua = x.NguoiSua,
                                                     IsDisabled = x.IsDisabled
                                                 }).ToList();

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

        #region CẬP NHẬT CHƯƠNG MÔN HỌC
        [Route("_Update")]
        //[Authorize(Roles = "10013")]
        [HttpPost]
        public BaseModel<object> ChuongMonHoc_Update([FromBody] IChuongMonHoc data)
        {

            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                if (string.IsNullOrEmpty(data.TenChuong))
                    return Utilities._responseData(0, "Vui lòng chọn số phiếu!!", null);

                var _item = _context.ChuongMonHoc.Where(x => x.Id == data.Id && !x.IsDisabled).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu cần cập nhật, vui lòng tải lại danh sách!!", null);

                _item.TenChuong = string.IsNullOrEmpty(data.TenChuong) ? "" : data.TenChuong.ToString().Trim();
                _item.NguoiSua = loginData.id;
                _item.NgaySua = DateTime.Now;
                _context.SaveChanges();

                return Utilities._responseData(1, "Cập nhật dữ liệu thành công", data);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Cập nhật thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region CẬP NHẬT CHƯƠNG MÔN HỌC
        [Route("_UpdateBaiHoc")]
        //[Authorize(Roles = "10013")]
        [HttpPost]
        public BaseModel<object> BaiHoc_Update([FromBody] List<IBaiHoc> data)
        {

            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                _context.Database.BeginTransaction();
                if (data.Count() == 0 || data == null)
                {
                    _context.Database.RollbackTransaction();
                    return Utilities._responseData(0, "Chưa có bài học nào được bổ sung", null);

                }

                var listBaiHoc = _context.BaiHoc.Where(x => x.IdChuong == data.FirstOrDefault().IdChuong && !x.IsDisabled).ToList();
                listBaiHoc.ToList().ForEach(c => c.IsDisabled = true); //Cập nhật bài học tình trạng bài học thành đã xóa
                _context.SaveChanges();

                foreach (var item in data)
                {
                    if(item.Id != 0) //Cập nhật bài học
                    {
                        var element = _context.BaiHoc.Where(x => x.Id == item.Id).FirstOrDefault();
                        if(element == null)
                        {
                            _context.Database.RollbackTransaction();
                            return Utilities._responseData(0, "Lỗi cập nhật dữ liệu", null);
                        }
                        element.HocKy = item.HocKy;
                        element.NgaySua = DateTime.Now;
                        element.NguoiSua = loginData.id;
                        element.TenBaiHoc = item.TenBaiHoc;
                        element.SoThuTu = item.SoThuTu;
                        element.IsDisabled = false;
                        _context.SaveChanges();

                    }
                    else //Thêm mới bài học
                    {
                        IBaiHoc baiHoc = new IBaiHoc();
                        baiHoc.IdChuong = item.IdChuong;
                        baiHoc.IsDisabled = false;
                        baiHoc.MaBaiHoc = "MABAIHOC";
                        baiHoc.NguoiTao = loginData.id;
                        baiHoc.NgayTao = DateTime.Now;
                        baiHoc.HocKy = item.HocKy;
                        _context.BaiHoc.Add(baiHoc);
                    }
                }
                _context.SaveChanges();
                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Cập nhật dữ liệu thành công", data);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Cập nhật thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region XÓA CHƯƠNG MÔN HỌC
        [Route("_Delete")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> ChuongMonHoc_Delete(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _item = _context.ChuongMonHoc.Where(x => x.Id == id && !x.IsDisabled).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy chương cần xóa, vui lòng tải lại danh sách!!", null);

                _item.IsDisabled = true;

                var _baihoc = _context.BaiHoc.Where(x => x.IdChuong == id && !x.IsDisabled).ToList();
                _baihoc.ToList().ForEach(c => c.IsDisabled = true); //Cập nhật bài học tình trạng bài học thành đã xóa

                _context.SaveChanges();

                return Utilities._responseData(1, "Xóa dữ liệu thành công", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Xóa dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion
    }

}
