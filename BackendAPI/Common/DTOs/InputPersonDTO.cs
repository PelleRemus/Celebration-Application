namespace Common.DTOs
{
    public class InputPersonDTO
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Password { get; set; }
        public DateTime BirthDate { get; set; }
        public int DaysBeforeNotice { get; set; }
        public bool IsAdmin { get; set; }
    }
}
