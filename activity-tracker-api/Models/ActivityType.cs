using System;

namespace ActivityTracker.Api.Models
{
    public class ActivityType
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = default!;
    }
}
