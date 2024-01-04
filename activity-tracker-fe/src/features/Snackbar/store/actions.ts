import { Action, createAction, PayloadAction } from "@reduxjs/toolkit";
import type { SnackbarMessage } from "./types";

const SHOW = "snackbar/SHOW";
const CLEAR = "snackbar/CLEAR";

type ShowAction = PayloadAction<SnackbarMessage, typeof SHOW>;
type ClearAction = Action<typeof CLEAR>;

export type SnackbarActions = ShowAction | ClearAction;

export const show = createAction<SnackbarMessage, typeof SHOW>(SHOW);
export const clear = createAction<void, typeof CLEAR>(CLEAR);

export const showUnexpectedError = () =>
  show({
    message: "Sorry, an unexpected error has occurred.",
    severity: "error",
  });
