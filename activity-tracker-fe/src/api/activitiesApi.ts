import apiClient from "./apiClient";
import type { CreateNewActivityRequest } from "./apiClient.g.nswag";
import type { ApiResponse, CallEndpointOptions, Activity } from "./types";

export type CreateActivityPayload = CreateNewActivityRequest;

const apiName = "activities";
const activitiesApi = {
  getActivities: (
    options?: CallEndpointOptions
  ): Promise<ApiResponse<Activity[]>> =>
    apiClient.callApiEndpoint(
      apiName,
      activitiesApi.getActivities.name,
      apiClient.activities.getActivities(),
      options
    ),
  createActivity: (
    payload: CreateActivityPayload,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<Activity>> =>
    apiClient.callApiEndpoint(
      apiName,
      activitiesApi.createActivity.name,
      apiClient.activities.addActivity(payload),
      options
    ),
  deleteActivity: (
    year: number,
    month: number,
    id: string,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<void>> =>
    apiClient.callApiEndpoint(
      apiName,
      activitiesApi.deleteActivity.name,
      apiClient.activities.deleteActivity(year, month, id),
      options
    ),
};

export default activitiesApi;
