using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatchFixture.Dtos;
using MatchFixture.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MatchFixture.Controllers
{
    [EnableCors("MyPolicy")]
    [Produces("application/json")]
    [Route("api/Fixtures/[action]")]
    [ApiController]
    public class FixtureController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;

        public FixtureController(
            ITeamRepository teamRepository
            )
        {
            _teamRepository = teamRepository;
        }
        [HttpGet]
        [ActionName("GenarateFixture")]
        public List<FixtureDto> GenarateFixture()
        {
            try
            {
                var teamAll = _teamRepository.GetAll();
                List<string> teams = new List<string> {
                    "Arsenal",
                    "Aston Villa",
                    "Brentford",
                    "Brighton & Hove Albion",
                    "Burnley",
                    "Chelsea",
                    "Crystal Palace",
                    "Everton",
                    "Leeds United",
                    "Leicester City",
                    "Liverpool",
                    "Manchester City",
                    "Manchester United",
                    "Newcastle United",
                    "Norwich City",
                    "Southampton",
                    //"Tottenham Hotspur",
                    //"Watford",
                    //"West Ham United",
                    //"Wolverhampton Wanderers"
                };
                var numberOfRounds = teams.Count - 1;
                var fixture = new List<FixtureDto>();

                var round1 = new List<FixtureDto>();
                var round2 = new List<FixtureDto>();

                for (var i = 0; i < numberOfRounds; i++)
                {

                    for (var j = 0; j < teams.Count / 2; j++)
                    {
                        var homeTeam = teams[j];
                        var awayTeam = teams[teams.Count - 1 - j];

                        round1.Add(new FixtureDto
                        {
                            HomeTeam = homeTeam,
                            AwayTeam = awayTeam
                        });
                        round2.Add(new FixtureDto
                        {
                            HomeTeam = awayTeam,
                            AwayTeam = homeTeam
                        });
                    }
                    
                    //fixture.AddRange(round1);
                    //fixture.AddRange(round2);

                    //List<string> teamsCopy = new List<string>(); // Replace `Team` with the appropriate type

                    teams.Insert(1, teams[numberOfRounds]);
                    teams.RemoveAt(teams.Count - 1);

                }
                for(int i = 0; i < round1.Count; i++)
                {
                    if(i % 2 == 0)
                    {
                        fixture.Add(round1[i]);
                        fixture.Add(round2[round1.Count - 1 - i]);
                    }
                    else
                    {
                        fixture.Add(round2[round1.Count - 1 - i]);
                        fixture.Add(round1[i]);
                    }
                }
                Random rnd = new Random();
                var MyRandomArray = fixture.OrderBy(x => rnd.Next()).ToList();
                return MyRandomArray;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

}

