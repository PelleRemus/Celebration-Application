using Business.Interfaces;
using Common.DTOs;
using Common.Entities;
using Repository.Interfaces;

namespace Business.Implementations
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepo _personRepo;

        public PersonService(IPersonRepo personRepo)
        {
            _personRepo = personRepo;
        }

        public async Task<IEnumerable<PersonOverviewDTO>> GetAllPeople()
        {
            return (await _personRepo.GetAllPeople()).Select(t => new PersonOverviewDTO(t));
        }

        public async Task<PersonDTO> GetOnePerson(int id)
        {
            return new PersonDTO(await _personRepo.GetOnePerson(id));
        }

        public async Task<PersonDTO> PostPerson(PersonDTO person)
        {
            return new PersonDTO(await _personRepo.PostPerson(new Person(person)));
        }

        public async Task EditPerson(int id, PersonDTO inputPerson)
        {
            await _personRepo.EditPerson(id, new Person(inputPerson));
        }

        public async Task<PersonDTO> DeletePerson(int id)
        {
            return new PersonDTO(await _personRepo.DeletePerson(id));
        }
    }
}