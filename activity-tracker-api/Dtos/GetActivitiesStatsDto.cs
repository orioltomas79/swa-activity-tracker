using System;

public class GetActivitiesStatsDto
{
    public Guid ActivityTypeId { get; set; }

    public string ActivityTypeName { get; set; }

    public int CountLast7Days { get; set; }

    public int CountLast14Days { get; set; }

    public int CountLast28Days { get; set; }
}