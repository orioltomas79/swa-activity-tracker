import appSettings from "src/appSettings";
import apiClient from "../apiClient";
import {
  ApiException,
  type ProblemDetails,
  type ValidationProblemDetails,
} from "../apiClient.g.nswag";
import {
  HttpStatusCodes,
  type CallEndpointOptions,
  type FailedResponse,
  type SuccessResponse,
} from "../types";

const mockShowSnackbar = jest.fn();
jest.mock("../apiUtils", () => ({
  showSnackbarForFailedResponse: (response: FailedResponse) =>
    mockShowSnackbar(response),
}));

describe("apiClient", () => {
  const callEndpointOptions: CallEndpointOptions = {
    showSnackbarOnFail: false,
  };

  const problemDetails500: ProblemDetails = {
    title: "An error occurred",
    status: HttpStatusCodes.Status500InternalServerError,
    detail: "There was a problem in the server",
    ExceptionId: "C4rN1V4l",
  };

  const validationProblemDetails: ValidationProblemDetails = {
    title: "One or more validation errors occurred",
    status: HttpStatusCodes.Status422UnprocessableEntity,
    errors: { name: ["Name is not valid"] },
  };

  const failedResponse500: FailedResponse = {
    success: false,
    statusCode: HttpStatusCodes.Status500InternalServerError,
    message:
      "There was a problem dealing with your request. Please try again later.",
  };

  it("calls an endpoint successfully", async () => {
    const response = await apiClient.callApiEndpoint(
      Promise.resolve("value"),
      callEndpointOptions
    );
    const expected: SuccessResponse<string> = {
      success: true,
      result: "value",
    };

    expect(response).toStrictEqual(expected);
    expect(mockShowSnackbar).not.toBeCalled();
  });

  describe("handling exceptions", () => {
    const spyConsoleError = jest.spyOn(console, "error");

    it("doesn't log to console in production", async () => {
      // Mocking console.error to avoid logging the exception thrown in test
      spyConsoleError.mockImplementationOnce(() => {});
      const _nodeEnv = appSettings.nodeEnv;
      appSettings.nodeEnv = "production";

      await apiClient.callApiEndpoint(Promise.reject(), callEndpointOptions);

      expect(spyConsoleError).not.toBeCalled();
      appSettings.nodeEnv = _nodeEnv;
    });

    it("handles a ProblemDetails", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject(problemDetails500),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        message: "There was a problem in the server",
        exceptionId: "C4rN1V4l",
      };

      expect(response).toStrictEqual(expected);
      expect(spyConsoleError).toBeCalled();
      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handles a ProblemDetails without detail or title", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject({
          status: HttpStatusCodes.Status500InternalServerError,
          title: undefined,
        } satisfies ProblemDetails),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        statusCode: HttpStatusCodes.Status500InternalServerError,
        message:
          "There was a problem dealing with your request. Please try again later.",
      };

      expect(response).toStrictEqual(expected);
      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handle a ValidationProblemDetails", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject(validationProblemDetails),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        statusCode: HttpStatusCodes.Status422UnprocessableEntity,
        message: "One or more validation errors occurred",
        validationErrors: { name: ["Name is not valid"] },
      };

      expect(response).toStrictEqual(expected);
      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handles an ApiException with strings", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject(
          new ApiException(
            "An error occurred",
            HttpStatusCodes.Status405MethodNotAllowed,
            JSON.stringify(problemDetails500),
            {},
            "Api result"
          )
        ),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        statusCode: HttpStatusCodes.Status405MethodNotAllowed,
        message: "There was a problem in the server",
      };

      expect(response).toStrictEqual(expected);
      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handles an ApiException with objects", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject(
          new ApiException(
            "An error occurred",
            HttpStatusCodes.Status405MethodNotAllowed,
            '{ error: "Api response" }',
            {},
            validationProblemDetails
          )
        ),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        statusCode: HttpStatusCodes.Status405MethodNotAllowed,
        message: validationProblemDetails.title!,
      };

      expect(response).toStrictEqual(expected);
      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handles an ApiException without ProblemDetails", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject(
          new ApiException(
            "An error occurred",
            HttpStatusCodes.Status405MethodNotAllowed,
            "Api response",
            {},
            null
          )
        ),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        statusCode: HttpStatusCodes.Status405MethodNotAllowed,
        message: "An error occurred",
      };

      expect(response).toStrictEqual(expected);
      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handles another error", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject(new Error("Mocked error")),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        message:
          "There was a problem dealing with your request. Please try again later.",
      };

      expect(response).toStrictEqual(expected);

      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handles nothing", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject(),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        message:
          "There was a problem dealing with your request. Please try again later.",
      };

      expect(response).toStrictEqual(expected);
      expect(mockShowSnackbar).not.toBeCalled();
    });

    it("handles not authenticated", async () => {
      const response = await apiClient.callApiEndpoint(
        Promise.reject({
          title: "An error occurred",
          status: HttpStatusCodes.Status401Unauthorized,
        } satisfies ProblemDetails),
        callEndpointOptions
      );
      const expected: FailedResponse = {
        ...failedResponse500,
        statusCode: HttpStatusCodes.Status401Unauthorized,
        message:
          "It appears your session has expired. Please refresh the page and try again.",
      };

      expect(response).toStrictEqual(expected);
      expect(mockShowSnackbar).not.toBeCalled();
    });
  });

  describe("callApiEndpoint with callEndpointOptions", () => {
    describe("callEndpointOptions.showSnackbarOnFail", () => {
      it("shows snackbar on fail as default", async () => {
        const expected: FailedResponse = {
          ...failedResponse500,
          message: "There was a problem in the server",
          exceptionId: "C4rN1V4l",
          validationErrors: undefined,
        };
        await apiClient.callApiEndpoint(
          Promise.reject(problemDetails500),
          undefined
        );
        expect(mockShowSnackbar).toBeCalledWith(expected);
      });
    });

    describe("callEndpointOptions.skipSnackbarOnStatusCode", () => {
      it("skip show snackbar on status code", async () => {
        await apiClient.callApiEndpoint(
          Promise.reject(validationProblemDetails),
          {
            skipSnackbarOnStatusCode: 422,
          }
        );
        expect(mockShowSnackbar).not.toBeCalled();
      });
    });

    describe("callEndpointOptions.errorMessage", () => {
      it("returns custom error message", async () => {
        const response = await apiClient.callApiEndpoint(
          Promise.reject(problemDetails500),
          {
            errorMessage: "Oh no! Something went wrong!",
          }
        );
        const expected: FailedResponse = {
          ...failedResponse500,
          message: "Oh no! Something went wrong!",
          exceptionId: "C4rN1V4l",
        };
        expect(response).toStrictEqual(expected);
        expect(mockShowSnackbar).toBeCalledWith(expected);
      });
    });
  });
});
