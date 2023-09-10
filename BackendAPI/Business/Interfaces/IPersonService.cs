using Common.DTOs;

namespace Business.Interfaces
{
    public interface IPersonService
    {
        Task<IEnumerable<PersonOverviewDTO>> GetAllPeople();
        Task<PersonDTO> GetOnePerson(int id);
        Task<PersonDTO> PostPerson(InputPersonDTO person);
        Task EditPerson(int id, InputPersonDTO inputPerson);
        Task<PersonDTO> DeletePerson(int id);
    }
}
