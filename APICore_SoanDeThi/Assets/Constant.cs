using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Assets
{
    public class Constant
    {
        #region MÃ LỖI

        public const string ERRORCODE = "101";                                              //lỗi token
        public const string ERRORDATA = "106";                                              //lỗi Data
        public const string ERRORCODETIME = "102";                                          //lỗi về time
        public const string ERRORCODE_SQL = "103";                                          //lỗi sql
        public const string ERRORCODE_FORM = "104";                                         //lỗi về dữ liệu khi post thiếu dl
        public const string ERRORCODE_ROLE = "105";                                         //lỗi về quyền truy cập chức năng
        public const string ERRORCODE_EXCEPTION = "0000";                                   //EXCEPTION

        #endregion


        #region PATH ĐỂ LẤY MÃ

        public const string PATH_YCSC = "YCSC";                                             //Lấy mã Yêu cầu sửa chữa
        public const string PATH_DVSC = "DVSC";                                             //Lấy mã Đơn vị sữa chữa
        public const string PATH_LTB = "LTB";                                               //Lấy mã Loại thiết bị
        public const string PATH_KHBTN = "KHBTN";                                           //Lấy mã Kế hoạch SX Năm
        public const string PATH_KHBT = "KHBT";                                             //Lấy mã Kế hoạch bảo trì thiết bị bổ sung
        public const string PATH_KHBTT = "KHBTT";                                           //Lấy mã Kế hoạch bảo trì tháng
        public const string PATH_VTTT = "VTTT";
        public const string PATH_PASC = "PASC";
        public const string PATH_TBTT = "TBTT";                                             //Lấy mã thiết bị thay thế
        #endregion

        public const string FileImport_HocSinh = "DuLieu/Templates/";
    }
}
