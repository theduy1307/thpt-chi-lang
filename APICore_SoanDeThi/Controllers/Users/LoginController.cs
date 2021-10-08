using APICore_SoanDeThi.Models;
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
                website = userInfo.website
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
