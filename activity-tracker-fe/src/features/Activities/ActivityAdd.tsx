import Title from "../../components/Title";
import { Box, Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActivityTypes } from "../ActivityTypes/store/selectors";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postActivity } from "./store/actions";

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

  const dispatch = useAppDispatch();

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    await dispatch(
      postActivity({
        activityType: values.activityType,
        date: values.activityDate,
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
    <form onSubmit={formik.handleSubmit}>
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
              <TextField
                sx={{ minWidth: 150 }}
                label="Date"
                name="activityDate"
                variant="outlined"
                fullWidth
                value={formik.values.activityDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.activityDate &&
                  Boolean(formik.errors.activityDate)
                }
                helperText={
                  formik.touched.activityDate && formik.errors.activityDate
                }
              />
            </Box>
            <Box marginLeft={1}>
              <Select
                sx={{ minWidth: 150 }}
                label="Type"
                labelId="activityType-label"
                id="activityType"
                name="activityType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.activityType}
                error={
                  formik.touched.activityType &&
                  Boolean(formik.errors.activityType)
                }
              >
                {activityTypes.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box marginLeft={1}>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ActivityAdd;
