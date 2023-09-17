using Business.Interfaces;
using Common.Abstractions;
using Common.Configurations;

namespace Business.Implementations
{
    public class ScheduleJob : CronJobService
    {
        private readonly INotificationsService _notificationsService;

        public ScheduleJob(IScheduleConfig<ScheduleJob> config, INotificationsService notificationsService)
            : base(config.CronExpression, config.TimeZoneInfo)
        {
            _notificationsService = notificationsService;
        }

        public override async Task DoWork(CancellationToken cancellationToken)
        {
            await _notificationsService.SendBirthdayEmails();
        }
    }
}
