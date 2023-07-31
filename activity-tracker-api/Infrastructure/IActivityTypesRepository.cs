using ActivityTracker.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ActivityTracker.Api.Infrastructure
{
    public interface IActivityTypesRepository
    {
        public Task<List<ActivityType>> GetAllActivityTypes();

        public Task SaveActivityTypes(List<ActivityType> list);
    }
}
