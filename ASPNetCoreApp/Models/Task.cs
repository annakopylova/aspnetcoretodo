namespace ASPNetCoreApp.Models
{
    public class Task
    {
        public int TaskId { get; set; }
        public int DoId { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }

        public virtual Do Do { get; set; }
    }
}
