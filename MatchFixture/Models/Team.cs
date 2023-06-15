using System;
using System.ComponentModel.DataAnnotations;

namespace MatchFixture.Models
{
	public class Team : EntityBase
    {
        public string Name { get; set; }
        public Tournament Tournament { get; set; }
    }
}

