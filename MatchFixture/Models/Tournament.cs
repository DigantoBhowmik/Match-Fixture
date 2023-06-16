using System;
namespace MatchFixture.Models
{
	public class Tournament: EntityBase
	{
		public string Name { get; set; }
		public DateTime StartMonth { get; set; }
		public DateTime EndMonth { get; set; }

    }
}

