using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.Common
{
    public class UserJWT
    {
        public string _id { get; set; }
        public string username { get; set; }
        public CustomData customData { get; set; }
    }

    public class CustomData
    {
        public PersonalInfo personalInfo { get; set; }
        [JsonPropertyName("jee-account")]
        [JsonProperty("jee-account")]
        public JeeAccount jeeAccount { get; set; }
    }

    public class PersonalInfo
    {
        public string Avatar { get; set; }
        public string Name { get; set; }
        public string Jobtitle { get; set; }
        public string Department { get; set; }
        public string Birthday { get; set; }
        public string Phonenumber { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string StructureID { get; set; }
        public string BgColor { get; set; }
    }

    public class JeeFlow
    {
        public string roles { get; set; }
    }

    public class JeeAccount
    {
        public int customerID { get; set; }
        public List<string> appCode { get; set; }
        public int userID { get; set; }
        public int staffID { get; set; }
    }

    public class UserInfo
    {
        public UserJWT user { get; set; }
        public string access_token { get; set; }
        public string refresh_token { get; set; }
    }

    public class AccessToken
    {
        public string uuid { get; set; }
        public string userId { get; set; }
        public string username { get; set; }
        public CustomData customdata { get; set; }
    }
}
