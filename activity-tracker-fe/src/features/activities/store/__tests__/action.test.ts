import activitiesApi from "src/api/activitiesApi";
import { Activity, FailedResponse, HttpStatusCodes } from "src/api/types";
import { fetchActivities } from "../actions";
import { store } from "src/app/store";
import { activityBuilder } from "src/utils/builders/activityBuilder";

const listActivities: Activity[] = [
  activityBuilder(2).build(),
  activityBuilder(1).build(),
  activityBuilder(0).build(),
];

describe("Activity actions", () => {
  let mockGetActivitiess = jest.spyOn(activitiesApi, "getActivities");

  describe("getActivities", () => {
    it("Should succeed", async () => {
      mockGetActivitiess.mockResolvedValueOnce({
        success: true,
        result: listActivities,
      });

      const response = await store.dispatch(fetchActivities()).unwrap();
      expect(response).toBe(listActivities);
    });

    it("Should resolve fail", async () => {
      const error: FailedResponse = {
        success: false,
        statusCode: HttpStatusCodes.Status500InternalServerError,
        message: "ERROR",
      };
      mockGetActivitiess.mockResolvedValueOnce(error);

      const response = store.dispatch(fetchActivities()).unwrap();
      await expect(response).rejects.toBe(error);
    });
  });
});
