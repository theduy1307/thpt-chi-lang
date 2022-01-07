using APICore_SoanDeThi.Models;
using APICore_SoanDeThi.Models.Common;
using APICore_SoanDeThi.Models.DatabaseContext;
using APICore_SoanDeThi.Models.InteractionModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Controllers.Users
{
    [Route("api/user")]
    [EnableCors("ExamPolicy")]
    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly SoanDeThi_DbContext _context;
        private Config _mConfig;
        LoginController lc;

        public UserController(IOptions<Config> config, IHostingEnvironment hostingEnvironment, IConfiguration configLogin)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            lc = new LoginController(configLogin);
            _hostingEnvironment = hostingEnvironment;
            _context = new SoanDeThi_DbContext(options);
            _mConfig = config.Value;
            _config = configLogin;
        }

        //[AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public BaseModel<object> Login([FromBody] UserModel login)
        {
            BaseModel<object> model = new BaseModel<object>();

            var user = lc.AuthenticateUser(login.username, login.password);

            if (!user.isEnableError.Value)
            {
                model.status = 1;

                model.data = user;

                return model;
            }

            model.status = 0;
            model.error.message = user.isMessageError;
            model.data = null;

            return model;
        }

        //[AllowAnonymous]
        [HttpGet]
        [Route("getUserByToken")]
        public BaseModel<object> getUserByToken()
        {
            BaseModel<object> model = new BaseModel<object>();

            string Token = lc.GetHeader(Request);
            var user = lc._GetInfoUser(Token);

            if (!user.isEnableError.Value)
            {
                model.status = 1;

                model.data = user;

                return model;
            }

            model.status = 0;
            model.error.message = user.isMessageError;
            model.data = null;

            return model;
        }

        [HttpPost]
       // [Authorize]
        [Route("getMenuPhanQuyen")]
        public BaseModel<object> GetMenuPhanQuyen()
        {
            BaseModel<object> _baseModel = new BaseModel<object>();
            string Token = lc.GetHeader(Request);
            var user = lc._GetInfoUser(Token);
            var allowCode = user.allowCode.ToString().ToCharArray();
            List<string> list = new List<string>();
            foreach(var item in allowCode)
            {
                list.Add(item.ToString());
            }
            //var username = _context.User.Where(x => x.IdUser == user.Id).FirstOrDefault();

            //if (username == null)
            //{
            //    _baseModel.status = 0;
            //    _baseModel.data = null;
            //    return _baseModel;
            //}
            try
            {
                List<PqSubMenu> _submenu = new List<PqSubMenu>();
                List<PqMainMenu> _mainmenu = new List<PqMainMenu>();
                List<PqModule> _module = new List<PqModule>();
                DataTable _moduleTB;
                DataTable _mainmenuTB;
                DataTable _submenuTB;

                // Lấy submenu
                _submenu = (from sub in _context.PqSubMenu
                            //where user.roles.Contains(sub.AllowCode.Value)
                            select sub
                                ).ToList();

                // Lấy mainmenu
                _mainmenu = (from mm in _context.PqMainMenu
                             where _submenu.Select(x => x.IdMainMenu).Contains(mm.IdMain)
                             select mm
                               ).Union(from mm2 in _context.PqMainMenu
                                       where mm2.Link != "#" && mm2.AllowCode == null
                                       select mm2
                                       ).Union(from mm3 in _context.PqMainMenu
                                               //where user.roles.Contains(mm3.AllowCode.Value)
                                               select mm3
                                               )
                                       .ToList();

                //Lấy module
                _module = (from md in _context.PqModule where list.Contains(md.IdModule.ToString()) select md).ToList();

                _moduleTB = ConvertToDataTable(_module);
                _mainmenuTB = ConvertToDataTable(_mainmenu);
                _submenuTB = ConvertToDataTable(_submenu);

                if (_mainmenuTB == null || _submenu == null)
                {
                    _baseModel.status = 0;
                    _baseModel.data = false;
                    return _baseModel;
                }

                var data = from md in _moduleTB.Select()
                           orderby md["Position"]
                           select new
                           {
                               IdModule = md["IdModule"],
                               Title = md["Title"].ToString(),
                               Link = md["Link"].ToString(),
                               Position = md["Position"],
                               Icon = md["Icon"].ToString(),
                               ChildMenu = from r in _mainmenuTB.Select()
                                           where md["IdModule"].ToString().Equals(r["IdModule"].ToString())
                                           orderby r["Position"]
                                           select new
                                           {
                                               IdMain = r["IdMain"],
                                               Title = r["Title"].ToString(),
                                               Link = r["Link"].ToString(),
                                               Position = r["Position"],
                                               Icon = r["Icon"].ToString(),
                                               ChildMenu = from sm in _submenuTB.Select()
                                                           where sm["IdMainMenu"].ToString().Equals(r["IdMain"].ToString())
                                                           orderby sm["Position"]
                                                           select new
                                                           {
                                                               IdSub = sm["IdSubMenu"],
                                                               Title = sm["Title"].ToString(),
                                                               Link = sm["Link"].ToString(),
                                                               Position = sm["Position"],
                                                               Icon = sm["Icon"].ToString(),
                                                           }

                                           }
                           };

                _baseModel.status = 1;
                _baseModel.data = data;
                return _baseModel;


            }
            catch (Exception ex)
            {
                ErrorModel error = new ErrorModel();
                error.message = "Lỗi: " + ex.Message;
                _baseModel.status = 0;
                _baseModel.error = error;
                _baseModel.data = null;
                return _baseModel;
            }
        }

        private DataTable ConvertToDataTable<T>(IList<T> data)
        {
            PropertyDescriptorCollection properties =
               TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();
            foreach (PropertyDescriptor prop in properties)
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            foreach (T item in data)
            {
                DataRow row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }
            return table;

        }
    
    }
}
