import apiClient from "./apiClient";
import type { CreateNewActivityRequest } from "./apiClient.g.nswag";
import type { ApiResponse, CallEndpointOptions, Activity } from "./types";

export type CreateActivityPayload = CreateNewActivityRequest;

const activitiesApi = {
  getActivities: (
    options?: CallEndpointOptions
  ): Promise<ApiResponse<Activity[]>> =>
    apiClient.callApiEndpoint(apiClient.activities.getActivities(), options),
  createActivity: (
    payload: CreateActivityPayload,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<Activity>> =>
    apiClient.callApiEndpoint(
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
      apiClient.activities.deleteActivity(year, month, id),
      options
    ),
};

export default activitiesApi;
