import appSettings from "../appSettings";
import { removeNullish } from "../utils/objectUtils";
import { types } from "util";
import {
  ActivitiesClient,
  ActivityTypesClient,
  ApiException,
} from "./apiClient.g.nswag";
import { showSnackbarForFailedResponse } from "./apiUtils";
import {
  HttpStatusCodes,
  defaultCallEndpointOptions,
  isProblemDetails,
  isValidationProblemDetails,
  type ApiResponse,
  type CallEndpointOptions,
  type FailedResponse,
} from "./types";

class ApiClient {
  public readonly activityTypes: ActivityTypesClient;
  public readonly activities: ActivitiesClient;

  constructor() {
    this.activityTypes = new ActivityTypesClient(appSettings.api.baseUrl, this);
    this.activities = new ActivitiesClient(appSettings.api.baseUrl, this);
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

  public callApiEndpoint = async <T>(
    api: string,
    endpointName: string,
    endpoint: Promise<T>,
    options: CallEndpointOptions | undefined
  ): Promise<ApiResponse<T>> => {
    const callEndpointOptions = {
      ...defaultCallEndpointOptions,
      ...removeNullish(options ?? {}),
    };

    try {
      const response = await endpoint;
      return { success: true, result: response };
    } catch (err) {
      const response = apiClient.handleException(
        err,
        api,
        endpointName,
        callEndpointOptions
      );
      return removeNullish(response);
    }
  };

  private getStatusCode = (err: unknown): number =>
    isProblemDetails(err) && err.status
      ? err.status
      : ApiException.isApiException(err)
      ? err.status
      : HttpStatusCodes.Status500InternalServerError;

  private getLogCustomData = (statusCode: number, err: unknown) => {
    let data: {} = { statusCode: statusCode };
    if (isProblemDetails(err)) {
      data = {
        ...data,
        exceptionId: err.ExceptionId,
        title: err.title,
        detail: err.detail,
      };
    } else if (ApiException.isApiException(err)) {
      data = {
        ...data,
        message: err.message,
        response: err.response,
        result: err.result,
      };
    } else if (types.isNativeError(err)) {
      data = {
        ...data,
        message: err.message,
        cause: err.cause,
        stack: err.stack,
      };
    } else {
      const originalError = typeof err === "object" ? { ...err } : { err: err };
      data = { ...data, ...originalError };
    }

    return data;
  };

  private getProblemDetailsFromApiException(err: ApiException) {
    const tryParse = (text: string) => {
      try {
        return JSON.parse(text);
      } catch {
        return undefined;
      }
    };

    const resultObject =
      typeof err.result === "string"
        ? tryParse(err.result)
        : typeof err.result === "object" && err.result !== null
        ? err.result
        : undefined;
    const responseObject = tryParse(err.response);
    const details = isProblemDetails(resultObject)
      ? resultObject
      : isProblemDetails(responseObject)
      ? responseObject
      : undefined;
    return details?.detail ?? details?.title ?? err.message;
  }

  private getReturnedErrorMessage = (statusCode: number, err: unknown) => {
    let message: string = "";

    if (
      statusCode === HttpStatusCodes.Status401Unauthorized ||
      statusCode === HttpStatusCodes.Status403Forbidden
    ) {
      message =
        "It appears your session has expired. Please refresh the page and try again.";
    } else if (isProblemDetails(err)) {
      message = err.detail ?? err.title ?? "";
    } else if (ApiException.isApiException(err)) {
      message = this.getProblemDetailsFromApiException(err);
    }

    return message.length
      ? message
      : "There was a problem dealing with your request. Please try again later.";
  };

  private handleException = (
    err: unknown,
    api: string,
    endpointName: string,
    callEndpointOptions: CallEndpointOptions
  ): FailedResponse => {
    err = err ?? {};
    if (appSettings.nodeEnv !== "production") {
      console.error(err);
    }

    const statusCode = this.getStatusCode(err);

    const response: FailedResponse = {
      success: false,
      statusCode,
      message:
        callEndpointOptions.errorMessage ??
        this.getReturnedErrorMessage(statusCode, err),
      exceptionId: isProblemDetails(err) ? err.ExceptionId : undefined,
      validationErrors: isValidationProblemDetails(err)
        ? err.errors
        : undefined,
    };

    if (
      callEndpointOptions.showSnackbarOnFail === true &&
      callEndpointOptions.skipSnackbarOnStatusCode !== statusCode
    ) {
      showSnackbarForFailedResponse(response);
    }
    return response;
  };
}

const apiClient = new ApiClient();

export default apiClient;
