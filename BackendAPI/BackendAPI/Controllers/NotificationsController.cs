using Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationsService _notificationsService;

        public NotificationsController(INotificationsService notificationsService)
        {
            _notificationsService = notificationsService;
        }

        [HttpPost("emails")]
        public async Task<ActionResult> SendBirthdayEmails()
        {
            await _notificationsService.SendBirthdayEmails();
            return NoContent();
        }
    }
}
