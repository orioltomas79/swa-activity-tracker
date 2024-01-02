import { render } from "@testing-library/react";
import ActivityTypeAdd from "../ActivityTypeAdd";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

describe("ActivityTypeAdd", () => {
  const renderComponent = (defaultStore = store) =>
    render(
      <Provider store={defaultStore}>
        <ActivityTypeAdd />
      </Provider>
    );

  it("Show warning message if the user has funds", async () => {
    renderComponent();
  });
});
