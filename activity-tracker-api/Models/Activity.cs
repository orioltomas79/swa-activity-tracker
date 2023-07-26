using System;

namespace ActivityTracker.Api.Models
{
    public class Activity
    {
        public Guid Id { get; set; }

        public bool Completed { get; set; }
    }
}
