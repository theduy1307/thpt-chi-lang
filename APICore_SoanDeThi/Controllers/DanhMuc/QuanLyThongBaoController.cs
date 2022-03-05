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
using System.IO;

namespace APICore_SoanDeThi.Controllers.DanhMuc
{
    [Route("api/Notification")]
    [EnableCors("ExamPolicy")]
    public class QuanLyThongBaoController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public QuanLyThongBaoController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region THÔNG BÁO - DANH SÁCH
        [Route("Notification_List")]
        //[Authorize(Roles = "")]
        [HttpPost]
        public BaseModel<object> Notification_List([FromBody] ITableState _tableState)
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

                Func<ISysNotifyMaster, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<ISysNotifyMaster, object>> _sortableFields = new Dictionary<string, Func<ISysNotifyMaster, object>>
                {
                    { "Title", x => x.Title },
                    { "Class", x => x.Content }
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
                var _data = _context.SysNotifyMaster.Where(x => !x.Disabled && x.CreateBy == loginData.id && x.Type == 1)
                                                    .Select(x => new ISysNotifyMaster
                                                    {
                                                        Id = x.Id,
                                                        Title = x.Title,
                                                        Content = x.Content,
                                                        ModifiedDate = x.ModifiedDate,
                                                        CreateDate = x.CreateDate,
                                                    });


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.Title.ToLower().Contains(_keywordSearch)
                          || x.Title.ToLower().Contains(_keywordSearch)
                          || x.Content.ToLower().Contains(_keywordSearch)

                   );
                    IQueryable<ISysNotifyMaster> data = _data;
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

                List<ISysNotifyMaster> listData = new List<ISysNotifyMaster>();
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

        #region THÊM MỚI THÔNG BÁO
        [Route("Notification_Create")]
        //[Authorize(Roles = "10012")]
        [HttpPost]
        public BaseModel<object> Notification_Create([FromBody] ISysNotifyMaster data)
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

                SysNotifyMaster _item = new SysNotifyMaster();

                _item.Title = string.IsNullOrEmpty(data.Title) ? "" : data.Title.ToString().Trim();
                _item.Content = string.IsNullOrEmpty(data.Content) ? "" : data.Content.ToString().Trim();
                _item.CreateDate = DateTime.Now;
                _item.CreateBy = loginData.id;
                _item.NotifyIcon = "flaticon2-layers text-primary";
                _item.Type = 1;

                _context.SysNotifyMaster.Add(_item);
                _context.SaveChanges();

                long _class = _context.Lop.Where(x => x.IdChuNhiem == loginData.id).OrderByDescending(x => x.Id).Select(x => x.Id).FirstOrDefault();
                var _student = _context.ViewNhanVien.Where(x => x.IdLop == _class && (x.isStudent ?? false)).Select(x => x.IdNv).ToList();

                foreach (var item in _student)
                {
                    SysNotifyDetail _detail = new SysNotifyDetail();
                    _detail.IdHocSinh = item;
                    _detail.IdMaster = _item.Id;
                    _detail.IsRead = false;
                    _context.SysNotifyDetail.Add(_detail);
                    _context.SaveChanges();
                }

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "Thêm mới thông báo thành công", data);

            }
            catch (Exception ex)
            {
                return Utilities._responseData(0, "Thêm mới thất bại, vui lòng kiểm tra lại! Lỗi: " + ex.Message, null);
            }
        }
        #endregion
    }
}
