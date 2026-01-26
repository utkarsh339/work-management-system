using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkManagement.Api.Data;
using WorkManagement.Api.DTOs;
using WorkManagement.Api.Helpers;
using WorkManagement.Api.Services;

namespace WorkManagement.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
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
            Console.WriteLine($"EMAIL RECEIVED: {request.Email}");
            Console.WriteLine($"PASSWORD RECEIVED: {request.Password}");

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                Console.WriteLine("USER NOT FOUND");
                return Unauthorized("Invalid credentials");
            }

            var hashed = PasswordHasher.Hash(request.Password);

            Console.WriteLine($"HASH FROM REQUEST: {hashed}");
            Console.WriteLine($"HASH FROM DB: {user.PasswordHash}");

            if (user.PasswordHash != hashed)
            {
                Console.WriteLine("PASSWORD MISMATCH");
                return Unauthorized("Invalid credentials");
            }

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
