using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ActivityTracker.Api.Models;

namespace ActivityTracker.Api.Infrastructure;

public interface IActivitiesRepository
{
    Task<IEnumerable<Activity>> GetActivitiesAsync(string userId, int year, int month);

    Task<IEnumerable<Activity>> GetLastActivitiesAsync(string userId, int numWeeks);

    Task AddActivityAsync(string userId, Activity activity);

    Task DeleteActivityAsync(string userId, int year, int month, Guid id);
}