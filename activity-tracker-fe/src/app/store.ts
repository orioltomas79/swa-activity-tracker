import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import activityTypesReducer from "../features/ActivityTypes/store/reducer";
import activitiesReducer from "../features/Activities/store/reducer";
import activitiesStatsReducer from "../features/ActivitiesStats/store/reducers";
import snackbarReducer from "../features/Snackbar/store";

export const store = configureStore({
  reducer: {
    activityTypes: activityTypesReducer,
    activities: activitiesReducer,
    activitiesStats: activitiesStatsReducer,
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
