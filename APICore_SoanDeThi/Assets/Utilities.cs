using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using APICore_SoanDeThi.Models;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using APICore_SoanDeThi.Models.Common;

namespace APICore_SoanDeThi.Assets
{
    public class Utilities
    {
        public static string _GetHeader(HttpRequest request)
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

        public static BaseModel<object> _responseData(int status, string message, object data = null)
        {
            BaseModel<object> _baseModel = new BaseModel<object>();
            ErrorModel _error = new ErrorModel();

            _error.message = message;
            _baseModel.error = _error;
            _baseModel.status = status;
            _baseModel.data = data;

            return _baseModel;
        }

        #region Function Extension
        public static string getStatus(int? status)
        {
            switch (status)
            {
                case 1:
                    return "Đang soạn thảo";
                case 2:
                    return "Chờ TP duyệt";
                case 3:
                    return "Chờ GĐ duyệt";
                case 4:
                    return "Đã duyệt";
                case 5:
                    return "Đã hủy";
                case 6:
                    return "Không duyệt";
                default:
                    return "Không xác định";
            }
        }
        #endregion
    }
}
