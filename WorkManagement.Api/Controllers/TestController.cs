using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WorkManagement.Api.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet("public")]
        public IActionResult Public()
        {
            return Ok("This endpoint is public");
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult Protected()
        {
            return Ok("You are authenticated");
        }

        [Authorize(Roles = "Manager")]
        [HttpGet("manager-only")]
        public IActionResult ManagerOnly()
        {
            return Ok("You are a Manager");
        }

    }
}
