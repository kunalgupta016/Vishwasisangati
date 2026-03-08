import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { CreateAdminAccount } from "./components/CreateAdminAccount";
import AllStoriesPage from "./pages/AllStoriesPage";
import AboutUsPage from "./pages/AboutUsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/about",
    Component: AboutUsPage,
  },
  {
    path: "/stories",
    Component: AllStoriesPage,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/setup",
    Component: CreateAdminAccount,
  },
]);