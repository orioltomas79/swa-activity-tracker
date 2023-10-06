/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useState, useCallback } from "react";
import { Button, Grid, Link, Paper } from "@mui/material";
import apiClient from "../../api/apiClient";
import Title from "../../components/Title";

const AuthenticationTest = () => {
  const [dataAxios, setDataAxios] = useState("");
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

  const callAxiosHandler = useCallback(async () => {
    try {
      const text = await apiClient.users.getUserClaims();
      setDataAxios(text.name! + " - " + text.authType!);
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
          <Button onClick={callAxiosHandler}>Call axios</Button>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <p>Result:</p>
          <div>{dataFetch}</div>
          <div>{dataAxios}</div>
          <p>Error:</p>
          <div>{error}</div>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default AuthenticationTest;
