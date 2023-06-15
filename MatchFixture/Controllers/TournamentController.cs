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
        public List<Tournament> GetTournaments()
        {
            return _tournamentRepository.GetAll().ToList();
        }

        [HttpPost]
        [ActionName("CreateTournament")]
        public IActionResult CreateTournament([FromBody] CreateTournamentDto input)
        {
            try
            {
                var tournament = new Tournament()
                {
                    Name = input.Name
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
                        _tournament.Name = input.Name;
                    }

                    _tournamentRepository.Update(_tournament);
                    _tournamentRepository.Commit();
                }
                catch (Exception ex)
                {

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

