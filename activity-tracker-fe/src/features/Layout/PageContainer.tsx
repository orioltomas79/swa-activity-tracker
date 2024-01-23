import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Snackbar from "../Snackbar";
import ResponsiveDrawer from "./ResponsiveDrawer";
import { fetchActivityTypes } from "../ActivityTypes2/store/actions";
import { selectActivityTypes } from "../ActivityTypes2/store/selectors";

const PageContainer = () => {
  const dispatch = useAppDispatch();

  const activityTypesFetchStatus =
    useAppSelector(selectActivityTypes).fetchStatus;

  useEffect(() => {
    if (activityTypesFetchStatus === "idle") {
      dispatch(fetchActivityTypes());
    }
  }, [activityTypesFetchStatus, dispatch]);

  return (
    <>
      <Snackbar />
      <ResponsiveDrawer />
    </>
  );
};

export default PageContainer;
