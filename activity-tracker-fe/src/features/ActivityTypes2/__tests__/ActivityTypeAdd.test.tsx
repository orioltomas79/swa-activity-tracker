import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import ActivityTypeAdd from "../ActivityTypeAdd";

describe("<ActivityTypeAdd />", () => {
  const renderComponent = (defaultStore = store) =>
    render(
      <Provider store={defaultStore}>
        <ActivityTypeAdd />
      </Provider>
    );

  it("Renders component", async () => {
    renderComponent();

    await screen.findByTestId("add-activity-type-form");
    await screen.findByRole("button", { name: "Add" });
  });
});
