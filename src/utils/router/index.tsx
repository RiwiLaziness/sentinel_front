import { createBrowserRouter } from "react-router-dom";
import { AppContent } from "../../App";
import HomePage from "../../ui/pages/HomePage";
import AuthPage from "../../ui/pages/AuthPage";
import Dashboard from "../../ui/pages/Dashboard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContent />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);
