using ActivityTracker.FuncApi.Functions;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Moq;
using ActivityTracker.FuncApi.Infrastructure;
using ActivityTracker.FuncApi.Models;
using ActivityTrackerFuncApi.Tests.Utilities.Fakes;
using NuGet.Frameworks;
using Microsoft.AspNetCore.Mvc;

namespace ActivityTracker.FuncApi.Tests.Unit
{
    public class UnitTest1
    {
        private readonly ActivityTypesFunctions _sut;
        private readonly ILogger<ActivityTypesFunctions> _logger = NullLogger<ActivityTypesFunctions>.Instance;

        public UnitTest1()
        {
            var activityTypesRepositoryMock = new Mock<IActivityTypesRepository>();

            activityTypesRepositoryMock.Setup(x => x.GetAllActivityTypesAsync(It.IsAny<string>())).ReturnsAsync(ActivityTypeFaker.CreateMany(5));

            _sut = new ActivityTypesFunctions(_logger, activityTypesRepositoryMock.Object);
        }

        [Fact]
        public async Task Test1Async()
        {
            // Create a mock object of HttpRequest
            var httpRequestMock = new Mock<HttpRequest>();

            // Set up the expected properties
            httpRequestMock.SetupGet(r => r.Method).Returns("GET");
            httpRequestMock.SetupGet(r => r.Scheme).Returns("https");
            httpRequestMock.SetupGet(r => r.Host).Returns(new HostString("example.com"));
            httpRequestMock.SetupGet(r => r.Path).Returns("/api/resource");
            httpRequestMock.SetupGet(r => r.QueryString).Returns(new QueryString("?param1=value1&param2=value2"));
            httpRequestMock.SetupGet(r => r.Headers["HeaderName"]).Returns("HeaderValue");

            // Use the mock object as needed
            var httpRequest = httpRequestMock.Object;

            var actionResult = await _sut.GetActivityTypesAsync(httpRequest);
            var okObjectResult = (OkObjectResult)actionResult;
            var listActivityTypes = (List<ActivityType>)okObjectResult.Value!;
            Assert.NotNull(listActivityTypes);
        }
    }
}