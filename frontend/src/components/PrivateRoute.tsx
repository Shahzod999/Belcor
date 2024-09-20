import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const userInfo = true;
  return userInfo ? <Outlet /> : <Navigate to="/auth" replace />;
};
//мы тут
export default PrivateRoute;
