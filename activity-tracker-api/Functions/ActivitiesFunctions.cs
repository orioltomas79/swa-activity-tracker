using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using ActivityTracker.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;

namespace ActivityTracker.Api.Functions
{
    public class ActivitiesFunctions
    {
        private const string ActivitiesTag = "Activities";

        private readonly ILogger<ActivitiesFunctions> _logger;

        public ActivitiesFunctions(ILogger<ActivitiesFunctions> log)
        {
            _logger = log;
        }

        [FunctionName(nameof(GetActivities))]
        [OpenApiOperation(tags: new[] { ActivitiesTag }, Summary = "Gets all activities")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<ActivitiesFunctions>), Description = "Returns all activities")]
        public async Task<ActionResult<List<Activity>>> GetActivities(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "Activities")] HttpRequest req)
        {
            _logger.LogInformation("GetActivityTypes started.");

            var list = new List<Activity>()
            {
                new ()
                {
                    Id = Guid.NewGuid(),
                    Completed = true
                }
            };

            return new OkObjectResult(list);
        }
    }
}

