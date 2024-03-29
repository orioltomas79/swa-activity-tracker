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
import { Activity } from "src/api/types";
import DayLabel from "./DayLabel";
import DayGrid from "./DayGrid";

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

  const groupActivitiesByDate = () => {
    const groupedActivities: { [date: string]: Activity[] } = {};

    activities.forEach((activity) => {
      const date = new Date(activity.date!).toDateString();
      if (!groupedActivities[date]) {
        groupedActivities[date] = [];
      }
      groupedActivities[date].push(activity);
    });

    return groupedActivities;
  };

  const getLastDays = () => {
    const dates: string[] = [];
    for (let i = 0; i < 28; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toDateString());
    }
    return dates;
  };

  let content;

  if (activitiesFetchStatus === "loading") {
    content = <CircularProgress />;
  } else if (activitiesFetchStatus === "succeeded") {
    content = (
      <Table size="small" style={{ maxWidth: "600px" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Activity type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getLastDays().map((date) => (
            <TableRow key={date}>
              <TableCell>
                <DayLabel date={date}></DayLabel>
              </TableCell>
              <TableCell>
                <DayGrid activities={groupActivitiesByDate()[date]}></DayGrid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
