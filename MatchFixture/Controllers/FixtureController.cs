using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatchFixture.Dtos;
using MatchFixture.Interfaces;
using MatchFixture.Models;
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
        //[HttpGet]
        //[ActionName("GenarateFixture")]
        //public List<FixtureDto> GenarateFixture()
        //{
        //    try
        //    {
        //        var teamAll = _teamRepository.GetAll().ToList();

        //        List<string> teams = new List<string>();
        //        teamAll.ForEach(x =>
        //        {
        //            teams.Add(x.Name);
        //        });
        //        //List<string> teams = new List<string> {
        //        //    "Arsenal",
        //        //    "Aston Villa",
        //        //    "Brentford",
        //        //    "Brighton & Hove Albion",
        //        //    "Burnley",
        //        //    "Chelsea",
        //        //    "Crystal Palace",
        //        //    "Everton",
        //        //    "Leeds United",
        //        //    "Leicester City",
        //        //    "Liverpool",
        //        //    "Manchester City",
        //        //    "Manchester United",
        //        //    "Newcastle United",
        //        //    "Norwich City",
        //        //    "Southampton",
        //        //    //"Tottenham Hotspur",
        //        //    //"Watford",
        //        //    //"West Ham United",
        //        //    //"Wolverhampton Wanderers"
        //        //};
        //        var numberOfRounds = teams.Count - 1;
        //        var fixture = new List<FixtureDto>();

        //        var round1 = new List<FixtureDto>();
        //        var round2 = new List<FixtureDto>();

        //        for (var i = 0; i < numberOfRounds; i++)
        //        {

        //            for (var j = 0; j < teams.Count / 2; j++)
        //            {
        //                var homeTeam = teams[j];
        //                var awayTeam = teams[teams.Count - 1 - j];

        //                round1.Add(new FixtureDto
        //                {
        //                    HomeTeam = homeTeam,
        //                    AwayTeam = awayTeam
        //                });
        //                round2.Add(new FixtureDto
        //                {
        //                    HomeTeam = awayTeam,
        //                    AwayTeam = homeTeam
        //                });
        //            }
                    
        //            //fixture.AddRange(round1);
        //            //fixture.AddRange(round2);

        //            //List<string> teamsCopy = new List<string>(); // Replace `Team` with the appropriate type

        //            teams.Insert(1, teams[numberOfRounds]);
        //            teams.RemoveAt(teams.Count - 1);

        //        }
        //        for(int i = 0; i < round1.Count; i++)
        //        {
        //            if(i % 2 == 0)
        //            {
        //                fixture.Add(round1[i]);
        //                fixture.Add(round2[round1.Count - 1 - i]);
        //            }
        //            else
        //            {
        //                fixture.Add(round2[round1.Count - 1 - i]);
        //                fixture.Add(round1[i]);
        //            }
        //        }
        //        Random rnd = new Random();
        //        var MyRandomArray = fixture.OrderBy(x => rnd.Next()).ToList();
        //        return MyRandomArray;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}
        [HttpGet]
        [ActionName("GenarateFixture")]
        public List<FixtureDto> GenarateFixture(int tournamentId)
        {
            //string[] teams = {
            //"Arsenal", "Aston Villa", "Brentford", "Brighton",
            // //"Burnley","Chelsea",
            // //   "Crystal Palace", "Everton", "Leeds United",
            // //   "Leicester City",
            ////"Liverpool", "Manchester City", "Manchester United", "Newcastle United", "Norwich City",
            ////"Southampton", "Tottenham Hotspur", "Watford", "West Ham United", "Wolverhampton Wanderers"
            //};
            var teamAll = _teamRepository.Where(x => x.Tournament.Id == tournamentId).ToList();
            List<string> teams = new List<string>();
            teamAll.ForEach(x =>
            {
                teams.Add(x.Name);
            });

            int totalRounds = teams.Count - 1;
            int matchesPerRound = teams.Count / 2;
            string[,] fixtures = new string[totalRounds, matchesPerRound * 2];

            for (int round = 0; round < totalRounds ; round++)
            {
                for (int match = 0; match < matchesPerRound; match++)
                {
                    int homeTeamIndex = (round + match) % (teams.Count - 1);
                    int awayTeamIndex = (teams.Count - 1 - match + round) % (teams.Count - 1);

                    // Adjust for odd number of teams
                    if (match == 0)
                    {
                        awayTeamIndex = teams.Count - 1;
                    }

                    fixtures[round, match * 2] = teams[homeTeamIndex];
                    fixtures[round, match * 2 + 1] = teams[awayTeamIndex];
                }
            }
            var fixture = new List<FixtureDto>();
            var fixture1= new List<FixtureDto>();
            var fixture2 = new List<FixtureDto>();
            for (int round = 0; round < totalRounds; round++)
            {
                for (int match = 0; match < matchesPerRound; match++)
                {
                    string homeTeam = fixtures[round, match * 2];
                    string awayTeam = fixtures[round, match * 2 + 1];
                    fixture1.Add(new FixtureDto
                    {
                        HomeTeam = homeTeam,
                        AwayTeam = awayTeam
                    });
                    fixture2.Add(new FixtureDto
                    {
                        HomeTeam = awayTeam,
                        AwayTeam = homeTeam
                    });
                }
            }
            fixture.AddRange(fixture1);
            fixture.AddRange(fixture2);
            var fix = Shuffle(fixture);
            return fix;
        }
        static List<FixtureDto> Shuffle(List<FixtureDto> fixtures)
        {
            Random random = new Random();
            List<FixtureDto> shuffledFixtures = fixtures;

            for (int i = 0; i < shuffledFixtures.Count - 1; i++)
            {
                if (shuffledFixtures[i].HomeTeam == shuffledFixtures[i + 1].HomeTeam || shuffledFixtures[i].AwayTeam == shuffledFixtures[i + 1].AwayTeam || shuffledFixtures[i].HomeTeam == shuffledFixtures[i + 1].AwayTeam || shuffledFixtures[i].AwayTeam == shuffledFixtures[i + 1].HomeTeam)
                {
                    // Swap the current fixture with a different fixture
                    int j = i + 1;
                    while (j < shuffledFixtures.Count &&
                           (shuffledFixtures[i].HomeTeam == shuffledFixtures[j].HomeTeam ||
                            shuffledFixtures[i].AwayTeam == shuffledFixtures[j].AwayTeam
                            || shuffledFixtures[i].HomeTeam == shuffledFixtures[j].AwayTeam
                            || shuffledFixtures[i].AwayTeam == shuffledFixtures[j].HomeTeam))
                    {
                        j++;
                    }

                    if (j < shuffledFixtures.Count)
                    {
                        FixtureDto temp = shuffledFixtures[i];
                        shuffledFixtures[i] = shuffledFixtures[j];
                        shuffledFixtures[j] = temp;
                    }
                }
            }

            return shuffledFixtures;
        }
    }

}

