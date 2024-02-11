import { createAsyncThunk } from "@reduxjs/toolkit";

import activitiesApi from "../../../api/activitiesApi";

const FETCH_ACTIVITIES_STATS = "activities/FETCH_ACTIVITIES_STATS";

export const fetchActivitiesStats = createAsyncThunk(
  FETCH_ACTIVITIES_STATS,
  async (_, { rejectWithValue }) => {
    const response = await activitiesApi.getActivitiesStats();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.result;
  }
);
