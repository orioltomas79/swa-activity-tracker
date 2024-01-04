import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import Snackbar from "..";
import { show } from "../store";
import { AlertColor, defaultAutoHideAfterMs } from "../store/types";

describe("<Snackbar />", () => {
  jest.useFakeTimers();

  const renderSnackbar = () =>
    render(
      <Provider store={store}>
        <Snackbar />
      </Provider>
    );

  const getAlert = () => screen.getByRole("alert");
  const noAlert = () =>
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  const getCloseButton = () => screen.getByRole("button", { name: "Close" });
  const noCloseButton = () =>
    expect(
      screen.queryByRole("button", { name: "Close" })
    ).not.toBeInTheDocument();
  const getNextButton = () => screen.getByRole("button", { name: "NEXT" });
  const noNextButton = () =>
    expect(
      screen.queryByRole("button", { name: "NEXT" })
    ).not.toBeInTheDocument();

  it("does not show the alert when there is nothing", () => {
    renderSnackbar();
    noAlert();
    noCloseButton();
  });

  it.each<AlertColor>(["info", "success", "warning", "error"])(
    "shows a '%s' alert and clears it",
    async (severity) => {
      renderSnackbar();

      act(() => {
        store.dispatch(show({ severity, message: "Test message" }));
      });

      expect(getAlert()).toHaveTextContent("Test message");
      expect(getAlert()).toHaveClass(
        `MuiAlert-filled${severity[0].toUpperCase()}${severity.slice(1)}`
      );
      getCloseButton();

      const autoHideAfter = defaultAutoHideAfterMs[severity];
      const user = userEvent.setup();
      if (autoHideAfter) {
        act(() => {
          jest.advanceTimersByTime(autoHideAfter);
        });
      } else {
        user.click(getCloseButton());
      }
      await waitFor(() => noAlert());
      noCloseButton();
    }
  );

  it("shows NEXT button when there are more messages to show", () => {
    renderSnackbar();

    act(() => {
      store.dispatch(show({ severity: "info", message: "First message" }));
    });
    act(() => {
      store.dispatch(show({ severity: "warning", message: "Second message" }));
    });
    act(() => {
      store.dispatch(show({ severity: "success", message: "Third message" }));
    });

    expect(getAlert()).toHaveTextContent("First message");
    noCloseButton();
    expect(getNextButton()).toHaveAttribute("title", "2 more messages");

    fireEvent.click(getNextButton());

    expect(getAlert()).toHaveTextContent("Second message");
    noCloseButton();
    expect(getNextButton()).toHaveAttribute("title", "1 more message");

    fireEvent.click(getNextButton());

    expect(getAlert()).toHaveTextContent("Third message");
    noNextButton();
    getCloseButton();
  });
});
