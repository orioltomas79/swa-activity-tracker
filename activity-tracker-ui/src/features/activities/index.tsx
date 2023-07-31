import { Grid, Paper } from "@mui/material";
import ActivityAdd from "./ActivityAdd";
import ActivityTable from "./ActivityTable";

const Activities = () => {
  return (
    <Grid container spacing={3}>
      {/* Add activity */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 285,
          }}
        >
          <ActivityAdd />
        </Paper>
      </Grid>
      {/* Recent Activities */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <ActivityTable />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Activities;
