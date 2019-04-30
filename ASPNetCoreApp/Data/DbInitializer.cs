using ASPNetCoreApp.Models;
using System.Linq;

namespace ASPNetCoreApp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(DoContext context)
        {
            context.Database.EnsureCreated();

            if (context.Do.Any())
            {
                return;
            }

            var Do = new Do[]
            {
                new Do{Url="Go to shop"},
                new Do{Url="Drink coffee"},
                new Do{Url="Walk with dog"}

            };
            foreach (Do d in Do)
            {
                context.Do.Add(d);
            }
            context.SaveChanges();

            var Task = new Task[]
            {
                new Task { DoId=1,Content="1.apple" +
                "2.banana",Title="Go to shop" },
                new Task { DoId=2,Content="",Title="Homework" }
            };
            foreach (Task t in Task)
            {
                context.Task.Add(t);
            }
            context.SaveChanges();
        }
    }
}
