import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";

interface DayLabelProps {
  date: string;
}

function getMonthName(inputDate: string): string {
  const parsedDate = new Date(inputDate);
  return format(parsedDate, "MMM");
}

function getDayNumber(inputDate: string): number {
  const parsedDate = new Date(inputDate);
  return parsedDate.getDate();
}

const isWeekend = (date: string): boolean => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
};

const DayLabel = (props: DayLabelProps) => {
  return (
    <Paper style={{ maxWidth: "60px" }}>
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: isWeekend(props.date)
                ? "rgb(25, 118, 210)"
                : "rgb(100, 100, 100)",
            }}
          >
            <TableCell align="center" style={{ color: "white" }}>
              {getMonthName(props.date)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow style={{ border: "0" }}>
            <TableCell align="center" style={{ borderBottom: "none" }}>
              {getDayNumber(props.date)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};
export default DayLabel;
