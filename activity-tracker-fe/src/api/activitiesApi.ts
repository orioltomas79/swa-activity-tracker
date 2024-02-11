import apiClient from "./apiClient";
import type {
  CreateNewActivityRequest,
  GetActivitiesStatsDto,
} from "./apiClient.g.nswag";
import type { ApiResponse, CallEndpointOptions, Activity } from "./types";

export type CreateActivityPayload = CreateNewActivityRequest;

/**
 * activitiesApi - In this case we did not create a class. We used an Object Literal.
 */
const activitiesApi = {
  /**
   * Calls the apiClient to get the activities
   * @param options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns a Promise<ApiResponse<Activity[]>>
   */
  getActivities: (
    options?: CallEndpointOptions
  ): Promise<ApiResponse<Activity[]>> =>
    apiClient.callApiEndpoint(apiClient.activities.getActivities(), options),
  /**
   * Calls the apiClient to get the activities stats
   * @param options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns a Promise<ApiResponse<GetActivitiesStatsDto[]>>
   */
  getActivitiesStats: (
    options?: CallEndpointOptions
  ): Promise<ApiResponse<GetActivitiesStatsDto[]>> =>
    apiClient.callApiEndpoint(
      apiClient.activities.getActivitiesStats(),
      options
    ),
  /**
   * Calls the apiClient to add an activity
   * @param payload CreateActivityPayload
   * @param options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns a Promise<ApiResponse<Activity>>
   */
  createActivity: (
    payload: CreateActivityPayload,
    options?: CallEndpointOptions
  ): Promise<ApiResponse<Activity>> =>
    apiClient.callApiEndpoint(
      apiClient.activities.addActivity(payload),
      options
    ),
  /**
   * Calls the apiClient to delete an activity
   * @param year Year of the activity
   * @param month Month of the activity
   * @param id Identifier of the activity
   * @param options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns a Promise<ApiResponse>
   */
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
