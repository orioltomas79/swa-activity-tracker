import React, { useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchActivityTypes, selectActivityTypes } from "../../features/activityTypes/activityTypesSlice";

export default function ActivityTypeTable() {
  const dispatch = useAppDispatch();
  const activityTypes = useAppSelector(selectActivityTypes).value;
  
  const initFetch = useCallback(async () => {
    await dispatch(fetchActivityTypes()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    initFetch();
  }, [initFetch]);

  return (
    <React.Fragment>
      <Title>Activities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityTypes.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
