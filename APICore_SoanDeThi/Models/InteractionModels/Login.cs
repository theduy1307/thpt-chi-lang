using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models
{
    public class AuthModel
    {
        public string accessToken { get; set; }
        public string refreshToken { get; set; }
        public string expiresIn { get; set; }
    }

    public class UserLogin : AuthModel
    {
        public long id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string fullname { get; set; }
        public string email { get; set; }
        public string pic { get; set; }
        public List<long> roles { get; set; } = new List<long>();
        public string groupName { get; set; }
        public long? groupId { get; set; }
        public string occupation { get; set; }
        public string companyName { get; set; }
        public string phone { get; set; }
        public AddressModel address { get; set; }
        public SocialNetworksModel socialNetworks { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string website { get; set; }
        public string language { get; set; }
        public string timeZone { get; set; }

        public string isMessageError { get; set; } = "";
        public bool? isEnableError { get; set; } = false;
        public object Rules { get; internal set; }
    }

    public class AddressModel
    {
        public string addressLine { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string postCode { get; set; }
    }
    public class SocialNetworksModel
    {
        public string linkedIn { get; set; }
        public string facebook { get; set; }
        public string twitter { get; set; }
        public string instagram { get; set; }
    }
}
