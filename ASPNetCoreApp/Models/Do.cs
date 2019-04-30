using System.Collections.Generic;

namespace ASPNetCoreApp.Models
{
    public partial class Do
    {
        public Do()
        {
            Task = new HashSet<Task>();
        }

        public int DoId { get; set; }
        public string Url { get; set; }

        public virtual ICollection<Task> Task { get; set; }
    }
}
