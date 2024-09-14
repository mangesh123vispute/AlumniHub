import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route {...rest}>{children}</Route>
    </Routes>
  );
};

export default PrivateRoute;
