using System;
using MatchFixture.Models;

namespace MatchFixture.Dtos.Tournaments
{
	public class CreateTournamentDto
	{
		public string Name { get; set; }
        public string StartMonth { get; set; }
        public string EndMonth { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        //public CompetitionType CompetitionType { get; set; }

    }
}

