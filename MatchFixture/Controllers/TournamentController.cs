using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatchFixture.Dtos;
using MatchFixture.Dtos.Tournaments;
using MatchFixture.Interfaces;
using MatchFixture.Models;
using Microsoft.AspNetCore.Mvc;

namespace MatchFixture.Controllers
{
    [Produces("application/json")]
    [Route("api/Tournaments/[action]")]
    [ApiController]
    public class TournamentController: ControllerBase
	{
        private readonly ITournamentRepository _tournamentRepository;

        public TournamentController(
            ITournamentRepository tournamentRepository
            )
        {
            _tournamentRepository = tournamentRepository;
        }

        [HttpGet]
        [ActionName("GetTournaments")]
        public List<TournamentDto> GetTournaments()
        {
            var tournaments = _tournamentRepository.GetAll().ToList();

            var returnResult = new List<TournamentDto>();

            tournaments.ForEach(x =>
            {
                returnResult.Add(new TournamentDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    StartMonth = x.StartMonth.Month.ToString("00"),
                    EndMonth = x.EndMonth.Month.ToString("00")
                });
            });
            return returnResult;
        }

        [HttpPost]
        [ActionName("CreateTournament")]
        public IActionResult CreateTournament([FromBody] CreateTournamentDto input)
        {
            try
            {
                var startDate = new DateTime(2023, int.Parse(input.StartMonth), 1);
                var endDate = startDate.AddMonths(int.Parse(input.EndMonth) - int.Parse(input.StartMonth) + 1);
                endDate = endDate.AddSeconds(-1);
                var tournament = new Tournament()
                {
                    Name = input.Name,
                    StartMonth = startDate,
                    EndMonth = endDate
                };

                _tournamentRepository.Add(tournament);
                _tournamentRepository.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ActionName("UpdateTournamentById")]
        public IActionResult UpdateTournamentById(int id, [FromBody] CreateTournamentDto input)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var _tournament = _tournamentRepository.Where(x => x.Id == id).FirstOrDefault();
                    if (_tournament == null)
                    {
                        return BadRequest();
                    }
                    if (_tournament != null)
                    {
                        var startDate = new DateTime(2023, int.Parse(input.StartMonth), 1);
                        var endDate = startDate.AddMonths(int.Parse(input.EndMonth) - int.Parse(input.StartMonth) + 1);
                        endDate = endDate.AddSeconds(-1);
                        _tournament.Name = input.Name;
                        _tournament.StartMonth = startDate;
                        _tournament.EndMonth = endDate;
                    }

                    _tournamentRepository.Update(_tournament);
                    _tournamentRepository.Commit();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok("");
        }


        [HttpGet]
        [ActionName("DeleteTournamentById")]
        public IActionResult DeleteTournamentById(int? id)
        {
            var _tournament = _tournamentRepository.Where(x => x.Id == id).FirstOrDefault();

            if (_tournament == null)
            {
                return NotFound();
            }
            _tournamentRepository.Delete(_tournament);
            _tournamentRepository.Commit();

            return Ok();
        }
    }
}

