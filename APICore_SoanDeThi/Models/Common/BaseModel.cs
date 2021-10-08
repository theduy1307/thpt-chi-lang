using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.Common
{
    public class BaseModel<T>
    {
        public BaseModel()
        {
            error = new ErrorModel();
        }

        public BaseModel(string errorMessage)
        {
            status = 0;
            error = new ErrorModel() { message = errorMessage, code = "9" };
        }

        public int status { get; set; }
        public T data { get; set; }
        public T page { get; set; }
        public ErrorModel error { get; set; }
    }


    public class ErrorModel
    {
        public string message { get; set; }
        public string code { get; set; }
        public string error { get; set; } = "";
    }
    public class ResultModel
    {
        public int status { get; set; }
        public object data { get; set; }
        public ErrorModel error { get; set; }
    }
}   
