namespace ASPNetCoreApp.Models
{
    public class Text
    {
        public int TextId { get; set; }
        public int TaskId { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }

        public virtual Task Task { get; set; }
    }
}

