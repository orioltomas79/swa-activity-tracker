import Title from "../Title";
import { Box, Button, Grid, TextField } from "@mui/material";

export default function ActivityTypeAdd() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title>Add activity</Title>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Activity name"
            variant="outlined"
            size="small"
          />
          <Box marginLeft={1}>
            <Button variant="contained">Add</Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
