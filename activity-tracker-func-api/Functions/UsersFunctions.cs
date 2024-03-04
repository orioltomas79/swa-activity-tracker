using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace ActivityTracker.FuncApi.Functions
{
    public class UsersFunctions
    {
        private const string UsersTag = "Users";
        private readonly ILogger<UsersFunctions> _logger;

        public UsersFunctions(ILogger<UsersFunctions> log)
        {
            _logger = log;
        }

        [Function(nameof(GetUserClaims))]
        [OpenApiOperation(tags: new[] { UsersTag }, operationId: nameof(GetUserClaims), Summary = "Gets current user claims")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(UserClaims), Description = "The OK response")]
        public IActionResult GetUserClaims(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req)
        {
            _logger.LogInformation("GetUserClaims function processed a request.");

            var claimsPrincipal = StaticWebAppsAuth.GetClaimsPrincipal(req);

            var userClaims = new UserClaims()
            {
                Name = claimsPrincipal.Identity!.Name!,
                AuthType = claimsPrincipal.Identity.AuthenticationType!
            };

            return new OkObjectResult(userClaims);
        }

        public class UserClaims
        {
            [Required]
            public string Name { get; set; } = string.Empty;

            [Required]
            public string AuthType { get; set; } = string.Empty;
        }
    }
}

