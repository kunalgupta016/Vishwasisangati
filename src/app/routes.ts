import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { CreateAdminAccount } from "./components/CreateAdminAccount";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
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