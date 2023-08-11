using ActivityTracker.Api.Infrastructure;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(ActivityTracker.Api.Startup))]

namespace ActivityTracker.Api
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddTransient<IActivityTypesRepository, ActivityTypesRepository>();
            builder.Services.AddTransient<IActivitiesRepository, ActivitiesRepository>();
            builder.Services.AddLogging();
        }
    }
}
