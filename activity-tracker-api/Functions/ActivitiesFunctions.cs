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
            var activities = await _activitiesRepository.GetLastActivitiesAsync(claimsPrincipal.GetUserId());

            return new OkObjectResult(activities);
        }

        [FunctionName(nameof(GetActivitiesStats))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(GetActivitiesStats), Summary = "Gets activities stats")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<GetActivitiesStatsDto>), Description = "Returns activities stats")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.InternalServerError, contentType: "application/json", bodyType: typeof(ProblemDetails), Description = "Internal server error")]
        public async Task<ActionResult<List<GetActivitiesStatsDto>>> GetActivitiesStats(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ApiEndpoints.ActivitiesStats)] HttpRequest req)
        {
            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            var activities = await _activitiesRepository.GetLastActivitiesAsync(claimsPrincipal.GetUserId());

            var DaysAgo7 = DateTime.Now.AddDays(-7).Date;
            var DaysAgo14 = DateTime.Now.AddDays(-7*2).Date;
            var DaysAgo21 = DateTime.Now.AddDays(-7*3).Date;
            var DaysAgo28 = DateTime.Now.AddDays(-7*4).Date;
            var WeeksAgo8 = DateTime.Now.AddDays(-7*8).Date;

            // Count activities in the last 7 days
            var statsLast7Days = activities
                .Where(a => a.Date >= DaysAgo7)
                .GroupBy(a => a.ActivityTypeId)
                .Select(g => new { ActivityTypeId = g.Key, Count = (decimal)g.Count() })
                .ToList();

            // Count activities in the last 8 to 14 days
            var statsLast8to14Days = activities
                .Where(a => a.Date >= DaysAgo14 && a.Date < DaysAgo7)
                .GroupBy(a => a.ActivityTypeId)
                .Select(g => new { ActivityTypeId = g.Key, Count = (decimal)g.Count() })
                .ToList();

            // Count activities in the last 15 to 21 days
            var statsLast15to21Days = activities
                .Where(a => a.Date >= DaysAgo21 && a.Date < DaysAgo14)
                .GroupBy(a => a.ActivityTypeId)
                .Select(g => new { ActivityTypeId = g.Key, Count = (decimal)g.Count() })
                .ToList();

            // Count activities in the last 22 to 28 days
            var statsLast22to28Days = activities
                .Where(a => a.Date >= DaysAgo28 && a.Date < DaysAgo21)
                .GroupBy(a => a.ActivityTypeId)
                .Select(g => new { ActivityTypeId = g.Key, Count = (decimal)g.Count() })
                .ToList();

            // Count activities in the last 28 days
            var statsLast4Weeks = activities
                .Where(a => a.Date >= DaysAgo28)
                .GroupBy(a => a.ActivityTypeId)
                .Select(g => new { ActivityTypeId = g.Key, Count = (decimal)g.Count() })
                .ToList();

            // Count activities in the last 28 days
            var statsLast5to8Weeks = activities
                .Where(a => a.Date >= WeeksAgo8 && a.Date < DaysAgo28)
                .GroupBy(a => a.ActivityTypeId)
                .Select(g => new { ActivityTypeId = g.Key, Count = (decimal)g.Count() })
                .ToList();

            // Get all activity types
            var listActivityTypes = await _activityTypesRepository.GetAllActivityTypesAsync(claimsPrincipal.GetUserId());

            // Generate the final list 
            var result = new List<GetActivitiesStatsDto>();
            foreach (var activityType in listActivityTypes)
            {
                result.Add(new GetActivitiesStatsDto()
                {
                    ActivityTypeId = activityType.Id,
                    ActivityTypeName = activityType.Name
                });
            }

            // Add statsLast7Days, statsLast14Days, statsLast28Days
            foreach (var stat in statsLast7Days)
            {
                var activityStat = result.FirstOrDefault(x => x.ActivityTypeId == stat.ActivityTypeId);
                if (activityStat != null)
                {
                    activityStat.CountLast7Days = stat.Count;
                }
            }

            foreach (var stat in statsLast8to14Days)
            {
                var activityStat = result.FirstOrDefault(x => x.ActivityTypeId == stat.ActivityTypeId);
                if (activityStat != null)
                {
                    activityStat.Count8to14DaysAgo = stat.Count;
                }
            }

            foreach (var stat in statsLast15to21Days)
            {
                var activityStat = result.FirstOrDefault(x => x.ActivityTypeId == stat.ActivityTypeId);
                if (activityStat != null)
                {
                    activityStat.Count15to21DaysAgo = stat.Count;
                }
            }

            foreach (var stat in statsLast22to28Days)
            {
                var activityStat = result.FirstOrDefault(x => x.ActivityTypeId == stat.ActivityTypeId);
                if (activityStat != null)
                {
                    activityStat.Count22to28DaysAgo = stat.Count;
                }
            }

            foreach (var stat in statsLast4Weeks)
            {
                var activityStat = result.FirstOrDefault(x => x.ActivityTypeId == stat.ActivityTypeId);
                if (activityStat != null)
                {
                    activityStat.CountLast4Weeks = stat.Count;
                }
            }

            foreach (var stat in statsLast5to8Weeks)
            {
                var activityStat = result.FirstOrDefault(x => x.ActivityTypeId == stat.ActivityTypeId);
                if (activityStat != null)
                {
                    activityStat.Count5to8Weeks = stat.Count;
                }
            }

            return new OkObjectResult(result.OrderBy(x => x.ActivityTypeName));
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

