import Typography from "@mui/material/Typography";
import Title from "../../components/Title";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";

export default function ActivityAdd() {
  return (
    <>
      <Title>Add activity</Title>
      <Typography color="text.secondary">Date</Typography>
      <DatePicker />
      <Box marginTop={1} sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Activity Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Activty type"
        >
          <MenuItem value={10}>Padel - Partit</MenuItem>
          <MenuItem value={20}>Gym - Cames</MenuItem>
          <MenuItem value={30}>Gym - Esquena</MenuItem>
        </Select>
      </Box>
      <Box marginTop={2}>
        <Button variant="contained">Add</Button>
      </Box>
    </>
  );
}
