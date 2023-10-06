import { Grid } from "@mui/material";
import ActivityAdd from "./ActivityAdd";
import ActivityTable from "./ActivityTable";

const Activities = () => {
  return (
    <Grid container spacing={3}>
      {/* Add activity */}
      <Grid item xs={12} md={4} lg={3}>
        <ActivityAdd />
      </Grid>
      {/* Recent Activities */}
      <Grid item xs={12}>
        <ActivityTable />
      </Grid>
    </Grid>
  );
};

export default Activities;
