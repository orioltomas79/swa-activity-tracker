import Typography from "@mui/material/Typography";
import Title from "../../components/Title";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectActivityTypes } from "../activityTypes/store/selectors";

export default function ActivityAdd() {
  const activityTypes = useAppSelector(selectActivityTypes).activityTypes;

  return (
    <>
      <Title>Add activity</Title>
      <Typography color="text.secondary">Date</Typography>
      <DatePicker />
      <Box marginTop={1} sx={{ minWidth: 120 }}>
        <InputLabel>Activity Type</InputLabel>
        <Select label="Activty type">
          {activityTypes.map((r) => (
            <MenuItem key={r.id} value={r.id}>
              {r.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box marginTop={2}>
        <Button variant="contained">Add</Button>
      </Box>
    </>
  );
}
