using Microsoft.AspNetCore.Mvc;
using WorkManagement.Api.Data;
using WorkManagement.Api.DTOs;
using WorkManagement.Api.Helpers;
using WorkManagement.Api.Services;
using Microsoft.EntityFrameworkCore;

namespace WorkManagement.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtTokenGenerator _tokenGenerator;

        public AuthController(ApplicationDbContext context, JwtTokenGenerator tokenGenerator)
        {
            _context = context;
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u=> u.Email == request.Email);

            if (user == null)
                return Unauthorized("Invalid Credentials");

            var hashed = PasswordHasher.Hash(request.Password);

            if (user.PasswordHash != hashed)
                return Unauthorized("Invalid credentials");

            var token = _tokenGenerator.GenerateToken(user);

            return Ok(new LoginResponseDto
            {
                Token = token,
                Role = user.Role.ToString(),
                FullName = user.FullName
            });
        }
    }
}
