using System;

public class GetActivitiesStatsDto
{
    public Guid ActivityTypeId { get; set; }

    public string ActivityTypeName {get; set; }
    
    public int Count { get; set; }
}