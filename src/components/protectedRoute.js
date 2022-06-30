// library imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../service/getUser";


export default function ProtectedRoute(props) {
  return getUser()?.isLoggedIn && getUser()?.access_token ? (
    <Outlet />
  ) : (
    <Navigate to={`/`} />
  );
};
