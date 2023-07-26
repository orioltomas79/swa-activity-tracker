import apiClient from "./apiClient";
import type {
  ActivityType,
  CreateNewActivityTypeRequest,
} from "./apiClient.g.nswag";

export type CreateActivityTypePayload = CreateNewActivityTypeRequest;

const activityTypesApi = {
  getActivityTypes: (): Promise<ActivityType[]> =>
    apiClient.activityTypes.getActivityTypes(),
  createActivityType: (
    payload: CreateActivityTypePayload
  ): Promise<ActivityType> => apiClient.activityTypes.addActivityType(payload),
  deleteActivityType: (activityTypeGuid: string): Promise<string> =>
    apiClient.activityTypes.deleteActivityType(activityTypeGuid),
};

export default activityTypesApi;
