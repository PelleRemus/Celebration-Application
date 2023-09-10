using MimeKit;
using MailKit.Net.Smtp;
using RazorEngine;
using RazorEngine.Templating;

namespace Common.Helpers
{
    public static class EmailHelpers
    {
        public static void SendEmail(MimeMessage mimeMessage)
        {
            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587);
                client.Authenticate("pixelcelebrate@gmail.com", "amdvmrmitphcmblx");

                client.Send(mimeMessage);
            }
        }

        public static string RenderMailViewToString<T>(T model, string template, string templateName)
        {
            var htmlEmail = Engine.Razor.RunCompile(template, templateName, null, model);
            return htmlEmail;
        }
    }
}
