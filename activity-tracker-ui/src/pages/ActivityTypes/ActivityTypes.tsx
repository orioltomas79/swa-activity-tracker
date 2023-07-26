import { Grid } from "@mui/material";
import ActivityTypeTable from "../../components/ActivityTypes/ActivityTypeTable";
import ActivityTypeAdd from "../../components/ActivityTypes/ActivityTypeAdd";

const Activities = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ActivityTypeAdd activityTypeName={""} />
      </Grid>
      <Grid item xs={12}>
        <ActivityTypeTable />
      </Grid>
    </Grid>
  );
};
export default Activities;
