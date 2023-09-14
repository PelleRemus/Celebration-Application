using Business.Interfaces;
using Common.DTOs;
using Common.Helpers;
using Repository.Interfaces;

namespace Business.Implementations
{
    public class LoginService : ILoginService
    {
        private readonly IPersonRepo _personRepo;

        public LoginService(IPersonRepo personRepo)
        {
            _personRepo = personRepo;
        }

        public async Task<PersonDTO> Authenticate(UserLoginDTO userLogin)
        {
            var passwordHash = PasswordHelpers.EncodePasswordToBase64(userLogin.Password);
            var person = await _personRepo.LoginPerson(userLogin.UserName, passwordHash);
            return new PersonDTO(person);
        }
    }
}
