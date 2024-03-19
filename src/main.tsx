import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignUpPage.tsx";
import ForgotPasswordPage from "./pages/ModifyPasswordPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  // {
  //   path: "/new-password",
  //   element: <NewPasswordPage />,
  // },
  // {
  //   path: "/email-confirm",
  //   element: <EmailConfirmPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-gradient-to-b from-violet-950 to-fuchsia-900 h-full">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
