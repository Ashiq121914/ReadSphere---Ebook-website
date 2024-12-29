import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegsiterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
