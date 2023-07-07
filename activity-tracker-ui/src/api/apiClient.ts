/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosInstance } from "axios";
import { Client } from "./apiClient.g.nswag";

class ApiClient {
  private readonly axios: AxiosInstance;
  public readonly client: Client;

  constructor() {
    this.axios = axios.create({
      transformResponse: (data) => data,
    });
    this.client = new Client("/api", this.axios);
  }
}

const apiClient = new ApiClient();

export default apiClient;
