using System;
namespace MatchFixture.Dtos.Tournaments
{
	public class TournamentDto
	{
		public int? Id { get; set; }
		public string Name { get; set; }
        public string StartMonth { get; set; }
        public string EndMonth { get; set; }
    }
}

