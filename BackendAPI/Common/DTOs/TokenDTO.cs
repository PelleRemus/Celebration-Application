namespace Common.DTOs
{
    public class TokenDTO
    {
        public string Value { get; set; } = null!;
        public DateTime Expiry { get; set; }
        public int UserId { get; set; }
        public string UserRole { get; set; } = null!;
    }
}
