using ActivityTracker.Api.Models;
using Azure.Storage.Blobs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace ActivityTracker.Api.Infrastructure
{
    public class ActivityTypesRepository : IActivityTypesRepository
    {
        private const string ContainerName = "activity-traker";
        private const string BlobName = "ActivityTypes.json";


        public async Task<List<ActivityType>> GetAllActivityTypes()
        {
            var blobClient = await GetBlobClientAsync(ContainerName, BlobName);
            return await ReadListAsync(blobClient);
        }

        public async Task SaveActivityTypes(List<ActivityType> list)
        {
            var blobClient = await GetBlobClientAsync(ContainerName, BlobName);
            await WriteListAsync(blobClient, list);
        }

        private static async Task<BlobClient> GetBlobClientAsync(string containerName, string blobName)
        {
            // Create blob client
            var connectionStr = Environment.GetEnvironmentVariable("StorageAccountConnectionString");
            var blobContainerClient = new BlobContainerClient(connectionStr, containerName);
            await blobContainerClient.CreateIfNotExistsAsync();

            // Get a reference to a blob in a container 
            var blobClient = blobContainerClient.GetBlobClient(blobName);

            return blobClient;
        }

        private async Task<List<ActivityType>> ReadListAsync(BlobClient blobClient)
        {
            // Download the content
            if (!await blobClient.ExistsAsync()) return new List<ActivityType>();

            await using var memoryStream = new MemoryStream();
            await blobClient.DownloadToAsync(memoryStream).ConfigureAwait(false);
            var text = Encoding.UTF8.GetString(memoryStream.ToArray());

            return JsonConvert.DeserializeObject<List<ActivityType>>(text);
        }

        private async Task WriteListAsync(BlobClient blobClient, List<ActivityType> list)
        {
            // Upload the content
            var byteArray = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(list));
            await using var memoryStream = new MemoryStream(byteArray);
            await blobClient.UploadAsync(memoryStream, overwrite: true);
        }
    }
}
