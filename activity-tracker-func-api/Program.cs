using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using ActivityTracker.FuncApi.Infrastructure;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        services.AddTransient<IActivityTypesRepository, ActivityTypesRepository>();
        services.AddTransient<IActivitiesRepository, ActivitiesRepository>();
    })
    .Build();

host.Run();
