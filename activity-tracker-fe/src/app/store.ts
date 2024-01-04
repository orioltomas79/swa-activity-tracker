import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import activityTypesReducer from "../features/activityTypes/store/reducer";
import activitiesReducer from "../features/activities/store/reducer";
import snackbarReducer from "../features/Snackbar/store";

export const store = configureStore({
  reducer: {
    activityTypes: activityTypesReducer,
    activities: activitiesReducer,
    snackbar: snackbarReducer,
  },
});

export type ThunkActionStatus = "idle" | "loading" | "succeeded" | "failed";
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
