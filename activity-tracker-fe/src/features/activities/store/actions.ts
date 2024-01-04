import { createAsyncThunk } from "@reduxjs/toolkit";

import { CreateNewActivityRequest } from "../../../api/apiClient.g.nswag";
import activitiesApi from "../../../api/activitiesApi";

const FETCH_ACTIVITIES = "activities/FETCH_ACTIVITIES";
const SAVE_ACTIVITIES = "activities/SAVE_ACTIVITIES";
const DELETE_ACTIVITIES = "activities/DELETE_ACTIVITIES";

export interface DeleteActivityParams {
  year: number;
  month: number;
  id: string;
}

export const fetchActivities = createAsyncThunk(
  FETCH_ACTIVITIES,
  async (_, { rejectWithValue }) => {
    const response = await activitiesApi.getActivities();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.result;
  }
);

export const postActivity = createAsyncThunk(
  SAVE_ACTIVITIES,
  async (request: CreateNewActivityRequest, { rejectWithValue }) => {
    const response = await activitiesApi.createActivity(request);
    return response.success ? response.result : rejectWithValue(response);
  }
);

export const deleteActivity = createAsyncThunk(
  DELETE_ACTIVITIES,
  async ({ year, month, id }: DeleteActivityParams, { rejectWithValue }) => {
    const response = await activitiesApi.deleteActivity(year, month, id);
    return response.success ? response.result : rejectWithValue(response);
  }
);
