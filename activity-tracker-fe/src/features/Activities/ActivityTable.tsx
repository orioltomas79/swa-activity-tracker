import { useEffect } from "react";
import Title from "../../components/Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchActivities } from "./store/actions";
import { selectActivities } from "./store/selectors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { DATE_FORMAT_DD_MMM_YYYY } from "src/utils/dateUtils";

export default function ActivityTable() {
  const dispatch = useAppDispatch();

  const activities = useAppSelector(selectActivities).activities;
  const activitiesFetchStatus = useAppSelector(selectActivities).fetchStatus;
  const activitiesError = useAppSelector(selectActivities).error;

  useEffect(() => {
    if (activitiesFetchStatus === "idle") {
      dispatch(fetchActivities());
    }
  }, [activitiesFetchStatus, dispatch]);

  let content;

  if (activitiesFetchStatus === "loading") {
    content = <CircularProgress />;
  } else if (activitiesFetchStatus === "succeeded") {
    content = (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Activity type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.activityTypeId}</TableCell>
                <TableCell>
                  {format(parseISO(row.date!), DATE_FORMAT_DD_MMM_YYYY)}
                </TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  } else if (activitiesFetchStatus === "failed") {
    content = <div>{activitiesError}</div>;
  }

  return (
    <>
      <Title>Recent activities</Title>
      {content}
    </>
  );
}
