using System;
using System.Collections.Generic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatchFixture.Dtos;
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

        public TeamController(
            ITeamRepository teamRepository
            )
        {
            _teamRepository = teamRepository;
        }

        [HttpGet]
        [ActionName("GetTeams")]
        public List<Team> GetTeams()
        {
            return _teamRepository.GetAll().ToList();
        }

        [HttpPost]
        [ActionName("CreateTeam")]
        public IActionResult CreateTeam([FromBody] TeamDto input)
        {
            try
            {
                var team = new Team()
                {
                    Name = input.Name
                };

                _teamRepository.Add(team);
                _teamRepository.Commit();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ActionName("UpdateTeamById")]
        public IActionResult UpdateTeamById(int id, [FromBody] TeamDto input)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var _team = _teamRepository.FindBy(x => x.Id == id).FirstOrDefault();
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
            var _team = _teamRepository.FindBy(x => x.Id == id).FirstOrDefault();

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



