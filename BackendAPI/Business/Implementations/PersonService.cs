using Business.Interfaces;
using Common.DTOs;
using Common.Entities;
using Common.Helpers;
using Repository.Interfaces;
using System;

namespace Business.Implementations
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepo _personRepo;

        public PersonService(IPersonRepo personRepo)
        {
            _personRepo = personRepo;
        }

        public async Task<PeoplePageDTO> GetPeoplePage(int page)
        {
            var peoplePage = new PeoplePageDTO();
            peoplePage.Page = page;
            peoplePage.CollectionSize = _personRepo.GetCollectionSize();
            peoplePage.PeopleList = (await _personRepo.GetPeoplePaginated(page)).Select(t => new PersonOverviewDTO(t));
            return peoplePage;
        }

        public async Task<PersonDTO> GetOnePerson(int id)
        {
            return new PersonDTO(await _personRepo.GetOnePerson(id));
        }

        public async Task<PersonDTO> PostPerson(InputPersonDTO person)
        {
            if (!string.IsNullOrEmpty(person.Password))
            {
                person.Password = PasswordHelpers.EncodePasswordToBase64(person.Password);
            }
            return new PersonDTO(await _personRepo.PostPerson(new Person(person)));
        }

        public async Task EditPerson(int id, InputPersonDTO inputPerson)
        {
            if (!string.IsNullOrEmpty(inputPerson.Password))
            {
                inputPerson.Password = PasswordHelpers.EncodePasswordToBase64(inputPerson.Password);
            }
            await _personRepo.EditPerson(id, new Person(inputPerson));
        }

        public async Task<PersonDTO> DeletePerson(int id)
        {
            return new PersonDTO(await _personRepo.DeletePerson(id));
        }
    }
}