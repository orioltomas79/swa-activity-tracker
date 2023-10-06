import axios, { AxiosInstance } from "axios";
import { ActivitiesClient, ActivityTypesClient, UsersClient } from "./apiClient.g.nswag";

class ApiClient {
  private readonly axios: AxiosInstance;
  public readonly activityTypes: ActivityTypesClient;
  public readonly activities: ActivitiesClient;
  public readonly users: UsersClient;

  constructor() {
    this.axios = axios.create({
      transformResponse: (data) => data,
    });
    this.activityTypes = new ActivityTypesClient("/api", this.axios);
    this.activities = new ActivitiesClient("/api", this.axios);
    this.users = new UsersClient("/api", this.axios);
  }
}

const apiClient = new ApiClient();

export default apiClient;
