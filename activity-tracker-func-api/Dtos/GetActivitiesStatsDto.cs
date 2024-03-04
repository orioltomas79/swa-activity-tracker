using System.ComponentModel.DataAnnotations;

public class GetActivitiesStatsDto
{
    [Required]
    public Guid ActivityTypeId { get; set; }

    [Required]
    public string ActivityTypeName { get; set; } = string.Empty;

    [Required]
    public decimal CountLast7Days { get; set; }

    [Required]
    public decimal AvgLast14Days { get; set; }

    [Required]
    public decimal AvgLast28Days { get; set; }
}