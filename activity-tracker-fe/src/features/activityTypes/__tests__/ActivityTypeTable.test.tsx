import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import ActivityTypeTable from "../ActivityTypeTable";

describe("<ActivityTypeTable />", () => {
  const renderComponent = (defaultStore = store) =>
    render(
      <Provider store={defaultStore}>
        <ActivityTypeTable />
      </Provider>
    );

  it("Renders component", async () => {
    renderComponent();

    const titleElement = screen.getByText(/Activities/i);
    expect(titleElement).toBeInTheDocument();
  });
});
