import {
  ActivitiesClient,
  ActivityTypesClient,
  UsersClient,
} from "./apiClient.g.nswag";

class ApiClient {
  public readonly activityTypes: ActivityTypesClient;
  public readonly activities: ActivitiesClient;
  public readonly users: UsersClient;

  static readonly API_PATH: string = "/api";

  constructor() {
    this.activityTypes = new ActivityTypesClient(ApiClient.API_PATH, this);
    this.activities = new ActivitiesClient(ApiClient.API_PATH, this);
    this.users = new UsersClient(ApiClient.API_PATH, this);
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
