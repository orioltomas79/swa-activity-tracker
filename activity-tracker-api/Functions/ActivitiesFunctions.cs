using System;
using System.Collections.Generic;
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
    public class ActivitiesFunctions
    {
        private const string ActivitiesTag = "Activities";

        private readonly ILogger<ActivitiesFunctions> _logger;
        private readonly IActivitiesRepository _activitiesRepository;

        public ActivitiesFunctions(ILogger<ActivitiesFunctions> log, IActivitiesRepository activitiesRepository)
        {
            _logger = log;
            _activitiesRepository = activitiesRepository;
        }

        [FunctionName(nameof(GetActivities))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(GetActivities), Summary = "Gets all activities")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<Activity>), Description = "Returns all activities")]
        public async Task<ActionResult<List<Activity>>> GetActivities(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ApiEndpoints.Activities)] HttpRequest req)
        {
            _logger.LogInformation("GetActivityTypes started.");

            var list = new List<Activity>()
            {
                new ()
                {
                    Id = Guid.NewGuid(),
                    ActivityTypeId = Guid.NewGuid(),
                    Date = DateTime.Now,
                }
            };

            return new OkObjectResult(list);
        }

        [FunctionName(nameof(AddActivity))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(AddActivity), Summary = "Adds a new activity")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateNewActivityRequest), Description = "The activity")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "application/json", bodyType: typeof(Activity), Description = "Returns the activity that has been created")]
        public async Task<ActionResult<Activity>> AddActivity(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = ApiEndpoints.Activities)] HttpRequest req)
        {
            _logger.LogInformation("{AddActivity} started.", nameof(AddActivity));

            var activity = new Activity();

            return new CreatedAtActionResult("actionName", "controllerName", null, activity);
        }

        [FunctionName(nameof(DeleteActivity))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, operationId: nameof(DeleteActivity), Summary = "Deletes an activity")]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid), Description = "Activity id")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent, Description = "When the activity has been deleted")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NotFound, Description = "When the activity is not found")]
        public async Task<ActionResult> DeleteActivity(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = ApiEndpoints.Activity)] HttpRequest req, Guid id)
        {
            _logger.LogInformation("{DeleteActivity} started.", nameof(DeleteActivity));

            return new NoContentResult();
        }
    }
}

