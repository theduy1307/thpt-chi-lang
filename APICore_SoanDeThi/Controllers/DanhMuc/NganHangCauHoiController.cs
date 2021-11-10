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
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Xceed.Words.NET;
using System.IO;

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
    [Route("api/Question")]
    [EnableCors("ExamPolicy")]
    public class NganHangCauHoiController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public NganHangCauHoiController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region NGÂN HÀNG CÂU HỎI - DANH SÁCH
        [Route("Question_List")]
        //[Authorize(Roles = "")]
        [HttpPost]
        public BaseModel<object> CauHoi_List([FromBody] ITableState _tableState)
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

                Func<IQuestion, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<IQuestion, object>> _sortableFields = new Dictionary<string, Func<IQuestion, object>>
                {
                    { "Title", x => x.Title },
                    { "Class", x => x.IdBaiHoc },
                    { "Level", x => x.Level },                    
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
                var _data = _context.Question.Where(x => !x.IsDisabled && !x.IsCustom)
                                                  .Join(_context.BaiHoc, question => question.IdBaiHoc, subject => subject.Id, (question, subject)=> new {question, subject})
                                                  .Join(_context.ChuongMonHoc, question => question.subject.IdChuong, chapter => chapter.Id, (question, chapter)=> new {question, chapter})
                                                  .Select(x => new IQuestion
                                                  {
                                                      Id = x.question.question.Id,
                                                      Title = x.question.question.Title,
                                                      OptionA = x.question.question.OptionA,
                                                      OptionB = x.question.question.OptionB,
                                                      OptionC = x.question.question.OptionC,
                                                      OptionD = x.question.question.OptionD,
                                                      IdBaiHoc = x.question.question.IdBaiHoc,
                                                      IdChuong = x.chapter.Id,
                                                      TenChuong = x.chapter.TenChuong,
                                                      TenBaiHoc = x.question.subject.TenBaiHoc,
                                                      Class = x.chapter.Lop,
                                                      Level = x.question.question.Level,
                                                      CorrectOption = x.question.question.CorrectOption,
                                                      CreateBy = x.question.question.CreateBy
                                                  });


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.Title.ToLower().Contains(_keywordSearch)
                          || x.OptionA.ToString().ToLower().Contains(_keywordSearch)
                          || x.OptionB.ToLower().Contains(_keywordSearch)
                          || x.OptionC.ToLower().Contains(_keywordSearch)
                          || x.OptionD.ToLower().Contains(_keywordSearch)

                   );
                    IQueryable<IQuestion> data = _data;
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

                List<IQuestion> listData = new List<IQuestion>();
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

        #region demo
        [Route("print")]
        [HttpGet]
        public IActionResult GenerateDocxBrowser()
        {
            var _item = _context.Question.Where(x => x.Id == 159 && !x.IsDisabled)
                                            .Join(_context.BaiHoc, question => question.IdBaiHoc, subject => subject.Id, (question, subject) => new { question, subject })
                                            .Join(_context.ChuongMonHoc, question => question.subject.IdChuong, chapter => chapter.Id, (question, chapter) => new { question, chapter })
                                            .Join(_context.ViewNhanVien, question => question.question.question.CreateBy, emp => emp.IdNv, (question, emp) => new { question, emp })
                                            .Select(x => new IQuestion
                                            {
                                                Id = x.question.question.question.Id,
                                                Title = x.question.question.question.Title,
                                                OptionA = x.question.question.question.OptionA,
                                                OptionB = x.question.question.question.OptionB,
                                                OptionC = x.question.question.question.OptionC,
                                                OptionD = x.question.question.question.OptionD,
                                                Class = x.question.chapter.Lop,
                                                CorrectOption = x.question.question.question.CorrectOption,
                                                TenNguoiTao = x.emp.HoTen,
                                                IdBaiHoc = x.question.question.question.IdBaiHoc,
                                                TenBaiHoc = x.question.question.subject.TenBaiHoc,
                                                TenChuong = x.question.chapter.TenChuong,
                                                Level = x.question.question.question.Level,
                                            }).FirstOrDefault();
            // open xml sdk - docx
            using (MemoryStream mem = new MemoryStream())
            {
                using (WordprocessingDocument wordDoc = WordprocessingDocument.Create(mem, DocumentFormat.OpenXml.WordprocessingDocumentType.Document, true))
                {
                    wordDoc.AddMainDocumentPart();
                    // siga a ordem
                    Document doc = new Document();
                    Body body = new Body();

                    // 1 paragrafo
                    Paragraph para = new Paragraph();

                    ParagraphProperties paragraphProperties1 = new ParagraphProperties();
                    ParagraphStyleId paragraphStyleId1 = new ParagraphStyleId() { Val = "Normal" };
                    Justification justification1 = new Justification() { Val = JustificationValues.Start };
                    ParagraphMarkRunProperties paragraphMarkRunProperties1 = new ParagraphMarkRunProperties();

                    paragraphProperties1.Append(paragraphStyleId1);
                    paragraphProperties1.Append(justification1);
                    paragraphProperties1.Append(paragraphMarkRunProperties1);

                    Run run = new Run();
                    RunProperties runProperties = new RunProperties();
                    RunFonts runFonts = new RunFonts { Ascii = "Times New Roman" }; //set global font
                    FontSize fontSize = new FontSize { Val = new StringValue("24") };
                    runProperties.Append(runFonts);
                    runProperties.Append(fontSize);
                    Text text = new Text() { Text = _item.Title };

                    // siga a ordem 
                    run.Append(text);
                    run.Append(runProperties);
                    para.Append(paragraphProperties1);

                    // todos os 2 paragrafos no main body
                    body.Append(para);
                    doc.Append(body);


                    wordDoc.MainDocumentPart.Document = doc;

                    wordDoc.Close();
                }
                return File(mem.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "ABC.docx");
            }

        }
        #endregion

        #region THÊM MỚI CÂU HỎI
        [Route("_Insert")]
        //[Authorize(Roles = "10012")]
        [HttpPost]
        public BaseModel<object> CauHoi_Insert([FromBody] IQuestion data)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                if (string.IsNullOrEmpty(data.Title))
                    return Utilities._responseData(0, "Vui lòng nhập số hợp đồng mua!!", null);

                _context.Database.BeginTransaction();

                Question _item = new Question();

                _item.Title = string.IsNullOrEmpty(data.Title) ? "" : data.Title.ToString().Trim();
                _item.OptionA = string.IsNullOrEmpty(data.OptionA) ? "" : data.OptionA.ToString().Trim();
                _item.OptionB = string.IsNullOrEmpty(data.OptionB) ? "" : data.OptionB.ToString().Trim();
                _item.OptionC = string.IsNullOrEmpty(data.OptionC) ? "" : data.OptionC.ToString().Trim();
                _item.OptionD = string.IsNullOrEmpty(data.OptionD) ? "" : data.OptionD.ToString().Trim();
                _item.CorrectOption = data.CorrectOption;
                _item.IdBaiHoc = data.IdBaiHoc;
                _item.Level = data.Level;
                _item.CreateDate = DateTime.Now;
                _item.CreateBy = loginData.id;
                _item.ModifyDate = DateTime.Now;
                _item.CreateBy = data.CreateBy;
                _item.ModifyBy = data.ModifyBy;
                _item.IsDisabled = false;
                _item.IsCustom = false;
                
                _context.Question.Add(_item);
                _context.SaveChanges();

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại! Lỗi: "+ex.Message, null);
            }
        }
        #endregion

        #region LẤY CHI TIẾT CÂU HỎI
        [Route("_Detail")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> CauHoi_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _item = _context.Question.Where(x => x.Id == id && !x.IsDisabled)
                                            .Join(_context.BaiHoc, question => question.IdBaiHoc, subject => subject.Id, (question, subject) => new {question, subject})
                                            .Join(_context.ChuongMonHoc, question => question.subject.IdChuong, chapter => chapter.Id, (question, chapter) => new {question, chapter})
                                            .Join(_context.ViewNhanVien, question =>question.question.question.CreateBy, emp => emp.IdNv, (question, emp) => new {question, emp})
                                            .Select(x => new IQuestion
                                            {
                                                Id = x.question.question.question.Id,
                                                Title = x.question.question.question.Title,
                                                OptionA = x.question.question.question.OptionA,
                                                OptionB = x.question.question.question.OptionB,
                                                OptionC = x.question.question.question.OptionC,
                                                OptionD = x.question.question.question.OptionD,
                                                Class = x.question.chapter.Lop,
                                                CorrectOption = x.question.question.question.CorrectOption,
                                                TenNguoiTao = x.emp.HoTen,
                                                IdBaiHoc = x.question.question.question.IdBaiHoc,
                                                TenBaiHoc = x.question.question.subject.TenBaiHoc,
                                                TenChuong = x.question.chapter.TenChuong,
                                                Level = x.question.question.question.Level,
                                            }).FirstOrDefault();


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

        #region CẬP NHẬT CÂU HỎI
        [Route("_Update")]
        //[Authorize(Roles = "10013")]
        [HttpPost]
        public BaseModel<object> CauHoi_Update([FromBody] IQuestion data)
        {

            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                if (string.IsNullOrEmpty(data.Title))
                    return Utilities._responseData(0, "Vui lòng chọn số phiếu!!", null);

                var _item = _context.Question.Where(x => x.Id == data.Id && !x.IsDisabled).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu cần cập nhật, vui lòng tải lại danh sách!!", null);

                _item.Title = string.IsNullOrEmpty(data.Title) ? "" : data.Title.ToString().Trim();
                _item.OptionA = string.IsNullOrEmpty(data.OptionA) ? "" : data.OptionA.ToString().Trim();
                _item.OptionB = string.IsNullOrEmpty(data.OptionB) ? "" : data.OptionB.ToString().Trim();
                _item.OptionC = string.IsNullOrEmpty(data.OptionC) ? "" : data.OptionC.ToString().Trim();
                _item.OptionD = string.IsNullOrEmpty(data.OptionD) ? "" : data.OptionD.ToString().Trim();
                _item.CorrectOption = data.CorrectOption;
                _item.IdBaiHoc = data.IdBaiHoc;
                _item.Level = data.Level;
                _item.ModifyBy = loginData.id;
                _item.ModifyDate = DateTime.Now;
                _context.SaveChanges();

                return Utilities._responseData(1, "", data);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Cập nhật thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region XÓA HỢP ĐỒNG MẪU
        [Route("_Delete")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> CauHoi_Delete(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                var _item = _context.Question.Where(x => x.Id == id && !x.IsDisabled).FirstOrDefault();
                if (_item == null)
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu cần xóa, vui lòng tải lại danh sách!!", null);

                _item.IsDisabled = true;

                _context.SaveChanges();

                return Utilities._responseData(1, "", null);
            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Xóa thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion
    }
}
