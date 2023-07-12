using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Abstractions;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;

namespace ActivityTracker.Api;

public class MyOpenApiConfigurationOptions : IOpenApiConfigurationOptions
{
    public OpenApiInfo Info { get; set; } = new OpenApiInfo()
    {
        Version = "1.0.0",
        Title = "Activity tracker API",
    };

    public List<OpenApiServer> Servers { get; set; } = new List<OpenApiServer>();

    public OpenApiVersionType OpenApiVersion { get; set; } = OpenApiVersionType.V3;

    public bool IncludeRequestingHostName { get; set; }

    public bool ForceHttp { get; set; }

    public bool ForceHttps { get; set; }

    public List<IDocumentFilter> DocumentFilters { get; set; }
}
