using Business.Interfaces;
using Common.DTOs;
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
            var person = await _personRepo.LoginPerson(userLogin.UserName, userLogin.Password);
            return new PersonDTO(person);
        }
    }
}
