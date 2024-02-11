import { Grid } from "@mui/material";
import ActivityStatsTable from "./ActivityStatsTable";

const ActivitiesStats = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ActivityStatsTable />
      </Grid>
    </Grid>
  );
};

export default ActivitiesStats;
