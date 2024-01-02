import axios, { AxiosInstance } from "axios";
import {
  ActivitiesClient,
  ActivityTypesClient,
  UsersClient,
} from "./apiClient.g.nswag";

class ApiClient {
  private readonly axios: AxiosInstance;
  public readonly activityTypes: ActivityTypesClient;
  public readonly activities: ActivitiesClient;
  public readonly users: UsersClient;

  // Mock api:
  // private static apiUrl: string = "http://localhost:3001/api";
  private static apiUrl: string = "/api";

  constructor() {
    this.axios = axios.create({
      transformResponse: (data) => data,
    });
    this.activityTypes = new ActivityTypesClient(ApiClient.apiUrl, this.axios);
    this.activities = new ActivitiesClient(ApiClient.apiUrl, this.axios);
    this.users = new UsersClient(ApiClient.apiUrl, this.axios);
  }
}

const apiClient = new ApiClient();

export default apiClient;
