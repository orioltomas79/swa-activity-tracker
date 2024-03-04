using ActivityTracker.FuncApi.Models;

namespace ActivityTracker.FuncApi.Infrastructure
{
    public interface IActivityTypesRepository
    {
        Task<List<ActivityType>> GetAllActivityTypesAsync(string userId);

        Task AddActivityTypeAsync(string userId, ActivityType activityType);

        Task DeleteActivityTypeAsync(string userId, Guid id);
    }
}
