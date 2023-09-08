using Common.Entities;

namespace Common.DTOs
{
    public class PersonOverviewDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;

        public PersonOverviewDTO() { }

        public PersonOverviewDTO(Person person)
        {
            Id = person.Id;
            FirstName = person.FirstName;
            LastName = person.LastName;
            Email = person.Email;
        }
    }
}
