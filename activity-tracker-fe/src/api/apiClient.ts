import appSettings from "../appSettings";
import { removeNullish } from "../utils/objectUtils";
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

  /**
   * Our code does not call this function. But to be able to create Clients defined in apiClient.g.nswag,
   * we have to pass an instance of a class which has the fetch function implemented.
   */
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

  /**
   * Executes the endpoint: Promise<T>, which should be a function/endpoint provided by apiClient.g.nswag
   * @param endpoint A promise representing the API endpoint call. The promise is expected to resolve with a value of type T.
   * @param options An optional object of type CallEndpointOptions that provides additional configuration options for the API call.
   * @returns a Promise<ApiResponse<T>>
   */
  public callApiEndpoint = async <T>(
    endpoint: Promise<T>,
    options: CallEndpointOptions | undefined
  ): Promise<ApiResponse<T>> => {
    const callEndpointOptions = {
      ...defaultCallEndpointOptions,
      ...removeNullish(options ?? {}),
    };

    try {
      // If the promise resolves successfully, the method returns an object of type ApiResponse<T> with success set to true
      // and the result set to the resolved value of the endpoint promise.
      const response = await endpoint;
      return { success: true, result: response };
    } catch (err) {
      // If an error occurs during the execution the apiClient.handleException function is called.
      // The return value of apiClient.handleException is assigned to the response variable.
      const response = apiClient.handleException(err, callEndpointOptions);
      return removeNullish(response);
    }
  };

  /**
   * Receives and error, logs the error to the console, creates a FailedResponse form the error, shows the FailedResponse to the user
   * and returns the FailedResponse.
   * @param err An unknown type representing the error object
   * @param a CallEndpointOptions that provides additional options (showSnackbarOnFail, skipSnackbarOnStatusCode, errorMessage)
   * @returns the FailedResponse (success, statusCode, message, exceptionId, validationErrors)
   */
  private handleException = (
    err: unknown,
    callEndpointOptions: CallEndpointOptions
  ): FailedResponse => {
    err = err ?? {};

    // logs the error to the console
    if (appSettings.nodeEnv !== "production") {
      console.error(err);
    }

    // A response object of type FailedResponse is created
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

    // Shows the FailedResponse to the user
    if (
      callEndpointOptions.showSnackbarOnFail === true &&
      callEndpointOptions.skipSnackbarOnStatusCode !== statusCode
    ) {
      showSnackbarForFailedResponse(response);
    }

    // Returns the FailedResponse
    return response;
  };

  /**
   * The function first checks if the err object is of type ProblemDetails and if it has a status property.
   * If both conditions are true, it returns the value of the status property.
   * If the err object is not of type ProblemDetails, it checks if it is an instance of ApiException.
   * If it is, it returns the status property of the err object.
   * If none of the above conditions are met, the function returns the status code HttpStatusCodes.Status500InternalServerError.
   */
  private getStatusCode = (err: unknown): number =>
    isProblemDetails(err) && err.status
      ? err.status
      : ApiException.isApiException(err)
      ? err.status
      : HttpStatusCodes.Status500InternalServerError;

  /**
   * Receives the status code and the err and returns an error message.
   */
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

  /**
   * Receives an ApiException and returns a string with the details, the title or the message of the ApiException
   */
  private getProblemDetailsFromApiException(err: ApiException) {
    // Helper function called tryParse, which attempts to parse a given string as JSON and returns the parsed object.
    // If parsing fails, it returns undefined
    const tryParse = (text: string) => {
      try {
        return JSON.parse(text);
      } catch {
        return undefined;
      }
    };

    // It checks the type of the result property of the ApiException object:
    // If it is a string, it tries to parse it using the tryParse helper function.
    // If it is an object (excluding null), it assigns it directly to resultObject.
    // Otherwise, it assigns undefined to resultObject.
    const resultObject =
      typeof err.result === "string"
        ? tryParse(err.result)
        : typeof err.result === "object" && err.result !== null
        ? err.result
        : undefined;

    // It tries to parse the response property of the ApiException object and assigns the parsed object to responseObject.
    const responseObject = tryParse(err.response);

    // It then checks if either resultObject or responseObject is a valid problem details object by using the isProblemDetails function.
    // If resultObject is valid, it assigns it to details. Otherwise, if responseObject is valid, it assigns it to details.
    // If neither is valid, it assigns undefined to details.
    const details = isProblemDetails(resultObject)
      ? resultObject
      : isProblemDetails(responseObject)
      ? responseObject
      : undefined;

    // Finally, the function returns the detail property of details if it exists, followed by the title property if detail is not available.
    // If neither detail nor title is found, it returns the message property of the ApiException object.
    return details?.detail ?? details?.title ?? err.message;
  }
}

const apiClient = new ApiClient();

export default apiClient;
