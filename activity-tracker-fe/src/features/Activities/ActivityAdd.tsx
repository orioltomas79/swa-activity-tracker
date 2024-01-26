import Title from "../../components/Title";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActivityTypes } from "../ActivityTypes/store/selectors";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postActivity } from "./store/actions";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { DATE_FORMAT_DD_MMM_YYYY } from "src/utils/dateUtils";

interface FormValues {
  activityDate: Date;
  activityType: string;
}

const initialValues: FormValues = {
  activityDate: new Date(),
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
    await dispatch(
      postActivity({
        activityType: values.activityType,
        date: format(values.activityDate, DATE_FORMAT_DD_MMM_YYYY),
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
              <FormControl>
                <DatePicker
                  sx={{ minWidth: 150 }}
                  value={formik.values.activityDate}
                  onChange={(newValue) =>
                    formik.setFieldValue("activityDate", newValue, true)
                  }
                />
              </FormControl>
            </Box>
            <Box marginLeft={1}>
              <FormControl>
                <Select
                  sx={{ minWidth: 150 }}
                  label="Activity type"
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
              </FormControl>
            </Box>
            <Box marginLeft={1}>
              <FormControl>
                <Button type="submit" variant="contained" color="primary">
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

export default ActivityAdd;
