import { activityBuilder } from "src/utils/builders/activityBuilder";
import { skipMockedErrorsInConsole } from "src/utils/testUtils";
import { HttpStatusCodes, type FailedResponse, Activity } from "../types";
import activitiesApi from "../activitiesApi";

const mockGetActivities = jest.fn<Promise<Activity[]>, []>();
const mockCreateActivity = jest.fn<Promise<Activity>, []>();
const mockDeleteActivity = jest.fn<Promise<void>, []>();

jest.mock("src/api/apiClient", () => ({
  __esModule: true,
  default: {
    ...jest.requireActual("src/api/apiClient").default,
    activities: {
      getActivities: () => mockGetActivities(),
      addActivity: () => mockCreateActivity(),
      deleteActivity: () => mockDeleteActivity(),
    },
  },
}));

describe("activityiesApi", () => {
  const activityGuid = "ecccf9aa-8edc-43be-9504-5be075248d07";
  const year: number = 2024;
  const month: number = 1;

  const failedResponse: FailedResponse = {
    success: false,
    statusCode: HttpStatusCodes.Status500InternalServerError,
    message:
      "There was a problem dealing with your request. Please try again later.",
  };

  skipMockedErrorsInConsole();

  it.each([
    [
      activitiesApi.getActivities,
      () => activitiesApi.getActivities(),
      [mockGetActivities],
      [
        activityBuilder(0).build(),
        activityBuilder(1).build(),
        activityBuilder(2).build(),
      ],
    ],
    [
      activitiesApi.createActivity.name,
      () =>
        activitiesApi.createActivity({
          name: "Test",
        }),
      [mockCreateActivity],
      activityBuilder(33).build(),
    ],
    [
      activitiesApi.deleteActivity.name,
      () => activitiesApi.deleteActivity(year, month, activityGuid),
      [mockDeleteActivity],
      (() => {})(),
    ],
  ])(
    "%s returns success",
    async (
      _,
      endpoint,
      mock: jest.Mock<Promise<Activity[] | Activity | void>, []>[],
      result
    ) => {
      mock.forEach((m) => m.mockResolvedValueOnce(result));

      const response = await endpoint();

      expect(response).toStrictEqual({ success: true, result: result });
    }
  );

  it.each([
    [
      activitiesApi.getActivities.name,
      () => activitiesApi.getActivities(),
      mockGetActivities,
    ],
    [
      activitiesApi.createActivity.name,
      () =>
        activitiesApi.createActivity({
          name: "Test",
        }),
      mockCreateActivity,
    ],
    [
      activitiesApi.deleteActivity.name,
      () => activitiesApi.deleteActivity(year, month, activityGuid),
      mockDeleteActivity,
    ],
  ])(
    "%s returns failed",
    async (
      _,
      endpoint,
      mock: jest.Mock<Promise<Activity[] | Activity | void>, []>
    ) => {
      mock.mockRejectedValueOnce("Mocked error happened calling API");

      const response = await endpoint();

      expect(response).toStrictEqual(failedResponse);
    }
  );
});
