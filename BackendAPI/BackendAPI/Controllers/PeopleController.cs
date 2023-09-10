using Business.Interfaces;
using Common.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PeopleController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PersonOverviewDTO>>> GetAllPeople()
        {
            var people = await _personService.GetAllPeople();
            return Ok(people);
        }

        [HttpGet("current")]
        [Authorize]
        public async Task<ActionResult<PersonDTO>> GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                int userId = int.Parse(userClaims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "0");
                return Ok(await _personService.GetOnePerson(userId));
            }
            return NotFound();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<PersonDTO>> GetOnePerson(int id)
        {
            try
            {
                var person = await _personService.GetOnePerson(id);
                return Ok(person);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PostPerson(InputPersonDTO person)
        {
            var dbPerson = await _personService.PostPerson(person);
            return Created($"/personitems/{dbPerson.Id}", dbPerson);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> EditPerson(int id, InputPersonDTO person)
        {
            try
            {
                await _personService.EditPerson(id, person);
                return NoContent();
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<PersonDTO>> DeletePerson(int id)
        {
            try
            {
                var person = await _personService.DeletePerson(id);
                return Ok(person);
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
