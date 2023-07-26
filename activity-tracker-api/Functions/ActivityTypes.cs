using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using ActivityTracker.Api.Models;
using ActivityTracker.Api.Requests;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

namespace ActivityTracker.Api.Functions
{
    public class ActivityTypes
    {
        private const string ActivityTypesTag = "ActivityTypes";
        private readonly ILogger<ActivityTypes> _logger;

        public ActivityTypes(ILogger<ActivityTypes> log)
        {
            _logger = log;
        }

        [FunctionName(nameof(GetActivityTypes))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(GetActivityTypes), Summary = "Gets all activity types")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<ActivityType>), Description = "Returns all activity types")]
        public async Task<ActionResult<List<ActivityType>>> GetActivityTypes(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "ActivityTypes")] HttpRequest req)
        {
            _logger.LogInformation("GetActivityTypes started.");

            var blobClient = await GetBlobClientAsync();

            var list = await ReadListAsync(blobClient);

            return new OkObjectResult(list);
        }


        [FunctionName(nameof(AddActivityType))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(AddActivityType), Summary = "Adds a new activity type")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateNewActivityTypeRequest), Description = "The activity type")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "application/json", bodyType: typeof(ActivityType), Description = "Returns the activity type that has been created")]
        public async Task<ActionResult<ActivityType>> AddActivityType(
          [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "ActivityTypes")] HttpRequest req)
        {
            string requestBody;
            using (var streamReader = new StreamReader(req.Body))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }
            var createNewActivityTypeRequest = JsonConvert.DeserializeObject<CreateNewActivityTypeRequest>(requestBody);

            var activityType = new ActivityType()
            {
                Id = Guid.NewGuid(),
                Name = createNewActivityTypeRequest!.Name
            };

            var blobClient = await GetBlobClientAsync();

            var items = await ReadListAsync(blobClient);
            var list = items.ToList();
            list.Add(activityType);

            await WriteListAsync(blobClient, list);

            return new CreatedAtActionResult("actionName", "controllerName", null, activityType);
        }

        [FunctionName(nameof(DeleteActivityType))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(DeleteActivityType), Summary = "Deletes an activity type")]
        [OpenApiParameter("id", In = ParameterLocation.Path, Type = typeof(Guid), Description = "Activity Type id")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.NoContent, contentType: "application/json", bodyType: typeof(string), Description = "When the activity type has been deleted")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(string), Description = "When the activity type is not found")]
        public async Task<ActionResult> DeleteActivityType(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "ActivityTypes/{id:Guid}")] HttpRequest req, Guid id)
        {
            var blobClient = await GetBlobClientAsync();

            var list = await ReadListAsync(blobClient);

            var item = list.FirstOrDefault(i => i.Id == id);
            list.Remove(item);
            await WriteListAsync(blobClient, list);

            return new NoContentResult();
        }

        private async Task<BlobClient> GetBlobClientAsync()
        {
            // Create blob client
            var connectionStr = Environment.GetEnvironmentVariable("StorageAccountConnectionString");
            const string containerName = "testcontainer2";
            var blobContainerClient = new BlobContainerClient(connectionStr, containerName);
            await blobContainerClient.CreateIfNotExistsAsync();

            // Get a reference to a blob in a container 
            const string blobName = "activity_types.json";
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

