import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { CreateActivityTypePayload } from "../../../api/activityTypesApi";

const FETCH_ACTIVITY_TYPES = "activitytypes/FETCH_ACTIVITY_TYPES";
const SAVE_ACTIVITY_TYPES = "activitytypes/SAVE_ACTIVITY_TYPES";
const DELETE_ACTIVITY_TYPES = "activitytypes/DELETE_ACTIVITY_TYPES";

export const fetchActivityTypes = createAsyncThunk(
  FETCH_ACTIVITY_TYPES,
  async () => {
    return await apiClient.activityTypes.getActivityTypes();
  }
);

export const postActivityType = createAsyncThunk(
  SAVE_ACTIVITY_TYPES,
  async ({ name }: CreateActivityTypePayload) => {
    return await apiClient.activityTypes.addActivityType({ name });
  }
);

export const deleteActivityType = createAsyncThunk(
  DELETE_ACTIVITY_TYPES,
  async (activityTypeId: string) => {
    return await apiClient.activityTypes.deleteActivityType(activityTypeId);
  }
);
