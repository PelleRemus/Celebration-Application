namespace Common.Configurations
{
    public class ScheduleConfig<T> : IScheduleConfig<T>
    {
        public string CronExpression { get; set; } = null!;
        public TimeZoneInfo TimeZoneInfo { get; set; } = null!;
    }
}
