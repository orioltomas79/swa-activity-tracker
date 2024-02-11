import Activities from "../Activities";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ActivityTypes from "../ActivityTypes";
import DevPage from "../DevPage";
import { PageContainer } from "../Layout";
import ActivitiesStats from "../ActivitiesStats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer />,
    children: [
      { path: "/", element: <Activities /> },
      { path: "/activities", element: <Activities /> },
      { path: "/activity-types", element: <ActivityTypes /> },
      { path: "/activities-stats", element: <ActivitiesStats /> },
      { path: "/devpage", element: <DevPage /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
