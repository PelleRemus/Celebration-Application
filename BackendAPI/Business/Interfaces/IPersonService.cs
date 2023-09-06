using Common.DTOs;

namespace Business.Interfaces
{
    public interface IPersonService
    {
        Task<IEnumerable<PersonDTO>> GetAllPeople();
        Task<PersonDTO> GetOnePerson(int id);
        Task<PersonDTO> PostPerson(PersonDTO person);
        Task EditPerson(int id, PersonDTO inputPerson);
        Task<PersonDTO> DeletePerson(int id);
    }
}
