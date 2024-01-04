import { Snackbar as MuiSnackbar, Button, Alert } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clear, selectSnackbarStatus } from "./store";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" in />;
}

const Snackbar = () => {
  const dispatch = useAppDispatch();

  const { open, current, totalRemain } = useAppSelector(selectSnackbarStatus);

  const handleClose = (_event?: React.SyntheticEvent | Event) => {
    dispatch(clear());
  };

  const alertAction =
    totalRemain > 0 ? (
      <Button
        color="inherit"
        size="small"
        onClick={handleClose}
        title={`${totalRemain} more message${totalRemain === 1 ? "" : "s"}`}
      >
        NEXT
      </Button>
    ) : undefined;

  return (
    <MuiSnackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={current?.autoHideAfterMs ?? null}
      key={new Date().getTime()}
      TransitionComponent={
        SlideTransition as React.ComponentType<
          TransitionProps & {
            children: React.ReactElement<any, any>;
          }
        >
      }
    >
      <Alert
        data-testid="snackbar-alert"
        severity={current?.severity ?? "success"}
        variant="filled"
        onClose={handleClose}
        action={alertAction}
        sx={{ whiteSpace: "pre-wrap" }}
      >
        {current?.message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
