using System;

public class GetActivitiesStatsDto
{
    public Guid ActivityTypeId { get; set; }

    public string ActivityTypeName { get; set; }

    public decimal CountLast7Days { get; set; }

    public decimal Count8to14DaysAgo { get; set; }

    public decimal Count15to21DaysAgo { get; set; }

    public decimal Count22to28DaysAgo { get; set; }

    public decimal CountLast4Weeks { get; set; }

    public decimal Count5to8Weeks { get; set; }

    public decimal Count9to12Weeks { get; set; }

    public decimal Count13to16Weeks { get; set; }
}