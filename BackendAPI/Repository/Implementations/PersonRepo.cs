using Microsoft.EntityFrameworkCore;
using Common.Entities;
using Repository.Interfaces;

namespace Repository.Implementations
{
    public class PersonRepo : IPersonRepo
    {
        public readonly DatabaseContext _dbContext;

        public PersonRepo(DatabaseContext db)
        {
            _dbContext = db;
        }

        public async Task<IEnumerable<Person>> GetAllPeople()
        {
            return await _dbContext.People.ToListAsync();
        }

        public async Task<Person> GetOnePerson(int id)
        {
            Person? person = await _dbContext.People.FindAsync(id);
            if (person == null)
                throw new KeyNotFoundException($"Could not find person with id {id}");

            return person;
        }

        public async Task<Person> LoginPerson(string userName, string password)
        {
            Person? person = await _dbContext.People.FirstOrDefaultAsync(p =>
                p.UserName == userName && p.Password == password);
            if (person == null)
                throw new KeyNotFoundException($"UserName or password are incorrect!");

            return person;
        }

        public async Task<Person> PostPerson(Person inputPerson)
        {
            Person? person = await _dbContext.People
                .FirstOrDefaultAsync(p => p.UserName == inputPerson.UserName);
            if (person is not null)
                throw new InvalidOperationException($"Username '{inputPerson.UserName}' is already taken");

            _dbContext.People.Add(inputPerson);
            await _dbContext.SaveChangesAsync();
            return inputPerson;
        }

        public async Task EditPerson(int id, Person inputPerson)
        {
            Person? person = await _dbContext.People
                .FirstOrDefaultAsync(p => p.UserName == inputPerson.UserName);
            if (person is not null)
                throw new InvalidOperationException($"Username '{inputPerson.UserName}' is already taken");

            person = await _dbContext.People.FindAsync(id);
            if (person is null)
                throw new KeyNotFoundException($"Could not find person with id {id}");

            person.FirstName = inputPerson.FirstName;
            person.LastName = inputPerson.LastName;
            person.UserName = inputPerson.UserName;
            person.Email = inputPerson.Email;
            person.BirthDate = inputPerson.BirthDate;
            person.DaysBeforeNotice = inputPerson.DaysBeforeNotice;
            person.Role = inputPerson.Role;

            if (!string.IsNullOrEmpty(inputPerson.Password))
                person.Password = inputPerson.Password;

            await _dbContext.SaveChangesAsync();
        }

        public async Task<Person> DeletePerson(int id)
        {
            Person? person = await _dbContext.People.FindAsync(id);
            if (person is null)
                throw new KeyNotFoundException($"Could not find person with id {id}");

            _dbContext.People.Remove(person);
            await _dbContext.SaveChangesAsync();
            return person;
        }
    }
}
