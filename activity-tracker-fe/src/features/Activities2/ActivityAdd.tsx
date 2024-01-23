import Title from "../../components/Title";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, Grid, MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectActivityTypes } from "../ActivityTypes2/store/selectors";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";

interface FormValues {
  activityDate: string;
  activityType: string;
}

const initialValues: FormValues = {
  activityDate: "",
  activityType: "",
};

const validationSchema = Yup.object({
  activityDate: Yup.string().required("Required"),
  activityType: Yup.string().required("Required"),
});

const ActivityAdd = () => {
  const activityTypes = useAppSelector(selectActivityTypes).activityTypes;

  const handleSubmit = async (values: FormValues) => {
    try {
      console.info("Adding activity");
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
        <Form data-testid="add-activity-form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Title>Add activity </Title>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <DatePicker
                    sx={{ minWidth: 150 }}
                    label="Select Date"
                    value={null}
                  />
                </Box>
                <Box marginLeft={1}>
                  <Field
                    sx={{ minWidth: 150 }}
                    name="activityType"
                    as={Select}
                    label="Select an option"
                  >
                    {activityTypes.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Box>
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

export default ActivityAdd;