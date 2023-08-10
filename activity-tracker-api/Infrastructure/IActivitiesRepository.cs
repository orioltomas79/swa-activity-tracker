using System.Collections.Generic;
using System.Threading.Tasks;
using ActivityTracker.Api.Models;

namespace ActivityTracker.Api.Infrastructure;

public interface IActivitiesRepository
{
    Task<IEnumerable<Activity>> GetActivities();
}