using Business.Interfaces;
using Common.Entities;
using Common.Helpers;
using MimeKit;
using Repository.Interfaces;

namespace Business.Implementations
{
    public class NotificationsService : INotificationsService
    {
        private readonly IPersonRepo _personRepo;

        public NotificationsService(IPersonRepo personRepo)
        {
            _personRepo = personRepo;
        }

        public async Task SendBirthdayEmails()
        {
            List<Person> people = (await _personRepo.GetAllPeople()).ToList();
            foreach (Person person in people)
            {
                if (ShouldSendEmail(person))
                {
                    var recipients = people
                        .Where(p => !p.Equals(person))
                        .Select(p => p.Email);

                    var mailMessage = CreateEmail(person, recipients);
                    EmailHelpers.SendEmail(mailMessage);
                }
            }
        }

        private bool ShouldSendEmail(Person person)
        {
            DateTime birthdayWithNotice = new DateTime(DateTime.Now.Year, person.BirthDate.Month, person.BirthDate.Day);
            birthdayWithNotice = birthdayWithNotice.AddDays(-person.DaysBeforeNotice);
            return birthdayWithNotice.Date == DateTime.Now.Date;
        }

        private MimeMessage CreateEmail(Person person, IEnumerable<string> emailAddresses)
        {
            MimeMessage mimeMessage = new MimeMessage();
            mimeMessage.From.Add(MailboxAddress.Parse("pixelcelebrate@gmail.com"));
            mimeMessage.To.AddRange(emailAddresses.Select(address => MailboxAddress.Parse(address)));
            mimeMessage.Subject = $"It's Time to Celebrate! {person.FirstName} {person.LastName}'s Birthday Bash 🎉";

            // Add the email body
            dynamic model = new
            {
                FirstName = person.FirstName,
                LastName = person.LastName,
                BirthdayDate = person.BirthDate,
            };
            var builder = new BodyBuilder();
            builder.HtmlBody = EmailHelpers.RenderMailViewToString(model, GetTemplateContent("BirthdayEmail"), "BirthdayEmail");
            mimeMessage.Body = builder.ToMessageBody();

            return mimeMessage;
        }

        private string GetTemplateContent(string templateName)
        {
            var reader = new StreamReader($"../Business/EmailTemplates/{templateName}.cshtml");
            return reader.ReadToEnd();
        }
    }
}
