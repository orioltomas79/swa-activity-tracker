/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from "react";
import Title from "../../components/Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchActivityTypes, deleteActivityType } from "./store/actions";
import { selectActivityTypes } from "./store/selectors";
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

  const activityTypes = useAppSelector(selectActivityTypes).activityTypes;
  const activityTypesStatus = useAppSelector(selectActivityTypes).status;
  const activityTypesError = useAppSelector(selectActivityTypes).error;

  useEffect(() => {
    if (activityTypesStatus === "idle") {
      console.log("dispatch fetchActivityTypes");
      dispatch(fetchActivityTypes());
    }
  }, [activityTypesStatus, dispatch]);

  // Review unwrap
  const handleRemove = async (id: string) => {
    try {
      await dispatch(deleteActivityType(id)).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  let content;

  if (activityTypesStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (activityTypesStatus === "succeeded") {
    content = (
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
    );
  } else if (activityTypesStatus === "failed") {
    content = <div>{activityTypesError}</div>;
  }

  return (
    <React.Fragment>
      <Title>Activities</Title>
      {content}
    </React.Fragment>
  );
}
