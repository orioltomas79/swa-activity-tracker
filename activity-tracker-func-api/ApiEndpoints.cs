
namespace ActivityTracker.FuncApi
{
    public static class ApiEndpoints
    {
        public const string Activities = "Activities";
        public const string ActivitiesStats = "Activities/Stats";
        public const string Activity = Activities + "/{year:int}/{month:int}/{id:Guid}";
        public const string ActivityTypes = "ActivityTypes";
        public const string ActivityType = ActivityTypes + "/{id:Guid}";
    }
}
