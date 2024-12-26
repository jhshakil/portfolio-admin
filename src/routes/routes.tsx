import { createBrowserRouter } from "react-router";
import ErrorPage from "@/pages/ErrorPage";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Project from "@/pages/Project";
import Experience from "@/pages/Experience";
import Blog from "@/pages/Blog";
import Skill from "@/pages/Skill";
import Social from "@/pages/Social";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/skill",
        element: <Skill />,
      },
      {
        path: "/social",
        element: <Social />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routes;
