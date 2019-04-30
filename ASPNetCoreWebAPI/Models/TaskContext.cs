using Microsoft.EntityFrameworkCore;

namespace ASPNetCoreApp.Models
{
    public partial classTaskContext : DbContext
    {
        #region Constructor
        public TaskContext(DbContextOptions<TaskContext> options)
            : base(options)
        { }
        #endregion

        public virtual DbSet<Task> Task { get; set; }
        public virtual DbSet<Text> Text { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Task>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
            });

            modelBuilder.Entity<Text>(entity =>
            {
                entity.HasOne(d => d.Task)
                    .WithMany(p => p.Text)
                    .HasForeignKey(d => d.TaskId);
            });
        }
    }
}
