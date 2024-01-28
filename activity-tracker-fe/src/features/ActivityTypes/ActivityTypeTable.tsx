import Title from "../../components/Title";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteActivityType } from "./store/actions";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { selectActivityTypes } from "./store/selectors";

export default function ActivityTypeTable() {
  const dispatch = useAppDispatch();

  const activityTypes = useAppSelector(selectActivityTypes).activityTypes;
  const activityTypesFetchStatus =
    useAppSelector(selectActivityTypes).fetchStatus;
  const activityTypesError = useAppSelector(selectActivityTypes).error;

  const handleRemove = async (id: string) => {
    try {
      await dispatch(deleteActivityType(id)).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  let content;

  if (activityTypesFetchStatus === "loading") {
    content = <CircularProgress />;
  } else if (activityTypesFetchStatus === "succeeded") {
    content = (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityTypes
            .slice()
            .sort((a, b) => a.name!.localeCompare(b.name!))
            .map((row) => (
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
  } else if (activityTypesFetchStatus === "failed") {
    content = <div>{activityTypesError}</div>;
  }

  return (
    <>
      <Title>Activities</Title>
      {content}
    </>
  );
}
