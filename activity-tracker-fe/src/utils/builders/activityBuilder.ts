import { Builder } from "builder-pattern";
import { Chance } from "chance";
import { Activity } from "../../api/apiClient.g.nswag";

export const activityBuilder = (seed = 0) => {
  const chance = new Chance(seed);
  return Builder<Activity>({
    id: chance.name(),
    activityTypeId: chance.guid.toString(),
    date: new Date().toString(),
  });
};
