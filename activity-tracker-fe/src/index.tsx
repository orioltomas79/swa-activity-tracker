import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Router from "./features/Router";

const defaultTheme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
