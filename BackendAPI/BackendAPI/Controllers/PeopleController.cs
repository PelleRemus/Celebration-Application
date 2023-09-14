using Business.Interfaces;
using Common.DTOs;
using FluentValidation;
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
        private readonly IValidator<InputPersonDTO> _validator;

        public PeopleController(IPersonService personService, IValidator<InputPersonDTO> validator)
        {
            _personService = personService;
            _validator = validator;
        }

        [HttpGet("page/{page}")]
        [Authorize]
        public async Task<ActionResult<PeoplePageDTO>> GetPeoplePaginated(int page)
        {
            if (page < 1)
                return BadRequest("Page should be at least 1");

            var peoplePage = await _personService.GetPeoplePage(page);
            return Ok(peoplePage);
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
            try
            {
                var validationResult = _validator.Validate(person);
                if (!validationResult.IsValid)
                    return BadRequest(validationResult.ToString());
                if (string.IsNullOrEmpty(person.Password))
                    return BadRequest("Password is required!");

                var dbPerson = await _personService.PostPerson(person);
                return Created($"api/[controller]/{dbPerson.Id}", dbPerson);
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> EditPerson(int id, InputPersonDTO person)
        {
            try
            {
                var validationResult = _validator.Validate(person);
                if (!validationResult.IsValid)
                    return BadRequest(validationResult.ToString());

                await _personService.EditPerson(id, person);
                return NoContent();
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
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
