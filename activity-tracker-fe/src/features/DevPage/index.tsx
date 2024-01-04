import { useState, useCallback } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Link,
  Typography,
} from "@mui/material";
import appSettings from "src/appSettings";
import { useAppDispatch } from "src/app/hooks";
import { show } from "../Snackbar/store";

const AuthenticationTest = () => {
  const [dataFetch, setDataFetch] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  const callFetchHandler = useCallback(async () => {
    try {
      const text = await (await fetch(`/api/GetUserClaims`)).text();
      setDataFetch(text);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  const showSnackbar = (severity: AlertColor) =>
    dispatch(
      show({ message: `This is a "${severity}" message`, severity: severity })
    );

  return (
    <>
      <Typography variant="h4">Dev Page</Typography>
      <Alert severity="info" sx={{ mt: 2 }}>
        This page should be hidden in production
      </Alert>

      <Box sx={{ mt: 2, pl: 1, borderLeft: 1 }}>
        <Typography variant="h5" gutterBottom>
          App settings
        </Typography>
        <p>
          <b>Name:</b> {appSettings.name}
        </p>
        <p>
          <b>Version:</b> {appSettings.version}
        </p>
        <p>
          <b>NodeEnv:</b> {appSettings.nodeEnv}
        </p>
        <p>
          <b>Api url:</b> {appSettings.api.baseUrl}
        </p>
      </Box>

      <Box sx={{ mt: 2, pl: 1, borderLeft: 1 }}>
        <Typography variant="h5" gutterBottom>
          Snackbar
        </Typography>
        <Button
          variant="outlined"
          color="info"
          onClick={() => showSnackbar("info")}
          sx={{ mr: 2 }}
        >
          Info
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => showSnackbar("success")}
          sx={{ mr: 2 }}
        >
          Success
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => showSnackbar("warning")}
          sx={{ mr: 2 }}
        >
          Warning
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => showSnackbar("error")}
          sx={{ mr: 2 }}
        >
          Error
        </Button>
      </Box>

      <Box sx={{ mt: 2, pl: 1, borderLeft: 1 }}>
        <Typography variant="h5" gutterBottom>
          API
        </Typography>
        <Button variant="outlined" sx={{ mr: 1 }}>
          SayHello
        </Button>
        <Button variant="outlined" sx={{ mr: 1 }}>
          SayHelloAnonymous
        </Button>
        <Button variant="outlined" sx={{ mr: 1 }}>
          GetUserClaims
        </Button>
        <Button variant="outlined" sx={{ mr: 1 }}>
          ThrowException
        </Button>
        <Button variant="outlined" sx={{ mr: 1 }}>
          ThrowExceptionAnonymous
        </Button>
        <Button variant="outlined" sx={{ mr: 1 }}>
          ThrowArgumentNullException
        </Button>
        <Button variant="outlined" sx={{ mr: 1 }}>
          ThrowArgumentNullExceptionAnonymous
        </Button>
      </Box>

      <Box sx={{ mt: 2, pl: 1, borderLeft: 1 }}>
        <Typography variant="h5" gutterBottom>
          Login & logout
        </Typography>
        <p>
          <Link href="/login">Login</Link>
        </p>
        <p>
          <Link href="/.auth/logout">Log out</Link>
        </p>
      </Box>

      <Box sx={{ mt: 2, pl: 1, borderLeft: 1 }}>
        <Typography variant="h5" gutterBottom>
          Call auth endpoint
        </Typography>
        <Button variant="outlined" onClick={callFetchHandler}>
          Call fetch
        </Button>
        <p>Result:</p>
        <div>{dataFetch}</div>
        <p>Error:</p>
        <div>{error}</div>
      </Box>
    </>
  );
};
export default AuthenticationTest;
