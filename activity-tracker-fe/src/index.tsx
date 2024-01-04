import React from "react";
import ReactDOM from "react-dom/client";

import ResponsiveDrawer from "./ResponsiveDrawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ActivityTypes from "./features/activityTypes";
import Activities from "./features/activities";
import DevPage from "./features/DevPage";
import Snackbar from "./features/Snackbar";

const defaultTheme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveDrawer />,
    children: [
      { path: "/", element: <Activities /> },
      { path: "/activities", element: <Activities /> },
      { path: "/activity-types", element: <ActivityTypes /> },
      { path: "/devpage", element: <DevPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Snackbar />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
