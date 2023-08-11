using System;

namespace ActivityTracker.Api.Requests
{
    public class CreateNewActivityRequest
    {
        public Guid ActivityType { get; set; }
        
        public DateTime Date { get; set; }
    }
}
