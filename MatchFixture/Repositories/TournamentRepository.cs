using System;
using MatchFixture.Data;
using MatchFixture.Interfaces;
using MatchFixture.Models;

namespace MatchFixture.Repositories
{
	public class TournamentRepository: RepositoryBase<Tournament>, ITournamentRepository
    {
		public TournamentRepository(MatchFixtureDbContext databaseContext) : base(databaseContext)
    {
    }
}
}

