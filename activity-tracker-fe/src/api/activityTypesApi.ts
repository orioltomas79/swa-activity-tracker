import apiClient from "./apiClient";
import type { CreateNewActivityTypeRequest } from "./apiClient.g.nswag";
import type { ApiResponse, CallEndpointOptions, ActivityType } from "./types";

export type CreateActivityTypePayload = CreateNewActivityTypeRequest;

const apiName = "activityTypes";
const activityTypesApi = {
  getActivityTypes: (
    options?: CallEndpointOptions
  ): Promise<ApiResponse<ActivityType[]>> =>
    apiClient.callApiEndpoint(
      apiName,
      activityTypesApi.getActivityTypes.name,
      apiClient.activityTypes.getActivityTypes(),
      options
    ),

  createActivityType: (
    payload: CreateActivityTypePayload,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<ActivityType>> =>
    apiClient.callApiEndpoint(
      apiName,
      activityTypesApi.createActivityType.name,
      apiClient.activityTypes.addActivityType(payload),
      options
    ),

  deleteActivityType: (
    activityTypeGuid: string,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<void>> =>
    apiClient.callApiEndpoint(
      apiName,
      activityTypesApi.deleteActivityType.name,
      apiClient.activityTypes.deleteActivityType(activityTypeGuid),
      options
    ),
};

export default activityTypesApi;
