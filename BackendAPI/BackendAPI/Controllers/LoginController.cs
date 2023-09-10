using Business.Interfaces;
using Common.DTOs;
using Common.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly ILoginService _loginService;

        public LoginController(IConfiguration config, ILoginService loginService)
        {
            _config = config;
            _loginService = loginService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Login(UserLoginDTO userLogin)
        {
            try
            {
                var user = await _loginService.Authenticate(userLogin);
                var token = GenerateToken(user);
                return Ok(token);
            }
            catch
            {
                return BadRequest("Username or Password are incorrect");
            }
        }

        private TokenDTO GenerateToken(PersonDTO user)
        {
            var securityKey = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? "");
            var credentials = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.IsAdmin ? Roles.Admin.ToString() : Roles.User.ToString())
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials);

            return new TokenDTO
            {
                Value = new JwtSecurityTokenHandler().WriteToken(token),
                Expiry = DateTime.Now.AddDays(7),
                UserId = user.Id,
                UserRole = user.IsAdmin ? Roles.Admin.ToString() : Roles.User.ToString()
            };
        }
    }
}
