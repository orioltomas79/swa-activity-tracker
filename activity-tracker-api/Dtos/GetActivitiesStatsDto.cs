using System;

public class GetActivitiesStatsDto
{
    public Guid ActivityTypeId { get; set; }

    public string ActivityTypeName { get; set; }

    public decimal CountLast7Days { get; set; }

    public decimal AvgLast14Days { get; set; }

    public decimal AvgLast28Days { get; set; }
}