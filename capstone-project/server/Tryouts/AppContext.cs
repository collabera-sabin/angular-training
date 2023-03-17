using LMS.Models;
using Microsoft.EntityFrameworkCore;

namespace LMS
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options) {

        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Trainings> Trainings { get; set; }
        public DbSet<Feedbacks> Feedbacks { get; set; }
        public DbSet<Attendence> Attendence { get; set; }
    }
}
