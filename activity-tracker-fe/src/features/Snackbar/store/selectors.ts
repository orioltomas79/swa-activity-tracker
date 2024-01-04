import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

// The code defines a selector function named selectSnackbarStatus using the createSelector utility.
// The selector function takes two arguments:
// - (state: RootState) => state.snackbar: A selector function that extracts the snackbar slice from the root state of the Redux store (SnackbarState).
// - (snackbar) => ...: A callback function that receives the extracted snackbar slice and returns an object representing the selected data.
export const selectSnackbarStatus = createSelector(
  (state: RootState) => state.snackbar,
  (snackbar) => ({
    open: snackbar.open,
    // If the open property is true, it calculates the remaining messages by subtracting 1 from the length of the messages array.
    totalRemain: snackbar.open ? snackbar.messages.length - 1 : 0,
    // The first message in the messages array, or undefined if the array is empty.
    current: snackbar.messages.length ? snackbar.messages[0] : undefined,
  })
);
