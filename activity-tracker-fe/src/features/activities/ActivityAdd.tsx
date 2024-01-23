import Title from "../../components/Title";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, Grid, MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectActivityTypes } from "../ActivityTypes/store/selectors";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { selectActivities } from "./store/selectors";
import { useState } from "react";

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
  const activitiesState = useAppSelector(selectActivities);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

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
                    onChange={handleDateChange}
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
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={
                      activitiesState.fetchStatus === "idle" ||
                      activitiesState.operationStatus === "loading"
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

export default ActivityAdd;
