import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import { selectedUserInfo } from "../app/features/userInfoSlice";
import { Container } from "@mui/material";

const PrivateRoute = () => {
  const userInfo = useAppSelector(selectedUserInfo);
  return userInfo ? (
    <Container>
      <Outlet />
    </Container>
  ) : (
    <Navigate to="/auth" replace />
  );
};
//пауза тут
export default PrivateRoute;
