import { createReducer } from "@reduxjs/toolkit";
import { clear, show } from "./actions";
import { defaultAutoHideAfterMs, initialState } from "./types";

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(show, (state, action) => {
      state.open = true;
      state.messages.push({
        ...action.payload,
        autoHideAfterMs:
          action.payload.autoHideAfterMs ??
          defaultAutoHideAfterMs[action.payload.severity],
      });
    })
    .addCase(clear, (state) => {
      state.messages.shift();
      state.open = state.messages.length > 0;
    })
);

export default reducer;
