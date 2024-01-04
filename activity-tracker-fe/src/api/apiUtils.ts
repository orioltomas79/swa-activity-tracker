import { show } from "../features/Snackbar/store";
import { store } from "../app/store";
import type { FailedResponse } from "./types";

export const showSnackbarForFailedResponse = (
  response: FailedResponse,
  withMessage?: string
): void => {
  let toastMessage = (withMessage ?? response.message).replace(/\.$/, "");
  if (response.validationErrors) {
    const errors = Object.keys(response.validationErrors).flatMap(
      (field) => response.validationErrors![field]
    );
    toastMessage = errors.join(", ");
  }
  if (response.exceptionId && !response.validationErrors) {
    toastMessage = `${toastMessage}. If you need to contact App Support please quote the error id '${response.exceptionId}'`;
  }

  store.dispatch(
    show({
      message: toastMessage,
      severity:
        response.statusCode >= 500
          ? "error"
          : response.statusCode >= 400
          ? "warning"
          : "info",
    })
  );
};
