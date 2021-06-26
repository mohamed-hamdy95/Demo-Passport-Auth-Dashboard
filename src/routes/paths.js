import Dashboard from "pages/Dashboard/Dashboard";
import AuthPage from "pages/AuthPage/AuthPage";
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/login",
    isPrivate: false,
    exact: true,
    component: <AuthPage />,
    tab: null,
  },
  {
    path: "/",
    isPrivate: true,
    exact: true,
    component: <Dashboard />,
    tab: {
      label: "Dashboard",
      icon: "dashboard",
    },
  },
];
