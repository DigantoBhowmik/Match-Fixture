using System;
using MatchFixture.Models;
using Microsoft.EntityFrameworkCore;

namespace MatchFixture.Data
{
	public class MatchFixtureDbContext : DbContext
    {
		public MatchFixtureDbContext(DbContextOptions options) : base(options)
        {
		}
        public DbSet<Team> Teams { get; set; }
    }
}

