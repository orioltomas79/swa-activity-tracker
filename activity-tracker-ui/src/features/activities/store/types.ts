import { ThunkActionStatus } from "../../../app/store";
import { Activity } from "../../../api/apiClient.g.nswag";

export interface ActivitiesState {
  activities: Activity[];
  fetchStatus: ThunkActionStatus;
  operationStatus: ThunkActionStatus;
  error: string | undefined;
}

export const initialState: ActivitiesState = {
  activities: [],
  fetchStatus: "idle",
  operationStatus: "idle",
  error: undefined,
};
