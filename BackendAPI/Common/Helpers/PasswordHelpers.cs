using System.Security.Cryptography;
using System.Text;

namespace Common.Helpers
{
    public static class PasswordHelpers
    {
        public static string EncodePasswordToBase64(string password)
        {
            byte[] bytes = Encoding.Unicode.GetBytes(password);
            byte[] inArray = SHA1.Create().ComputeHash(bytes);
            return Convert.ToBase64String(inArray);
        }
    }
}
