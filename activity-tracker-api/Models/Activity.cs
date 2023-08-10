using System;

namespace ActivityTracker.Api.Models
{
    public class Activity
    {
        public Guid Id { get; set; }

        public Guid ActivityTypeId { get; set; }

        public DateTime Date { get; set; }
    }
}
