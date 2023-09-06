using Common.DTOs;

namespace Common.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public int DaysBeforeNotice { get; set; }

        public Person() { }

        public Person(PersonDTO person)
        {
            Id = person.Id;
            FirstName = person.FirstName;
            LastName = person.LastName;
            UserName = person.UserName;
            Email = person.Email;
            Password = person.Password;
            BirthDate = person.BirthDate;
            DaysBeforeNotice = person.DaysBeforeNotice;
        }
    }
}
