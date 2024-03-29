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
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.InternalServerError, contentType: "application/json", bodyType: typeof(ProblemDetails), Description = "Internal server error")]
        public async Task<ActionResult<List<ActivityType>>> GetActivityTypes(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = ApiEndpoints.ActivityTypes)] HttpRequest req)
        {
            try
            {
                _logger.LogInformation("{GetActivityTypes} started.", nameof(GetActivityTypes));

                var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

                var list = await _activityTypesRepository.GetAllActivityTypesAsync(claimsPrincipal.GetUserId());

                return new OkObjectResult(list);
            }
            catch (Exception e)
            {
                // TODO: We don't want to write this try an catch for all methods. We should use a middleware.
                var problemDetails = new ProblemDetails()
                {
                    Detail = e.Message,
                };
                return new ObjectResult(problemDetails)
                {
                    StatusCode = 500
                };
            }
        }

        [FunctionName(nameof(AddActivityType))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(AddActivityType), Summary = "Adds a new activity type")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateNewActivityTypeRequest), Description = "The activity type")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "application/json", bodyType: typeof(ActivityType), Description = "Returns the activity type that has been created")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(ValidationProblemDetails), Description = "Bad request")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.InternalServerError, contentType: "application/json", bodyType: typeof(ProblemDetails), Description = "Internal server error")]
        public async Task<ActionResult<ActivityType>> AddActivityType(
          [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = ApiEndpoints.ActivityTypes)] HttpRequest req)
        {
            try
            {
                var createNewActivityTypeRequest = await GetRequestBodyAsync<CreateNewActivityTypeRequest>(req);
                // TODO: Improve this code to validate the request
                if (createNewActivityTypeRequest.Name == null)
                {
                    var validationProblemDetails = new ValidationProblemDetails()
                    {
                        Title = "Validation error",
                        Errors = { new KeyValuePair<string, string[]>("createNewActivityTypeRequest", new[] { "Name cannot be null" }) }
                    };
                    return new BadRequestObjectResult(validationProblemDetails);
                }

                _logger.LogInformation("{AddActivityType} started.", nameof(AddActivityType));

                var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

                var activityType = new ActivityType()
                {
                    Id = Guid.NewGuid(),
                    Name = createNewActivityTypeRequest!.Name
                };

                await _activityTypesRepository.AddActivityTypeAsync(claimsPrincipal.GetUserId(), activityType);

                return new CreatedAtActionResult("NA", "NA", null, activityType);
            }
            catch (Exception e)
            {
                // TODO: We don't want to write this try an catch for all methods. We should use a middleware.
                var problemDetails = new ProblemDetails()
                {
                    Detail = e.Message,
                };
                return new ObjectResult(problemDetails)
                {
                    StatusCode = 500
                };
            }
        }

        [FunctionName(nameof(DeleteActivityType))]
        [OpenApiOperation(tags: new[] { ActivityTypesTag }, operationId: nameof(DeleteActivityType), Summary = "Deletes an activity type")]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid), Description = "Activity Type id")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent, Description = "When the activity type has been deleted")]
        [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NotFound, Description = "When the activity type is not found")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.InternalServerError, contentType: "application/json", bodyType: typeof(ProblemDetails), Description = "Internal server error")]
        public async Task<ActionResult> DeleteActivityType(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = ApiEndpoints.ActivityType)] HttpRequest req, Guid id)
        {
            try
            {
                _logger.LogInformation("{DeleteActivityType} started.", nameof(DeleteActivityType));

                var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

                await _activityTypesRepository.DeleteActivityTypeAsync(claimsPrincipal.GetUserId(), id);

                return new NoContentResult();
            }
            catch (Exception e)
            {
                // TODO: We don't want to write this try an catch for all methods. We should use a middleware.
                var problemDetails = new ProblemDetails()
                {
                    Detail = e.Message,
                };
                return new ObjectResult(problemDetails)
                {
                    StatusCode = 500
                };
            }
        }
    }
}

