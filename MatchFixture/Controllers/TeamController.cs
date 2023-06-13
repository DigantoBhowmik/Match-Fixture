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
    }
}

