using ActivityTracker.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActivityTracker.Api.Infrastructure
{
    internal class ActivitiesRepository : BlobRepository, IActivitiesRepository
    {
        public async Task<IEnumerable<Activity>> GetActivitiesAsync(string userId)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, GetBlobName(userId, DateTime.UtcNow.Year, DateTime.UtcNow.Month));
            return await ReadListAsync<Activity>(blobClient);
        }

        public async Task AddActivityAsync(string userId, Activity activity)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, GetBlobName(userId, activity.Date.Year, activity.Date.Month));
            var activities = await ReadListAsync<Activity>(blobClient);
            activities.Add(activity);
            await WriteListAsync(blobClient, activities);
        }

        public async Task DeleteActivityAsync(string userId, int year, int month, Guid id)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, GetBlobName(userId, year, month));
            var activities = await ReadListAsync<Activity>(blobClient);
            var activity = activities.First(i => i.Id == id);
            activities.Remove(activity);
            await WriteListAsync(blobClient, activities);
        }

        private static string GetBlobName(string userId, int year, int month)
        {
            return $"{userId}/{year}/{month}.json";
        }
    }
}
