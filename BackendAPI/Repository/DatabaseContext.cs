using Microsoft.EntityFrameworkCore;
using Common.Entities;

namespace Repository
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options) { }

        public DbSet<Person> People { get; set; }
    }
}
