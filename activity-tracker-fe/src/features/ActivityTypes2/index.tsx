import { Grid } from "@mui/material";
import ActivityTypeTable from "./ActivityTypeTable";
import ActivityTypeAdd from "./ActivityTypeAdd";

const ActivityTypes = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ActivityTypeAdd />
      </Grid>
      <Grid item xs={12}>
        <ActivityTypeTable />
      </Grid>
    </Grid>
  );
};
export default ActivityTypes;
