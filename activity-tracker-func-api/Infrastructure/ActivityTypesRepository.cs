using ActivityTracker.FuncApi.Models;

namespace ActivityTracker.FuncApi.Infrastructure
{
    internal class ActivityTypesRepository : BlobRepository, IActivityTypesRepository
    {
        public async Task<List<ActivityType>> GetAllActivityTypesAsync(string userId)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, GetBlobName(userId));
            return await ReadListAsync<ActivityType>(blobClient);
        }

        public async Task AddActivityTypeAsync(string userId, ActivityType activityType)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, GetBlobName(userId));
            var activityTypes = await ReadListAsync<ActivityType>(blobClient);
            activityTypes.Add(activityType);
            await WriteListAsync(blobClient, activityTypes);
        }

        public async Task DeleteActivityTypeAsync(string userId, Guid id)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, GetBlobName(userId));
            var activityTypes = await ReadListAsync<ActivityType>(blobClient);
            var activityType = activityTypes.First(i => i.Id == id);
            activityTypes.Remove(activityType);
            await WriteListAsync(blobClient, activityTypes);
        }

        private static string GetBlobName(string userId)
        {
            return $"{userId}/ActivityTypes.json";
        }
    }
}
