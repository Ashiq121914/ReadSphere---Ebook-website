import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegsiterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
