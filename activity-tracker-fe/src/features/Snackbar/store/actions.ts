import { Action, createAction, PayloadAction } from "@reduxjs/toolkit";
import type { SnackbarMessage } from "./types";

const SHOW = "snackbar/SHOW";
const CLEAR = "snackbar/CLEAR";

// This code defines two type aliases using TypeScript's type keyword:
// - ShowAction: A type alias for a payload action that carries a SnackbarMessage payload and has the SHOW action type.
// - ClearAction: A type alias for a plain action (without payload) that has the CLEAR action type.
type ShowAction = PayloadAction<SnackbarMessage, typeof SHOW>;
type ClearAction = Action<typeof CLEAR>;

export type SnackbarActions = ShowAction | ClearAction;

// This code defines two action creator functions using the createAction utility from @reduxjs/toolkit:
// - show: An action creator that takes a SnackbarMessage payload and returns an action with the SHOW action type.
// - clear: An action creator that takes no payload and returns an action with the CLEAR action type.
export const show = createAction<SnackbarMessage, typeof SHOW>(SHOW);
export const clear = createAction<void, typeof CLEAR>(CLEAR);

export const showUnexpectedError = () =>
  show({
    message: "Sorry, an unexpected error has occurred.",
    severity: "error",
  });
