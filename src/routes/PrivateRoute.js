import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "redux/features/auth.slice";
import MainLoader from "components/MainLoader/MainLoader";

const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser, loading, isAuth } = useSelector((state) => state.auth);
  console.log({ currentUser, loading, isAuth });
  useEffect(() => {
    !(location?.from === "/login") && dispatch(checkAuth());
  }, [dispatch, location]);

  if (!isAuth) return <Redirect to="/login" />;
  if (loading || !currentUser) return <MainLoader />;
  return !!currentUser && <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
