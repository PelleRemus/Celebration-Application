namespace Common.DTOs
{
    public class PeoplePageDTO
    {
        public int Page { get; set; }
        public int CollectionSize { get; set; }
        public IEnumerable<PersonOverviewDTO> PeopleList { get; set; } = null!;
    }
}
