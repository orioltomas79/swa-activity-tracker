using ActivityTracker.FuncApi.Models;

namespace ActivityTracker.FuncApi.Infrastructure;

public interface IActivitiesRepository
{
    Task<IEnumerable<Activity>> GetActivitiesAsync(string userId);

    Task<IEnumerable<Activity>> GetLastActivitiesAsync(string userId);

    Task AddActivityAsync(string userId, Activity activity);

    Task DeleteActivityAsync(string userId, int year, int month, Guid id);
}