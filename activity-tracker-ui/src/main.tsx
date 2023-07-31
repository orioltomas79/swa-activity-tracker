import ResponsiveDrawer from "./ResponsiveDrawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ActivityTypes from "./features/activityTypes";
import Activities from "./features/activities";
import AuthenticationTest from "./features/authenticationTest/AuthenticationTest";

const defaultTheme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveDrawer />,
    children: [
      { path: "/", element: <Activities /> },
      { path: "/activities", element: <Activities /> },
      { path: "/activity-types", element: <ActivityTypes /> },
      { path: "/authentication-test", element: <AuthenticationTest /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
