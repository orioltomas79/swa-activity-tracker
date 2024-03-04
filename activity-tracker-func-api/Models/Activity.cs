using System.ComponentModel.DataAnnotations;

namespace ActivityTracker.FuncApi.Models
{
    public class Activity
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid ActivityTypeId { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
