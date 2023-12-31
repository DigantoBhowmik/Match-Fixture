﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatchFixture.Dtos;
using MatchFixture.Dtos.Teams;
using MatchFixture.Interfaces;
using MatchFixture.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MatchFixture.Controllers
{
    [Produces("application/json")]
    [Route("api/Teams/[action]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;
        private readonly ITournamentRepository _tournamentRepository;

        public TeamController(
            ITeamRepository teamRepository,
            ITournamentRepository tournamentRepository
            )
        {
            _teamRepository = teamRepository;
            _tournamentRepository = tournamentRepository;
        }

        [HttpGet]
        [ActionName("GetTeams")]
        public List<Team> GetTeams(int tournamentId)
        {
            var teamList = _teamRepository.Where(x => x.Tournament.Id == tournamentId).ToList();
            return teamList;
        }

        [HttpPost]
        [ActionName("CreateTeam")]
        public IActionResult CreateTeam([FromBody] CreateTeamDto input)
        {
            try
            {
                var _tournament = _tournamentRepository.GetSingle(input.TournamentId);

                if(_tournament != null)
                {
                    var team = new Team()
                    {
                        Name = input.Name,
                        Tournament = _tournament,
                        CreatedOn = DateTime.UtcNow
                    };

                    _teamRepository.Add(team);
                    _teamRepository.Commit();
                }
                else
                {
                    BadRequest("Tournament Not Found");
                }
                

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ActionName("UpdateTeamById")]
        public IActionResult UpdateTeamById(int id, [FromBody] UpdateTeamDto input)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var _team = _teamRepository.Where(x => x.Id == id).FirstOrDefault();
                    if (_team == null)
                    {
                        return BadRequest();
                    }
                    if (_team != null)
                    {
                        _team.Name = input.Name;
                    }

                    _teamRepository.Update(_team);
                    _teamRepository.Commit();
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
        [ActionName("DeleteTeamById")]
        public IActionResult DeleteTeamById(int? id)
        {
            var _team = _teamRepository.Where(x => x.Id == id).FirstOrDefault();

            if (_team == null)
            {
                return NotFound();
            }
            _teamRepository.Delete(_team);
            _teamRepository.Commit();

            return Ok();
        }
    }
}



