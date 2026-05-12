import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { CreateAdminAccount } from "./components/CreateAdminAccount";
import AllStoriesPage from "./pages/AllStoriesPage";
import AboutUsPage from "./pages/AboutUsPage";
import TeamPage from "./pages/TeamPage";
import InitiativeDetailPage from "./pages/InitiativeDetailPage";
import CareersPage from "./pages/CareersPage";

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
    path: "/team",
    Component: TeamPage,
  },
  {
    path: "/careers",
    Component: CareersPage,
  },
  {
    path: "/initiatives/:slug",
    Component: InitiativeDetailPage,
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
