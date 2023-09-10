using Common.Entities;

namespace Repository.Interfaces
{
    public interface IPersonRepo
    {
        Task<IEnumerable<Person>> GetAllPeople();
        Task<Person> GetOnePerson(int id);
        Task<Person> LoginPerson(string userName, string password);
        Task<Person> PostPerson(Person person);
        Task EditPerson(int id, Person inputPerson);
        Task<Person> DeletePerson(int id);
    }
}
