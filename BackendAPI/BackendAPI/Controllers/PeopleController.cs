using Business.Interfaces;
using Common.DTOs;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<IEnumerable<PersonDTO>>> GetAllPeople()
        {
            var people = await _personService.GetAllPeople();
            return Ok(people);
        }

        [HttpGet("{id}")]
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
        public async Task<ActionResult> PostPerson(PersonDTO person)
        {
            var dbPerson = await _personService.PostPerson(person);
            return Created($"/personitems/{dbPerson.Id}", dbPerson);
        }

        [HttpPut]
        public async Task<ActionResult> EditPerson(int id, PersonDTO person)
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

        [HttpDelete]
        public async Task<ActionResult> DeletePerson(int id)
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
