/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useCallback } from "react";
import Title from "../Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchActivityTypes,
  selectActivityTypes,
  deleteActivityType,
} from "../../features/activityTypes/activityTypesSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ActivityTypeTable() {
  const dispatch = useAppDispatch();
  const activityTypes = useAppSelector(selectActivityTypes).value;

  const initFetch = useCallback(async () => {
    await dispatch(fetchActivityTypes()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const handleRemove = async (id: string) => {
    try {
      await dispatch(deleteActivityType(id)).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

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

              <TableCell align="right">
                <Button onClick={() => handleRemove(row.id!)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
