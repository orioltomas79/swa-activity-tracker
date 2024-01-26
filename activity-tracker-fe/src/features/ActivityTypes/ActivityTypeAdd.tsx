import { useFormik } from "formik";
import Title from "../../components/Title";
import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postActivityType } from "./store/actions";
import { selectActivityTypes } from "./store/selectors";

interface FormValues {
  activityTypeName: string;
}

const initialValues: FormValues = {
  activityTypeName: "",
};

const validationSchema = Yup.object({
  activityTypeName: Yup.string().required("Required"),
});

const ActivityTypeAdd = () => {
  const dispatch = useAppDispatch();
  const activityTypesState = useAppSelector(selectActivityTypes);

  const handleSubmit = async (values: FormValues) => {
    await dispatch(
      postActivityType({
        name: values.activityTypeName,
      })
    ).unwrap();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} data-testid="add-activity-type-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Title>Add activity type</Title>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl>
              <TextField
                label="Activity type name"
                name="activityTypeName"
                variant="outlined"
                fullWidth
                value={formik.values.activityTypeName}
                onChange={formik.handleChange}
                error={
                  formik.touched.activityTypeName &&
                  Boolean(formik.errors.activityTypeName)
                }
                helperText={
                  formik.touched.activityTypeName &&
                  formik.errors.activityTypeName
                }
              />
            </FormControl>
            <Box marginLeft={1}>
              <FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    activityTypesState.fetchStatus === "idle" ||
                    activityTypesState.operationStatus === "loading"
                  }
                >
                  Add
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ActivityTypeAdd;
