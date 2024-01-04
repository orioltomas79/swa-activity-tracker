import { createReducer } from "@reduxjs/toolkit";
import { clear, show } from "./actions";
import { defaultAutoHideAfterMs, initialState } from "./types";

const reducer = createReducer(initialState, (builder) =>
  builder
    // It updates the state by setting state.open to true and pushing a new message object to the state.messages array.
    // The new message object is created by spreading the payload of the action and
    // setting the autoHideAfterMs property based on the severity of the message.
    .addCase(show, (state, action) => {
      state.open = true;
      state.messages.push({
        ...action.payload,
        autoHideAfterMs:
          action.payload.autoHideAfterMs ??
          defaultAutoHideAfterMs[action.payload.severity],
      });
    })
    // It updates the state by removing the first message from the state.messages array using state.messages.shift().
    // It also updates state.open based on whether there are any remaining messages in the array.
    .addCase(clear, (state) => {
      state.messages.shift();
      state.open = state.messages.length > 0;
    })
);

export default reducer;
