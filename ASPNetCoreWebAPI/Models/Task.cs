using System.Collections.Generic;

namespace ASPNetCoreApp.Models
{
    public partial class Task
    {
        public Task()
        {
            Post = new HashSet<Text>();
        }

        public int BlogId { get; set; }
        public string Url { get; set; }

        public virtual ICollection<Text> Post { get; set; }
    }
}