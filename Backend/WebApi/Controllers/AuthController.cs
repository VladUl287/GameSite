using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Password;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;

        public AuthController(IAuthRepository authRepository, IConfiguration configuration, IMapper mapper)
        {
            this.authRepository = authRepository;
            this.configuration = configuration;
            this.mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] AuthModel auth)
        {
            string salt = configuration.GetValue<string>("Secrets:PasswordSalt");
            string passwordHash = PasswordHasher.HashPassword(auth.Password, salt);

            var user = await authRepository.GetByEmail(auth.Email);

            if (user is null || user.Password != passwordHash)
            {
                return BadRequest(error: "Неверный email или пароль.");
            }

            var secret = configuration.GetValue<string>("Secrets:JwtSecret");
            var token = CreateToken(user.Id.ToString(), user.Email, user.Role.Name, secret);

            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] AuthModel auth)
        {
            var user = await authRepository.GetByEmail(auth.Email);

            if (user is not null)
            {
                return BadRequest("Пользователь с таким email уже зарегистрирован.");
            }

            var newUser = mapper.Map<User>(auth);
            string salt = configuration.GetValue<string>("Secrets:PasswordSalt");
            newUser.Password = PasswordHasher.HashPassword(auth.Password, salt);

            await authRepository.Create(newUser);

            return NoContent();
        }

        private static string CreateToken(string id, string email, string roleName, string secret)
        {
            var claims = new Claim[]
                {
                    new Claim("id", id),
                    new Claim("email", email),
                    new Claim("role", roleName)
                };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
