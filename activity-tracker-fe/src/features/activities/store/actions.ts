import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { CreateNewActivityRequest } from "../../../api/apiClient.g.nswag";

const FETCH_ACTIVITIES = "activities/FETCH_ACTIVITIES";
const SAVE_ACTIVITIES = "activities/SAVE_ACTIVITIES";
const DELETE_ACTIVITIES = "activities/DELETE_ACTIVITIES";

export const fetchActivities = createAsyncThunk(FETCH_ACTIVITIES, async () => {
  return await apiClient.activities.getActivities();
});

export const postActivity = createAsyncThunk(
  SAVE_ACTIVITIES,
  async (request: CreateNewActivityRequest) => {
    return await apiClient.activities.addActivity(request);
  }
);

export const deleteActivity = createAsyncThunk(
  DELETE_ACTIVITIES,
  async (activityId: string) => {
    return await apiClient.activities.deleteActivity(1, 1, activityId);
  }
);
