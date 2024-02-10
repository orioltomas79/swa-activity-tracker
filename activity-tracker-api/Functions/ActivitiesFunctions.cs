using System;
using System.Collections.Generic;
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

namespace ActivityTracker.Api.Functions
{
    public class ActivitiesFunctions : BaseFunction
    {
        private const string ActivitiesTag = "Activities";

        private readonly ILogger<ActivitiesFunctions> _logger;
        private readonly IActivitiesRepository _activitiesRepository;
        private readonly IActivityTypesRepository _activityTypesRepository;

        public ActivitiesFunctions(
            ILogger<ActivitiesFunctions> log,
            IActivitiesRepository activitiesRepository,
            IActivityTypesRepository activityTypesRepository)
        {
            _logger = log;
            _activitiesRepository = activitiesRepository;
            _activityTypesRepository = activityTypesRepository;
        }

        [FunctionName(nameof(GetActivities))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(GetActivities), Summary = "Gets all activities")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<Activity>), Description = "Returns all activities")]
        public async Task<ActionResult<List<Activity>>> GetActivities(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ApiEndpoints.Activities)] HttpRequest req)
        {
            _logger.LogInformation("GetActivity started.");

            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            var activities = await _activitiesRepository.GetActivitiesAsync(claimsPrincipal.GetUserId());

            return new OkObjectResult(activities);
        }

        [FunctionName(nameof(GetActivitiesStats))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(GetActivitiesStats), Summary = "Gets activities stats")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<ActivityType>), Description = "Returns activities stats")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.InternalServerError, contentType: "application/json", bodyType: typeof(ProblemDetails), Description = "Internal server error")]
        public async Task<ActionResult<List<GetActivitiesStatsDto>>> GetActivitiesStats(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ApiEndpoints.ActivitiesStats)] HttpRequest req)
        {
            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            var activities = await _activitiesRepository.GetActivitiesAsync(claimsPrincipal.GetUserId());

            var listGetActivitiesStatsDto = activities
                .GroupBy(a => a.ActivityTypeId)
                .Select(g => new GetActivitiesStatsDto { ActivityTypeId = g.Key, Count = g.Count() })
                .ToList();

            var activityTypes = await _activityTypesRepository.GetAllActivityTypesAsync(claimsPrincipal.GetUserId());

            foreach (var getActivitiesStatsDto in listGetActivitiesStatsDto)
            {
                getActivitiesStatsDto.ActivityTypeName = activityTypes.First(
                    a => a.Id == getActivitiesStatsDto.ActivityTypeId).Name;
            }

            return new OkObjectResult(listGetActivitiesStatsDto);
        }

        [FunctionName(nameof(AddActivity))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(AddActivity), Summary = "Adds a new activity")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateNewActivityRequest), Description = "The activity")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "application/json", bodyType: typeof(Activity), Description = "Returns the activity that has been created")]
        public async Task<ActionResult<Activity>> AddActivity(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = ApiEndpoints.Activities)] HttpRequest req)
        {
            _logger.LogInformation("{AddActivity} started.", nameof(AddActivity));

            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            var createNewActivityRequest = await GetRequestBodyAsync<CreateNewActivityRequest>(req);

            var activity = new Activity()
            {
                Id = Guid.NewGuid(),
                Date = createNewActivityRequest.Date,
                ActivityTypeId = createNewActivityRequest.ActivityType
            };

            await _activitiesRepository.AddActivityAsync(claimsPrincipal.GetUserId(), activity);

            return new CreatedAtActionResult("NA", "NA", null, activity);
        }

        [FunctionName(nameof(DeleteActivity))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(DeleteActivity), Summary = "Deletes an activity")]
        [OpenApiParameter(name: "year", In = ParameterLocation.Path, Required = true, Type = typeof(int), Description = "Activity year")]
        [OpenApiParameter(name: "month", In = ParameterLocation.Path, Required = true, Type = typeof(int), Description = "Activity month")]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid), Description = "Activity id")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent, Description = "When the activity has been deleted")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NotFound, Description = "When the activity is not found")]
        public async Task<ActionResult> DeleteActivity(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = ApiEndpoints.Activity)] HttpRequest req, int year, int month, Guid id)
        {
            _logger.LogInformation("{DeleteActivity} started.", nameof(DeleteActivity));

            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            await _activitiesRepository.DeleteActivityAsync(claimsPrincipal.GetUserId(), year, month, id);

            return new NoContentResult();
        }
    }
}

