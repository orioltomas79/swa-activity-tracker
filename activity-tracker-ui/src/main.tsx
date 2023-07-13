
import ResponsiveDrawer from "./ResponsiveDrawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Activities from "./pages/Activities/Activities";
import AuthenticationTest from "./pages/AuthenticationTest/AthenticationTest";
import ReactDOM from "react-dom/client";
import React from "react";

const defaultTheme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveDrawer />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/activities", element: <Activities /> },
      { path: "/authenticationtest", element: <AuthenticationTest /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
