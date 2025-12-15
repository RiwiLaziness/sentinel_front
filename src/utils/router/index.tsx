import { createBrowserRouter } from "react-router-dom";
import { AppContent } from "../../App";

import HomePage from "../../ui/pages/HomePage";
import AuthPage from "../../ui/pages/AuthPage";
import Dashboard from "../../ui/pages/Dashboard";
import ScansPage from "../../ui/pages/ScanPanel";
import WorkspacesPage from "../../ui/pages/WorkspacesPage";
import FindingsPage from "../../ui/pages/FindingPanel";
import SettingsPage from "../../ui/pages/SettingsPage";
import BillingPage from "../../ui/pages/BillingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContent />, // Layout principal (Sidebar + Header + Outlet)
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },

      // ====== PRIVATE PAGES ======
      { path: "dashboard", element: <Dashboard /> },
      { path: "scans", element: <ScansPage /> },
      { path: "workspaces", element: <WorkspacesPage /> },
      { path: "findings", element: <FindingsPage /> },
      { path: "billing", element: <BillingPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
