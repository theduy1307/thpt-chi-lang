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
using APICore_SoanDeThi.Models.DatabaseContext;


namespace APICore_SoanDeThi.Controllers.HocSinh
{
    [Route("api/NotificationForStudent")]
    [EnableCors("ExamPolicy")]
    public class ThongBaoController : ControllerBase
    {
        private readonly IHostingEnvironment _hosting;
        private readonly SoanDeThi_DbContext _context;
        private LoginController _account;

        public ThongBaoController(IHostingEnvironment hostingEnvironment)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _hosting = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _account = new LoginController();
        }

        #region THÔNG BÁO - DANH SÁCH
        [Route("NotificationForStudent_List")]
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

                Func<INotifyForStudent, object> _orderByExpression = x => x.Id;

                Dictionary<string, Func<INotifyForStudent, object>> _sortableFields = new Dictionary<string, Func<INotifyForStudent, object>>
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
                //var _data = _context.SysNotifyMaster.Where(x => !x.Disabled && x.CreateBy == loginData.id && x.Type == 1)
                //                                    .Select(x => new ISysNotifyMaster
                //                                    {
                //                                        Id = x.Id,
                //                                        Title = x.Title,
                //                                        Content = x.Content,
                //                                        CreateDate = x.CreateDate
                                                    //});
                var _data = _context.SysNotifyMaster.Join(_context.SysNotifyDetail, master => master.Id, detail => detail.IdMaster, (master, detail) => new { master, detail })
                                                   .Join(_context.ViewNhanVien, notify => notify.master.CreateBy, emp => emp.IdNv, (notify, emp) => new { notify, emp })
                                                   .Where(x => x.notify.detail.IdHocSinh == loginData.id && !x.notify.master.Disabled)
                                                   .OrderByDescending(x=>x.notify.master.Id)
                                                   .Select(x => new INotifyForStudent
                                                   {
                                                       Id = x.notify.master.Id,
                                                       Title = x.notify.master.Title,
                                                       Content = x.notify.master.Content,
                                                       CreateDate = x.notify.master.CreateDate,
                                                       CreateByName = x.emp.HoTen,
                                                       IsRead = x.notify.detail.IsRead
                                                   });


                if (!string.IsNullOrEmpty(_tableState.searchTerm))
                {
                    _keywordSearch = _tableState.searchTerm.ToLower().Trim();
                    _data = _data.Where(x =>
                          x.Title.ToLower().Contains(_keywordSearch)
                          || x.Content.ToLower().Contains(_keywordSearch)

                   );
                    IQueryable<INotifyForStudent> data = _data;
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

                List<INotifyForStudent> listData = new List<INotifyForStudent>();
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

        #region LẤY CHI TIẾT CÂU HỎI
        [Route("NotificationForStudent_Detail")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> NotificationForStudent_Detail(long id)
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                _context.Database.BeginTransaction();
                var _item = _context.SysNotifyMaster.Join(_context.SysNotifyDetail, master => master.Id, detail => detail.IdMaster, (master, detail) => new { master, detail })
                                                   .Join(_context.ViewNhanVien, notify => notify.master.CreateBy, emp => emp.IdNv, (notify, emp) => new { notify, emp })
                                                   .Where(x => x.notify.master.Id == id)
                                                   .OrderByDescending(x => x.notify.master.Id)
                                                   .Select(x => new INotifyForStudent
                                                   {
                                                       Id = x.notify.master.Id,
                                                       Title = x.notify.master.Title,
                                                       Content = x.notify.master.Content,
                                                       CreateDate = x.notify.master.CreateDate,
                                                       CreateByName = x.emp.HoTen,
                                                       IsRead = x.notify.detail.IsRead
                                                   }).FirstOrDefault();
                var detail = _context.SysNotifyDetail.Where(x => x.IdMaster == id && x.IdHocSinh == loginData.id).FirstOrDefault();
                detail.IsRead = true;
                _context.SaveChanges();


                if (_item == null)
                {
                    _context.Database.RollbackTransaction();
                    return Utilities._responseData(0, "Không tìm thấy dữ liệu, vui lòng tải lại!!", null);
                }

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", _item);
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion

        #region ĐÁNH DẤU LÀ ĐÃ ĐỌC
        [Route("NotificationForStudent_ReadAll")]
        //[Authorize(Roles = "10014")]
        [HttpGet]
        public BaseModel<object> NotificationForStudent_ReadAll()
        {
            string Token = Utilities._GetHeader(Request);
            UserLogin loginData = _account._GetInfoUser(Token);

            if (loginData == null)
                return Utilities._responseData(0, "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!", null);

            try
            {
                _context.Database.BeginTransaction();
                var _item = _context.SysNotifyDetail.Where(x => x.IdHocSinh == loginData.id && !x.IsRead).ToList();
                _item.Select(c => { c.IsRead = true; return c; }).ToList();
                _context.SaveChanges();

                _context.Database.CommitTransaction();
                return Utilities._responseData(1, "", _item);
            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return Utilities._responseData(0, "Lấy dữ liệu thất bại, vui lòng kiểm tra lại!", null);
            }
        }
        #endregion
    }
}
