import { useEffect } from "react";
import Title from "../../components/Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteActivity, fetchActivities } from "./store/actions";
import { selectActivities } from "./store/selectors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
} from "@mui/material";
import { parseISO } from "date-fns";
import { selectActivityTypes } from "../ActivityTypes/store/selectors";
import { Activity } from "src/api/types";

export default function ActivityTable() {
  const dispatch = useAppDispatch();

  const activityTypes = useAppSelector(selectActivityTypes).activityTypes;

  const activities = useAppSelector(selectActivities).activities;
  const activitiesFetchStatus = useAppSelector(selectActivities).fetchStatus;
  const activitiesError = useAppSelector(selectActivities).error;

  const getActivityTypeName = (id: string): string => {
    return activityTypes.find((a) => a.id === id)?.name!;
  };

  useEffect(() => {
    if (activitiesFetchStatus === "idle") {
      dispatch(fetchActivities());
    }
  }, [activitiesFetchStatus, dispatch]);

  const handleRemove = async (year: number, month: number, id: string) => {
    try {
      await dispatch(
        deleteActivity({ year: year, month: month, id: id })
      ).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

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
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toDateString());
    }
    return dates;
  };

  const isWeekend = (date: string): boolean => {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
  };

  let content;

  if (activitiesFetchStatus === "loading") {
    content = <CircularProgress />;
  } else if (activitiesFetchStatus === "succeeded") {
    content = (
      <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Activity type
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getLastDays().map((date) => (
              <TableRow key={date}>
                <TableCell
                  style={{ fontWeight: isWeekend(date) ? "bold" : "normal" }}
                >
                  {date}
                </TableCell>
                <TableCell>
                  {groupActivitiesByDate()[date]?.map((activity) => (
                    <div key={activity.id}>
                      {getActivityTypeName(activity.activityTypeId!)}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {groupActivitiesByDate()[date]?.map((activity) => (
                    <div key={activity.id}>
                      <Button
                        onClick={() =>
                          handleRemove(
                            parseISO(activity.date!).getFullYear(),
                            parseISO(activity.date!).getMonth() + 1,
                            activity.id!
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </TableCell>
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
