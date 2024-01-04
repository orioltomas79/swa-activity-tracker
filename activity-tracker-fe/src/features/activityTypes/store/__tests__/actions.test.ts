import activityTypesApi from "src/api/activityTypesApi";
import { ActivityType, FailedResponse, HttpStatusCodes } from "src/api/types";
import { fetchActivityTypes } from "../actions";
import { store } from "src/app/store";
import { activityTypeBuilder } from "src/utils/builders/activityTypeBuilder";

const listActivityTypes: ActivityType[] = [
  activityTypeBuilder(2).build(),
  activityTypeBuilder(1).build(),
  activityTypeBuilder(0).build(),
];

describe("ActivityTypes actions", () => {
  let mockGetActivityTypes = jest.spyOn(activityTypesApi, "getActivityTypes");

  describe("getActivityTypes", () => {
    it("Should succeed", async () => {
      mockGetActivityTypes.mockResolvedValueOnce({
        success: true,
        result: listActivityTypes,
      });

      const response = await store.dispatch(fetchActivityTypes()).unwrap();
      expect(response).toBe(listActivityTypes);
    });

    it("Should resolve fail", async () => {
      const error: FailedResponse = {
        success: false,
        statusCode: HttpStatusCodes.Status500InternalServerError,
        message: "ERROR",
      };
      mockGetActivityTypes.mockResolvedValueOnce(error);

      const response = store.dispatch(fetchActivityTypes()).unwrap();
      await expect(response).rejects.toBe(error);
    });
  });
});
