import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";

function createData(id: number, name: string) {
  return { id, name };
}

const rows = [
  createData(0, "Padel - Partit"),
  createData(1, "Padel - Entreno"),
  createData(2, "Gym - Cames"),
  createData(3, "Gym - Esquena"),
  createData(4, "Gym - Pit"),
];

export default function ActivityTypeTable() {
  return (
    <React.Fragment>
      <Title>Activities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
