using ActivityTracker.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ActivityTracker.Api.Infrastructure
{
    public interface IActivityTypesRepository
    {
        Task<List<ActivityType>> GetAllActivityTypesAsync(string userId);

        Task AddActivityTypeAsync(string userId, ActivityType activityType);

        Task DeleteActivityTypeAsync(string userId, Guid id);
    }
}
