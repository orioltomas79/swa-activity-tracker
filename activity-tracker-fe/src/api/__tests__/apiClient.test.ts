import { activityTypeBuilder } from "../../utils/builders/activityTypeBuilder";
import apiClient from "../apiClient";
import { ActivityType } from "../apiClient.g.nswag";

const mockGetActivityTypes = jest.fn<Promise<ActivityType[]>, []>();

jest.mock("../apiClient", () => ({
  __esModule: true,
  default: {
    ...jest.requireActual("../apiClient").default,
    activityTypes: {
      getActivityTypes: () => mockGetActivityTypes(),
    },
  },
}));

describe("clientsApi", () => {
  it.each([
    [
      apiClient.activityTypes.getActivityTypes,
      () => apiClient.activityTypes.getActivityTypes,
      mockGetActivityTypes,
      [activityTypeBuilder(0).build()],
    ],
  ])(
    "%s returns success",
    async (
      _,
      endpoint,
      mock: jest.Mock<Promise<ActivityType[]>, []>,
      result
    ) => {
      mock.mockResolvedValueOnce(result);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await endpoint();
    }
  );
});
