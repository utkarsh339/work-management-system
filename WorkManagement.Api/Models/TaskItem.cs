using TaskStatusEnum = WorkManagement.Api.Enums.TaskStatus;

namespace WorkManagement.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public TaskStatusEnum Status { get; set; } = TaskStatusEnum.Pending;

        // User who created the task
        public int CreatedById { get; set; }
        public User CreatedBy { get; set; } = null!;

        // User to whom the task is assigned
        public int AssignedToId { get; set; }
        public User AssignedTo { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
