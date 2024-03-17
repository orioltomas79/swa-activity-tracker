using ActivityTracker.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActivityTracker.Api.Infrastructure
{
    internal class ActivitiesRepository : BlobRepository, IActivitiesRepository
    {
        public async Task<IEnumerable<Activity>> GetActivitiesAsync(string userId, int year, int month)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, GetBlobName(userId, year, month));
            return await ReadListAsync<Activity>(blobClient);
        }

        public async Task<IEnumerable<Activity>> GetLastActivitiesAsync(string userId, int numWeeks)
        {
            var result = new List<Activity>();
            var date = DateTime.Now;

            int numMonths = (numWeeks / 4) + 1; 
            for (int i = 0; i < numMonths; i++)
            {
                var blobClient = await GetBlobClientAsync(ContainerName,  GetBlobName(userId, date.Year, date.Month));
                var activities = await ReadListAsync<Activity>(blobClient);

                result.AddRange(activities);
                date = GetPreviousMonthDate(date.Year, date.Month);
            }
            
            return result.Where(x => x.Date > DateTime.Now.AddDays(-7 * numWeeks));
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

        private static DateTime GetPreviousMonthDate(int year, int month)
        {
            var firstDayOfMonth = new DateTime(year, month, 1);
            var lastDayOfPreviousMonth = firstDayOfMonth.AddDays(-1);
            return lastDayOfPreviousMonth;
        }
    }
}
