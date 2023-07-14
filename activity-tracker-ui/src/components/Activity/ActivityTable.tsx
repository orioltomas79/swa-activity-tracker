import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../Title";

function createData(id: number, date: string, name: string) {
  return { id, date, name };
}

const rows = [
  createData(0, "16 Mar, 2019", "Padel - Partit"),
  createData(1, "16 Mar, 2019", "Gym - Esquena"),
  createData(3, "16 Mar, 2019", "Gym - Cames"),
  createData(4, "15 Mar, 2019", "Gym - Pit"),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function ActivityTable() {
  return (
    <>
      <Title>Recent activities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">Remove</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more activities
      </Link>
    </>
  );
}
