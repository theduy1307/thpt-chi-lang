using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICore_SoanDeThi.Models.Common
{
    public class ITableState
    {
        public ITableState()
        {
            filter = new Filter();
            paginator = new PaginatorState();
            sorting = new SortState();
            grouping = new GroupingState();
        }

        public Filter filter { get; set; }
        public PaginatorState paginator { get; set; }
        public SortState sorting { get; set; }
        public string searchTerm { get; set; } = "";
        public GroupingState grouping { get; set; }
        //public int? entityId { get; set; }
    }

    public class Filter
    {
        public string keys { get; set; }
        public string vals { get; set; }
        private Dictionary<string, string> _dic = new Dictionary<string, string>();
        public Filter() { keys = vals = ""; }
        public Filter(string keys, string vals)
        {
            this.keys = keys;
            this.vals = vals;
            initDictionary();
        }

        private void initDictionary()
        {
            string[] arrKeys = keys.Split('|');
            string[] arrVals = vals.Split('|');
            for (int i = 0; i < arrKeys.Length && i < arrVals.Length; i++)
            {
                _dic.Add(arrKeys[i], arrVals[i]);
            }
        }

        public string this[string key]
        {
            get
            {
                if (keys.Length > 0 && _dic.Count == 0)
                    initDictionary();
                if (_dic.ContainsKey(key))
                    return _dic[key];
                return null;
            }
        }
    }

    public class PaginatorState
    {
        public int page { get; set; }
        public int PageSize { get; set; }
        public int total { get; set; }
        public List<int> PageSizes { get; set; }
        public PaginatorState()
        {
            page = 1;
            PageSize = 10;
            total = 0;
            PageSizes = new List<int>();
        }
    }

    public class SortState
    {
        public string column { get; set; }
        public string direction { get; set; }
        public SortState()
        {
            column = "";
            direction = "asc";
        }
    }

    public class GroupingState
    {
        public List<int> itemIds { get; set; }
        public Set<int> selectedRowIds { get; set; }
        public GroupingState()
        {
            itemIds = new List<int>();
            selectedRowIds = new Set<int>();
        }
    }
    public class Set<T>
    {

    }
}
