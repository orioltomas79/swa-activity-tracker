import { Grid } from "@mui/material";
import ActivitiesTable from "../../components/ActivitiesTable";
import ActivitiesAdd from "../../components/ActivitiesAdd";

const Activities = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ActivitiesAdd />
      </Grid>
      <Grid item xs={12}>
        <ActivitiesTable />
      </Grid>
    </Grid>
  );
};
export default Activities;
