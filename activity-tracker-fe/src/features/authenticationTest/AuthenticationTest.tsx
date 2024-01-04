import { useState, useCallback } from "react";
import { Button, Grid, Link, Paper } from "@mui/material";
import Title from "../../components/Title";
import appSettings from "src/appSettings";

const AuthenticationTest = () => {
  const [dataFetch, setDataFetch] = useState("");
  const [error, setError] = useState(null);

  const callFetchHandler = useCallback(async () => {
    try {
      const text = await (await fetch(`/api/GetUserClaims`)).text();
      setDataFetch(text);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper>
          <Title>Login and Logout</Title>
          <Link href="/login">Login</Link>
          <Link href="/.auth/logout">Log out</Link>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper>
          <Title>Call auth endpoint</Title>
          <Button variant="outlined" onClick={callFetchHandler}>
            Call fetch
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <p>Result:</p>
          <div>{dataFetch}</div>
          <p>Error:</p>
          <div>{error}</div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <p>Name:</p>
          <div>{appSettings.name}</div>
          <p>NodeEnv:</p>
          <div>{appSettings.nodeEnv}</div>
          <p>Version:</p>
          <div>{appSettings.version}</div>
          <p>Api url:</p>
          <div>{appSettings.api.baseUrl}</div>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default AuthenticationTest;
