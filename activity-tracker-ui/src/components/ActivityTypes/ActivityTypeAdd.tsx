import { Field, FieldProps, Form, Formik } from "formik";
import Title from "../Title";
import { Box, Button, Grid, TextField } from "@mui/material";
import * as Yup from "yup";

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
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
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
                  <Button type="submit" variant="contained" color="primary">
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
