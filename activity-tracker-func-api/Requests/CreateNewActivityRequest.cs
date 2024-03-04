using System.ComponentModel.DataAnnotations;

namespace ActivityTracker.FuncApi.Requests
{
    public class CreateNewActivityRequest
    {
        [Required]
        public Guid ActivityType { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
