using Azure.Storage.Blobs;
using Newtonsoft.Json;
using System.Text;

namespace ActivityTracker.FuncApi.Infrastructure
{
    internal abstract class BlobRepository
    {
        protected const string ContainerName = "activity-traker";

        protected static async Task<BlobClient> GetBlobClientAsync(string containerName, string blobName)
        {
            // Create blob client
            var connectionStr = Environment.GetEnvironmentVariable("StorageAccountConnectionString");
            var blobContainerClient = new BlobContainerClient(connectionStr, containerName);
            await blobContainerClient.CreateIfNotExistsAsync();

            // Get a reference to a blob in a container 
            var blobClient = blobContainerClient.GetBlobClient(blobName);

            return blobClient;
        }

        protected static async Task<List<T>> ReadListAsync<T>(BlobClient blobClient)
        {
            // Download the content
            if (!await blobClient.ExistsAsync()) return new List<T>();

            await using var memoryStream = new MemoryStream();
            await blobClient.DownloadToAsync(memoryStream).ConfigureAwait(false);
            var text = Encoding.UTF8.GetString(memoryStream.ToArray());

            var list = JsonConvert.DeserializeObject<List<T>>(text);

            if (list == null) return new List<T>();

            return list!;
        }

        protected static async Task WriteListAsync<T>(BlobClient blobClient, List<T> list)
        {
            // Upload the content
            var byteArray = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(list));
            await using var memoryStream = new MemoryStream(byteArray);
            await blobClient.UploadAsync(memoryStream, overwrite: true);
        }
    }
}
