import { ThunkActionStatus } from "../../../app/store";
import { ActivityType } from "../../../api/apiClient.g.nswag";

export interface ActivityTypesState {
  activityTypes: ActivityType[];
  status: ThunkActionStatus;
  error: string | undefined;
}

export const initialState: ActivityTypesState = {
  activityTypes: [],
  status: "idle",
  error: undefined,
};
