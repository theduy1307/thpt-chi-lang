using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.Common
{
    public class FileImport
    {
        public long? idLoaiHH { get; set; }
        public string base64 { get; set; }
        public byte[] fileByte { get; set; } = null;
        public string filename { get; set; }
        public string dienGiai { get; set; } = "";
        public string extension { get; set; }
        public long? IdLoai { get; set; }
    }

    public class ImportError
    {
        public int IndexRow { get; set; } = -1;
        public string ModelName { get; set; } = "";
        public string PropertyName { get; set; } = "";
        public string ErrorMeg { get; set; } = "";
    }

    public class DSFileImport
    {
        public List<FileImport> listImport { get; set; }
    }

    public class FileDinhKem
    {
        public long IdFile { get; set; }
        public string FileName { get; set; }
        public string GhiChu { get; set; }
    }
}
