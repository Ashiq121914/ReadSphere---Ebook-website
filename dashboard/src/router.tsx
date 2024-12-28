import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/Login";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);
