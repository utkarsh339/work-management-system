using TaskStatus = WorkManagement.Api.Enums.TaskStatus;

namespace WorkManagement.Api.DTOs
{
    public class TaskResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public TaskStatus Status { get; set; }
        public string CreatedBy { get; set; } = null!;
        public string AssignedTo { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}
