using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Debug;
using System;
using System.Diagnostics;
using WebApi.Models;

namespace WebApi.Database
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration configuration;

        public DatabaseContext(DbContextOptions<DatabaseContext> options, IConfiguration configuration) : base(options)
        {
            this.configuration = configuration;
            Database.EnsureCreated();
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
                .LogTo((string msg) =>
                {
                    Debug.WriteLine(msg);
                    Console.WriteLine(msg);
                }, LogLevel.Information);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .HasMaxLength(150)
                    .IsRequired();

                entity.HasIndex(e => e.Name)
                    .IsUnique();

                entity.Property(e => e.ReleaseDate)
                    .IsRequired()
                    .HasColumnType("date");

                //entity.HasCheckConstraint("CK_Games_Rating", "[Rating] >= 0");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(2500);
            });

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasIndex(e => e.Name)
                    .IsUnique();

                entity.HasData(
                    new Genre[]
                    {
                        new Genre { Id = 1, Name = "Rpg" },
                        new Genre { Id = 2, Name = "Шутеры" }
                    });
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasIndex(e => e.Name)
                    .IsUnique();

                entity.HasData(
                    new Role[]
                    {
                        new Role { Id = 1, Name = "Admin"},
                        new Role { Id = 2, Name = "User" },
                    });
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.HasIndex(e => e.Email)
                    .IsUnique();

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.RoleId)
                    .HasDefaultValue(2);

                entity.HasData(
                    new User 
                    {
                        Id = Guid.NewGuid(), 
                        Email = "ulyanovskiy.01@mail.ru",
                        Password = "HJ+sQcPIU4/ycnktljHQ9VSShGETye3vrDL898N4eMw=",
                        RoleId = 1
                    });
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(2500);

                entity.Property(e => e.Rating)
                    .IsRequired();

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(150);

                //entity.HasIndex(e => new { e.GameId, e.UserId })
                //    .IsUnique();
            });
        }
    }
}
