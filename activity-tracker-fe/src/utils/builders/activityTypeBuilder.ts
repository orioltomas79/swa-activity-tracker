import { Builder } from "builder-pattern";
import { Chance } from "chance";
import { ActivityType } from "../../api/apiClient.g.nswag";

export const activityTypeBuilder = (seed = 0) => {
  const chance = new Chance(seed);
  return Builder<ActivityType>({
    id: chance.name(),
    name: chance.name(),
  });
};
