using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WorkManagement.Api.Data;
using WorkManagement.Api.DTOs;
using WorkManagement.Api.Enums;
using WorkManagement.Api.Models;

namespace WorkManagement.Api.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    [Authorize]
    public class TasksController: ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var role = User.FindFirstValue(ClaimTypes.Role);

            IQueryable<TaskItem> query = _context.Tasks.Include(t => t.CreatedBy).Include(t => t.AssignedTo);

            if(role == Role.User.ToString())
            {
                query = query.Where(t => t.AssignedToId == userId);
            }
            var tasks = await query.OrderByDescending(t => t.CreatedAt).Select(t => new TaskResponseDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Status = t.Status,
                CreatedBy = t.CreatedBy.FullName,
                AssignedTo = t.AssignedTo.FullName,
                CreatedAt = t.CreatedAt
            }).ToListAsync();

            return Ok(tasks);
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> CreateTask(CreateTaskDto dto)
        {
            var creatorId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                CreatedById = creatorId,
                AssignedToId = dto.AssignedToId,
                Status = Enums.TaskStatus.Pending
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
