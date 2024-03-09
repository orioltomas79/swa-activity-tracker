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
              <TableCell style={{ fontWeight: "bold" }}>
                Activity type
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>7 days</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Avg 14 days</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Avg 28 days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesStats.map((row) => (
              <TableRow key={row.activityTypeId}>
                <TableCell>{row.activityTypeName}</TableCell>
                <TableCell>{row.countLast7Days}</TableCell>
                <TableCell>{row.avgLast14Days}</TableCell>
                <TableCell>{row.avgLast28Days}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                Activity type
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>7 days</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>8-14 days</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>15-21 days</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>22-28 days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesStats.map((row) => (
              <TableRow key={row.activityTypeId}>
                <TableCell>{row.activityTypeName}</TableCell>
                <TableCell>{row.countLast7Days}</TableCell>
                <TableCell>{row.count8to14DaysAgo}</TableCell>
                <TableCell>{row.count15to21DaysAgo}</TableCell>
                <TableCell>{row.count22to28DaysAgo}</TableCell>
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
