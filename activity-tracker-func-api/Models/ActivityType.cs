using System.ComponentModel.DataAnnotations;

namespace ActivityTracker.FuncApi.Models
{
    public class ActivityType
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = default!;
    }
}
