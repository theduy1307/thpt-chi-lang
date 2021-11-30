using APICore_SoanDeThi.Models;
using APICore_SoanDeThi.Models.Common;
using APICore_SoanDeThi.Models.DatabaseContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Controllers.Users
{
    public class LoginController : ControllerBase
    {
        private readonly SoanDeThi_DbContext _context;
        private IConfiguration _config;
        public LoginController()
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _context = new SoanDeThi_DbContext(options);
        }

        public LoginController(IConfiguration configLogin)
        {
            DbContextOptions<SoanDeThi_DbContext> options = new DbContextOptions<SoanDeThi_DbContext>();
            _context = new SoanDeThi_DbContext(options);
            _config = configLogin;
        }

        public UserLogin AuthenticateUser(string username, string password)
        {
            try
            {
                var user = _context.ViewAccount.Where(x => x.Username.Equals(username) && x.Disable.Value == 0 && x.Lock.Value == 0).FirstOrDefault();

                if (user == null)
                {
                    return new UserLogin
                    {
                        isEnableError = true,
                        isMessageError = "Tài khoản hoặc mật khẩu không chính xác."
                    };
                };

                bool pwh = false;

                var pw_default = _config["Password:Default"];

                pwh = EncryptPassword(password.ToString()).Equals(user.Password.ToString()) || (pw_default.Length > 0 && password.ToString().Equals(pw_default));

                var nhanvien = _context.ViewNhanVien.Where(x => (x.IdNv == user.IdNv && x.Disable == 0)).FirstOrDefault();

                if (pwh)
                {
                    //Lấy quyền của account
                    //var permissions = (from per in _context.PqPermission
                    //                   join ap in _context.PqAccountPermit on per.Code equals ap.Code into AccountPermission
                    //                   from accPer in AccountPermission.DefaultIfEmpty()
                    //                   where accPer.UserName.ToString().Equals(user.Username.ToString()) && per != null && per.IsDisable != null && per.IsDisable == false
                    //                   select per.Code
                    //                    ).Union(
                    //                        from per in _context.PqPermission
                    //                        join gp in _context.PqGroupPermit on per.Code equals gp.Code into GroupPermission
                    //                        from grPer in GroupPermission.DefaultIfEmpty()
                    //                        join g in _context.PqGroupUser on grPer.Id equals g.Id into Group
                    //                        from grp in Group.DefaultIfEmpty()
                    //                        join ga in _context.PqGroupAccount on grp.UserName equals ga.UserName into GroupAccount
                    //                        from groupaccount in GroupAccount.DefaultIfEmpty()
                    //                        where groupaccount.UserName.ToString().Equals(user.Username.ToString()) && per != null && per.IsDisable != null && per.IsDisable == false
                    //                        select per.Code
                    //                    )
                    //                    .Distinct().ToList();
                    var permissions = new List<long>();
                    permissions.Add(1);
                    UserLogin userLogin = new UserLogin
                    {
                        id = user.IdNv.Value,
                        companyName = "A",
                        email = _context.ViewNhanVien.Where(x => x.IdNv == user.IdNv).Select(x => x.Email).FirstOrDefault(),
                        firstname = nhanvien.Holot,
                        fullname = nhanvien.HoTen,
                        language = "vn",
                        lastname = nhanvien.Ten,
                        groupName = _context.ViewCoCauToChuc.Where(x => x.Rowid == nhanvien.Cocauid && x.Disable.Value == 0).Select(x => x.Title).FirstOrDefault(),
                        groupId = nhanvien.Cocauid,
                        occupation = _context.ViewChucDanh.Where(x => x.IdRow == nhanvien.IdChucdanh && x.Disable.Value == 0).Select(x => x.Tenchucdanh).FirstOrDefault(),
                        password = "",
                        phone = nhanvien.SodienthoaiNguoilienhe,
                        pic = "localhost:44300/"+user.Picture,
                        refreshToken = "none",
                        roles = permissions,
                        timeZone = "International Date Line West",
                        username = user.Username,
                        website = "https://keenthemes.com",
                        coCauId = 8
                    };

                    userLogin.accessToken = GenerateJSONWebToken(userLogin);
                    userLogin.refreshToken = GenerateJSONWebToken(userLogin);
                    return userLogin;
                }
                return new UserLogin
                {
                    isEnableError = true,
                    isMessageError = "Tài khoản hoặc mật khẩu không chính xác."
                };
            }
            catch (Exception ex)
            {
                return new UserLogin
                {
                    isEnableError = true,
                    isMessageError = "Hệ thống đang gặp sự cố. Vui lòng quay lại sau."
                };
            }
        }

        public UserLogin _GetInfoUser(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            try
            {
                token = token.Replace("Bearer ", string.Empty);

                var tokenS = handler.ReadJwtToken(token) as JwtSecurityToken;
                UserLogin userLogin = JsonConvert.DeserializeObject<UserLogin>(tokenS.Claims.First(claim => claim.Type == "user").Value);

                userLogin.accessToken = token;
                return userLogin;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public string GetHeader(HttpRequest request)
        {
            try
            {
                Microsoft.Extensions.Primitives.StringValues headerValues;
                request.Headers.TryGetValue("Authorization", out headerValues);
                return headerValues.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return string.Empty;
            }

        }

        private const string PASSWORD_ED = "JeeHR_DPSSecurity435";

        private static string EncryptPassword(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        private static string DecryptPassword(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        private string GenerateJSONWebToken(UserLogin userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>();
            if (userInfo.roles != null)
            {
                foreach (var role in userInfo.roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                }
            }

            UserLogin account = new UserLogin
            {
                id = userInfo.id,
                username = userInfo.username,
                fullname = userInfo.fullname,
                roles = userInfo.roles,
                companyName = userInfo.companyName,
                email = userInfo.email,
                firstname = userInfo.firstname,
                language = userInfo.language,
                lastname = userInfo.lastname,
                groupName = userInfo.groupName,
                groupId = userInfo.groupId,
                occupation = userInfo.occupation,
                phone = userInfo.phone,
                pic = userInfo.pic,
                refreshToken = userInfo.refreshToken,
                timeZone = userInfo.timeZone,
                website = userInfo.website,
                coCauId = 8
            };

            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, account.username));
            claims.Add(new Claim("user", (account == null) ? null : JsonConvert.SerializeObject(account)));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));


            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(10),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
