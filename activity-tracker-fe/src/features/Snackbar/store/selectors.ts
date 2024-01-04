import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export const selectSnackbarStatus = createSelector(
  (state: RootState) => state.snackbar,
  (snackbar) => ({
    open: snackbar.open,
    totalRemain: snackbar.open ? snackbar.messages.length - 1 : 0,
    current: snackbar.messages.length ? snackbar.messages[0] : undefined,
  })
);
