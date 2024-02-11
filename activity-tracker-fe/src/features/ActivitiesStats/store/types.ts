import { ThunkActionStatus } from "../../../app/store";
import { GetActivitiesStatsDto } from "../../../api/apiClient.g.nswag";

export interface ActivitiesStatsState {
  activitiesStats: GetActivitiesStatsDto[];
  fetchStatus: ThunkActionStatus;
  operationStatus: ThunkActionStatus;
  error: string | undefined;
}

export const initialState: ActivitiesStatsState = {
  activitiesStats: [],
  fetchStatus: "idle",
  operationStatus: "idle",
  error: undefined,
};
