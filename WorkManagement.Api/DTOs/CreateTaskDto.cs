namespace WorkManagement.Api.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public int AssignedToId { get; set; }
    }
}
