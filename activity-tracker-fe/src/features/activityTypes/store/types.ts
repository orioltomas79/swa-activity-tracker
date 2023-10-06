import { ThunkActionStatus } from "../../../app/store";
import { ActivityType } from "../../../api/apiClient.g.nswag";

export interface ActivityTypesState {
  activityTypes: ActivityType[];
  fetchStatus: ThunkActionStatus;
  operationStatus: ThunkActionStatus;
  error: string | undefined;
}

export const initialState: ActivityTypesState = {
  activityTypes: [],
  fetchStatus: "idle",
  operationStatus: "idle",
  error: undefined,
};
