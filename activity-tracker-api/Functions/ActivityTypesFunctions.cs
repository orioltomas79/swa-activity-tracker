using System;
using System.Collections.Generic;
using System.Diagnostics;
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
    public class ActivityTypesFunctions : BaseFunction
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

            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            var list = await _activityTypesRepository.GetAllActivityTypesAsync(claimsPrincipal.GetUserId());

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

            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            var createNewActivityTypeRequest = await GetRequestBodyAsync<CreateNewActivityTypeRequest>(req);

            var activityType = new ActivityType()
            {
                Id = Guid.NewGuid(),
                Name = createNewActivityTypeRequest!.Name
            };

            await _activityTypesRepository.AddActivityTypeAsync(claimsPrincipal.GetUserId(), activityType);

            return new CreatedAtActionResult("NA", "NA", null, activityType);
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

            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            await _activityTypesRepository.DeleteActivityTypeAsync(claimsPrincipal.GetUserId(), id);

            return new NoContentResult();
        }
    }
}

