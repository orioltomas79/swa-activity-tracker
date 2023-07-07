/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Button from "@mui/material/Button";
import { useState, useCallback } from "react";
import apiClient from "../../api/apiClient";

const HelloWorld = () => {
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
      const text = await apiClient.client.getUserClaims();
      setDataAxios(text.name! + " - " + text.authType!);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  return (
    <div style={{ marginLeft: "500px" }}>
      <p>Hello</p>
      <Button variant="outlined" onClick={callFetchHandler}>
        Call fetch
      </Button>
      <div>{dataFetch}</div>
      <Button onClick={callAxiosHandler}>Call axios</Button>
      <div>{dataAxios}</div>
      <a href="/login">Login</a>
      <a href="/logout">Log out</a>
      <div>{error}</div>
    </div>
  );
};
export default HelloWorld;
