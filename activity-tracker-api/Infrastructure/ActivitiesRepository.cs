using ActivityTracker.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ActivityTracker.Api.Infrastructure
{
    internal class ActivitiesRepository : IActivitiesRepository
    {
        public Task<IEnumerable<Activity>> GetActivities()
        {
            throw new NotImplementedException();
        }
    }
}
