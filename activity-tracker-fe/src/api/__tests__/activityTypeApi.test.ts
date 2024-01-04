import { activityTypeBuilder } from "src/utils/builders/activityTypeBuilder";
import { skipMockedErrorsInConsole } from "src/utils/testUtils";
import { HttpStatusCodes, type FailedResponse, ActivityType } from "../types";
import activityTypesApi from "../activityTypesApi";

const mockGetActivityTypes = jest.fn<Promise<ActivityType[]>, []>();
const mockCreateActivityType = jest.fn<Promise<ActivityType>, []>();
const mockDeleteActivityType = jest.fn<Promise<void>, []>();
jest.mock("src/api/apiClient", () => ({
  __esModule: true,
  default: {
    ...jest.requireActual("src/api/apiClient").default,
    activityTypes: {
      getActivityTypes: () => mockGetActivityTypes(),
      addActivityType: () => mockCreateActivityType(),
      deleteActivityType: () => mockDeleteActivityType(),
    },
  },
}));

describe("activityTypesApi", () => {
  const activityTypeGuid = "ecccf9aa-8edc-43be-9504-5be075248d07";

  const failedResponse: FailedResponse = {
    success: false,
    statusCode: HttpStatusCodes.Status500InternalServerError,
    message:
      "There was a problem dealing with your request. Please try again later.",
  };

  skipMockedErrorsInConsole();

  it.each([
    [
      activityTypesApi.getActivityTypes.name,
      () => activityTypesApi.getActivityTypes(),
      [mockGetActivityTypes],
      [
        activityTypeBuilder(0).build(),
        activityTypeBuilder(1).build(),
        activityTypeBuilder(2).build(),
      ],
    ],
    [
      activityTypesApi.createActivityType.name,
      () =>
        activityTypesApi.createActivityType({
          name: "Test",
        }),
      [mockCreateActivityType],
      activityTypeBuilder(33).build(),
    ],
    [
      activityTypesApi.deleteActivityType.name,
      () => activityTypesApi.deleteActivityType(activityTypeGuid),
      [mockDeleteActivityType],
      (() => {})(),
    ],
  ])(
    "%s returns success",
    async (
      _,
      endpoint,
      mock: jest.Mock<Promise<ActivityType[] | ActivityType | void>, []>[],
      result
    ) => {
      mock.forEach((m) => m.mockResolvedValueOnce(result));

      const response = await endpoint();

      expect(response).toStrictEqual({ success: true, result: result });
    }
  );

  it.each([
    [
      activityTypesApi.getActivityTypes.name,
      () => activityTypesApi.getActivityTypes(),
      mockGetActivityTypes,
    ],
    [
      activityTypesApi.createActivityType.name,
      () =>
        activityTypesApi.createActivityType({
          name: "Test",
        }),
      mockCreateActivityType,
    ],
    [
      activityTypesApi.deleteActivityType.name,
      () => activityTypesApi.deleteActivityType(activityTypeGuid),
      mockDeleteActivityType,
    ],
  ])(
    "%s returns failed",
    async (
      _,
      endpoint,
      mock: jest.Mock<Promise<ActivityType[] | ActivityType | void>, []>
    ) => {
      mock.mockRejectedValueOnce("Mocked error happened calling API");

      const response = await endpoint();

      expect(response).toStrictEqual(failedResponse);
    }
  );
});
