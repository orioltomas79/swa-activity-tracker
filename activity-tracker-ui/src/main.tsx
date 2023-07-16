import ResponsiveDrawer from "./ResponsiveDrawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Activities from "./pages/ActivityTypes/ActivityTypes";
import ReactDOM from "react-dom/client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TestFormik from "./components/TestFormik";

const defaultTheme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveDrawer />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/activities", element: <Activities /> },
      { path: "/authenticationtest", element: <TestFormik /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
