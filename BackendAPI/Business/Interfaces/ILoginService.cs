using Common.DTOs;

namespace Business.Interfaces
{
    public interface ILoginService
    {
        Task<PersonDTO> Authenticate(UserLoginDTO userLogin);
    }
}
