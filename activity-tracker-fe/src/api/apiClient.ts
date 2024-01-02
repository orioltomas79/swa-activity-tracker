import {
  ActivitiesClient,
  ActivityTypesClient,
  UsersClient,
} from "./apiClient.g.nswag";

class ApiClient {
  public readonly activityTypes: ActivityTypesClient;
  public readonly activities: ActivitiesClient;
  public readonly users: UsersClient;

  // Mock api:
  // private static apiUrl: string = "http://localhost:3001/api";
  private static apiUrl: string = "/api";

  constructor() {
    this.activityTypes = new ActivityTypesClient(ApiClient.apiUrl, this);
    this.activities = new ActivitiesClient(ApiClient.apiUrl, this);
    this.users = new UsersClient(ApiClient.apiUrl, this);
  }

  public fetch(
    url: RequestInfo,
    init?: RequestInit | undefined
  ): Promise<Response> {
    init = init ?? {};
    init.headers = init.headers ?? {};
    init.headers = {
      ...init.headers,
    };
    return window.fetch(url, init);
  }
}

const apiClient = new ApiClient();

export default apiClient;
