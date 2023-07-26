import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import activityTypesReducer from "../features/activityTypes/activityTypesSlice";

export const store = configureStore({
  reducer: {
    activityTypes: activityTypesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
