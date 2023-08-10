using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ActivityTracker.Api.Infrastructure;
using ActivityTracker.Api.Models;
using ActivityTracker.Api.Requests;
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
    public class ActivityTypesFunctions
    {
        private const string ActivityTypesTag = "ActivityTypes";
        private readonly ILogger<ActivityTypesFunctions> _logger;
        private readonly IActivityTypesRepository _activityTypesRepository;

        public ActivityTypesFunctions(ILogger<ActivityTypesFunctions> log, IActivityTypesRepository activityTypesRepository)
        {
            _logger = log;
            _activityTypesRepository = activityTypesRepository;
        }

        [FunctionName(nameof(GetActivityTypes))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(GetActivityTypes), Summary = "Gets all activity types")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<ActivityType>), Description = "Returns all activity types")]
        public async Task<ActionResult<List<ActivityType>>> GetActivityTypes(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ApiEndpoints.ActivityTypes)] HttpRequest req)
        {
            _logger.LogInformation("{GetActivityTypes} started.", nameof(GetActivityTypes));
            
            var list = await _activityTypesRepository.GetAllActivityTypes();

            return new OkObjectResult(list);
        }


        [FunctionName(nameof(AddActivityType))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(AddActivityType), Summary = "Adds a new activity type")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateNewActivityTypeRequest), Description = "The activity type")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "application/json", bodyType: typeof(ActivityType), Description = "Returns the activity type that has been created")]
        public async Task<ActionResult<ActivityType>> AddActivityType(
          [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = ApiEndpoints.ActivityTypes)] HttpRequest req)
        {
            _logger.LogInformation("{AddActivityType} started.", nameof(AddActivityType));

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

            var list = await _activityTypesRepository.GetAllActivityTypes();
            list.Add(activityType);

            await _activityTypesRepository.SaveActivityTypes(list);

            return new CreatedAtActionResult("actionName", "controllerName", null, activityType);
        }

        [FunctionName(nameof(DeleteActivityType))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(DeleteActivityType), Summary = "Deletes an activity type")]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid), Description = "Activity Type id")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent, Description = "When the activity type has been deleted")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NotFound, Description = "When the activity type is not found")]
        public async Task<ActionResult> DeleteActivityType(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = ApiEndpoints.ActivityType)] HttpRequest req, Guid id)
        {
            _logger.LogInformation("{DeleteActivityType} started.", nameof(DeleteActivityType));

            var list = await _activityTypesRepository.GetAllActivityTypes();

            var item = list.FirstOrDefault(i => i.Id == id);
            list.Remove(item);
            await _activityTypesRepository.SaveActivityTypes(list);

            return new NoContentResult();
        }
    }
}

