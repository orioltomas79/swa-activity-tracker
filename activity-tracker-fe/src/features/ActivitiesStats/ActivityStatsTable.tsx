import { useEffect } from "react";
import Title from "../../components/Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchActivitiesStats } from "./store/actions";
import { selectActivitiesStats } from "./store/selectors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

export default function ActivityStatsTable() {
  const dispatch = useAppDispatch();

  const activitiesStats = useAppSelector(selectActivitiesStats).activitiesStats;
  const activitiesStatsFetchStatus = useAppSelector(
    selectActivitiesStats
  ).fetchStatus;
  const activitiesStatsError = useAppSelector(selectActivitiesStats).error;

  useEffect(() => {
    if (activitiesStatsFetchStatus === "idle") {
      dispatch(fetchActivitiesStats());
    }
  }, [activitiesStatsFetchStatus, dispatch]);

  let content;

  if (activitiesStatsFetchStatus === "loading") {
    content = <CircularProgress />;
  } else if (activitiesStatsFetchStatus === "succeeded") {
    content = (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Activity type</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesStats.map((row) => (
              <TableRow key={row.activityTypeId}>
                <TableCell>{row.activityTypeName}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  } else if (activitiesStatsFetchStatus === "failed") {
    content = <div>{activitiesStatsError}</div>;
  }

  return (
    <>
      <Title>Activities stats</Title>
      {content}
    </>
  );
}
