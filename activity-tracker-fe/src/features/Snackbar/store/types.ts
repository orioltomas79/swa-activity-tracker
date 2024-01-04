import type { AlertColor as MuiAlertColor } from "@mui/material";

export type AlertColor = MuiAlertColor;
export const defaultAutoHideAfterMs = {
  info: 2000,
  success: 3000,
  warning: 5000,
  error: null,
};

export type SnackbarMessage = {
  severity: AlertColor;
  message: string;
  autoHideAfterMs?: number | null;
};

export type SnackbarState = {
  open: boolean;
  messages: SnackbarMessage[];
};

export const initialState: SnackbarState = {
  open: false,
  messages: [],
};
