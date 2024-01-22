import apiClient from "./apiClient";
import type { CreateNewActivityTypeRequest } from "./apiClient.g.nswag";
import type { ApiResponse, CallEndpointOptions, ActivityType } from "./types";

export type CreateActivityTypePayload = CreateNewActivityTypeRequest;

/**
 * activityTypesApi - In this case we did not create a class. We used an Object Literal.
 */
const activityTypesApi = {
  /**
   * Calls the apiClient to get the activity types
   * @param options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns a Promise<ApiResponse<ActivityType[]>>
   */
  getActivityTypes: (
    options?: CallEndpointOptions
  ): Promise<ApiResponse<ActivityType[]>> =>
    apiClient.callApiEndpoint(
      apiClient.activityTypes.getActivityTypes(),
      options
    ),

  /**
   * Calls the apiClient to add an activity type
   * @param payload CreateActivityTypePayload
   * @param options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns a Promise<ApiResponse<ActivityType>>
   */
  createActivityType: (
    payload: CreateActivityTypePayload,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<ActivityType>> =>
    apiClient.callApiEndpoint(
      apiClient.activityTypes.addActivityType(payload),
      options
    ),

  /**
   * Calls the apiClient to delete an activity type
   * @param activityTypeGuid string
   * @param options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns a Promise<ApiResponse<void>>
   */
  deleteActivityType: (
    activityTypeGuid: string,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<void>> =>
    apiClient.callApiEndpoint(
      apiClient.activityTypes.deleteActivityType(activityTypeGuid),
      options
    ),
};

export default activityTypesApi;
