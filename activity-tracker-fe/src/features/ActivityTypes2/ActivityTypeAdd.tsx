import { Field, FieldProps, Form, Formik } from "formik";
import Title from "../../components/Title";
import { Box, Button, Grid, TextField } from "@mui/material";
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
    try {
      await dispatch(
        postActivityType({
          name: values.activityTypeName,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form data-testid="add-activity-type-form">
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
                <Field>
                  {({ form }: FieldProps<string, FormValues>) => (
                    <TextField
                      label="Activity type name"
                      name="activityTypeName"
                      variant="outlined"
                      fullWidth
                      value={form.values.activityTypeName}
                      onChange={form.handleChange}
                      error={
                        form.touched.activityTypeName &&
                        Boolean(form.errors.activityTypeName)
                      }
                      helperText={
                        form.touched.activityTypeName &&
                        form.errors.activityTypeName
                      }
                    />
                  )}
                </Field>
                <Box marginLeft={1}>
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
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ActivityTypeAdd;
