using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ASPNetCoreApp.Models
{
    public partial class DoContext : IdentityDbContext<User>
    {
        #region Constructor
        public DoContext(DbContextOptions<DoContext> options)
            : base(options)
        { }
        #endregion

        public virtual DbSet<Do> Do { get; set; }
        public virtual DbSet<Task> Task { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Do>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.HasOne(d => d.Do)
                    .WithMany(p => p.Task)
                    .HasForeignKey(d => d.DoId);
            });
        }
    }
}
