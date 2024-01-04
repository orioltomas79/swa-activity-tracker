import { isFailedResponse } from "src/api/types";
import { types } from "util";

export const skipMockedErrorsInConsole = () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    // Mocking console.error to avoid logging the mocked error on tests
    console.error = jest.fn<void, [unknown]>((msg) => {
      const message =
        types.isNativeError(msg) || isFailedResponse(msg)
          ? msg.message
          : typeof msg === "string"
          ? msg
          : typeof msg === "object" &&
            !!msg &&
            "message" in msg &&
            typeof msg.message === "string"
          ? msg.message
          : "";

      try {
        if (message.toLowerCase().includes("mocked error")) {
          return;
        }
        originalConsoleError(msg);
      } catch (err) {
        originalConsoleError(msg, typeof msg, message, typeof message, err);
      }
    });
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });
};
