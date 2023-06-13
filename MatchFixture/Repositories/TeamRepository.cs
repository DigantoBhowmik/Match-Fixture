using System;
using MatchFixture.Data;
using MatchFixture.Interfaces;
using MatchFixture.Models;

namespace MatchFixture.Repositories
{
	public class TeamRepository : RepositoryBase<Team>, ITeamRepository
    {
		public TeamRepository(MatchFixtureDbContext databaseContext) : base(databaseContext)
        {
		}
	}
}

