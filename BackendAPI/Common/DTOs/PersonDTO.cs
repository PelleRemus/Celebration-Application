using Common.Entities;

namespace Common.DTOs
{
    public class PersonDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public int DaysBeforeNotice { get; set; }
        public bool IsAdmin { get; set; }

        public PersonDTO() { }

        public PersonDTO(Person person)
        {
            Id = person.Id;
            FirstName = person.FirstName;
            LastName = person.LastName;
            UserName = person.UserName;
            Email = person.Email;
            BirthDate = person.BirthDate;
            DaysBeforeNotice = person.DaysBeforeNotice;
            IsAdmin = person.Role == Roles.Admin.ToString();
        }
    }
}
