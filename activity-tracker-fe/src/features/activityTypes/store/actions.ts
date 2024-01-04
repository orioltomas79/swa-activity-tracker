import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateNewActivityTypeRequest } from "../../../api/apiClient.g.nswag";
import activityTypesApi from "../../../api/activityTypesApi";

const FETCH_ACTIVITY_TYPES = "activitytypes/FETCH_ACTIVITY_TYPES";
const SAVE_ACTIVITY_TYPES = "activitytypes/SAVE_ACTIVITY_TYPES";
const DELETE_ACTIVITY_TYPES = "activitytypes/DELETE_ACTIVITY_TYPES";

export const fetchActivityTypes = createAsyncThunk(
  FETCH_ACTIVITY_TYPES,
  async (_, { rejectWithValue }) => {
    const response = await activityTypesApi.getActivityTypes();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.result;
  }
);

export const postActivityType = createAsyncThunk(
  SAVE_ACTIVITY_TYPES,
  async (request: CreateNewActivityTypeRequest, { rejectWithValue }) => {
    const response = await activityTypesApi.createActivityType(request);
    return response.success ? response.result : rejectWithValue(response);
  }
);

export const deleteActivityType = createAsyncThunk(
  DELETE_ACTIVITY_TYPES,
  async (activityTypeId: string, { rejectWithValue }) => {
    const response = await activityTypesApi.deleteActivityType(activityTypeId);
    return response.success ? response.result : rejectWithValue(response);
  }
);
