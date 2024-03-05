using ActivityTracker.FuncApi.Models;
using Bogus;

namespace ActivityTrackerFuncApi.Tests.Utilities.Fakes
{
    public static class ActivityTypeFaker
    {
        public static List<ActivityType> CreateMany(int count, int seed = 1) 
        {
            var faker = GetFaker();
            faker.UseSeed(seed);
            return faker.Generate(count);
        }

        private static Faker<ActivityType> GetFaker() => new Faker<ActivityType>()
            .RuleFor(a => a.Id, Guid.NewGuid)
            .RuleFor(a => a.Name, f => f.Random.String());
    }
}
