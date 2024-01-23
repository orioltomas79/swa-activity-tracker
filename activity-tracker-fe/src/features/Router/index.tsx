import Activities from "../Activities2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ActivityTypes from "../ActivityTypes2";
import DevPage from "../DevPage";
import { PageContainer } from "../Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageContainer />,
    children: [
      { path: "/", element: <Activities /> },
      { path: "/activities", element: <Activities /> },
      { path: "/activity-types", element: <ActivityTypes /> },
      { path: "/devpage", element: <DevPage /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
