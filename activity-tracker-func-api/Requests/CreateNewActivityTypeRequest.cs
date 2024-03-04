using System.ComponentModel.DataAnnotations;

namespace ActivityTracker.FuncApi.Requests
{
    public class CreateNewActivityTypeRequest
    {
        [Required]
        public string Name { get; set; } = default!;
    }
}
