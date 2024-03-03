import { Activity } from "src/api/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActivityTypes } from "../ActivityTypes/store/selectors";
import { Button } from "@mui/material";
import { deleteActivity } from "./store/actions";
import { parseISO } from "date-fns";

interface DayGridProps {
  activities: Activity[];
}

const DayGrid = (props: DayGridProps) => {
  const activityTypes = useAppSelector(selectActivityTypes).activityTypes;
  const dispatch = useAppDispatch();

  const getActivityTypeName = (id: string): string => {
    return activityTypes.find((a) => a.id === id)?.name!;
  };

  const handleRemove = async (year: number, month: number, id: string) => {
    try {
      await dispatch(
        deleteActivity({ year: year, month: month, id: id })
      ).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <table>
      {props.activities?.map((activity) => (
        <>
          <tr>
            <td>
              <div key={activity.id}>
                {getActivityTypeName(activity.activityTypeId!)}
              </div>
            </td>
            <td>
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
            </td>
          </tr>
        </>
      ))}
    </table>
  );
};

export default DayGrid;
