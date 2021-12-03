using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>()
			.HasKey(u => u.Id);

			modelBuilder.Entity<Note>()
			.HasOne<User>(n => n.user)
			.WithMany(u => u.notes)
			.HasForeignKey(u => u.userId);
		}


		public DbSet<User> Users { get; set; }
		public DbSet<Note> Notes { get; set; }
	}
}