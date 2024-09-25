import { Box } from "@mui/material";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import { useAppSelector } from "../../app/hooks";
import LockIcon from "@mui/icons-material/Lock";
import { useGetAllOrdersQuery } from "../../app/api/ordersApi";
import Loader from "../../components/Loader";

const Admin = () => {
  const userAdmin = useAppSelector(selectedUserInfo);
  const { data, error, isLoading } = useGetAllOrdersQuery();

  console.log(data, "sad");

  if (isLoading) {
    return <Loader />;
  }
  if (userAdmin?.isAdmin) {
    return (
      <Box mt={10}>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
        <h1>Admin</h1>
      </Box>
    );
  } else
    return (
      <Box sx={{ width: "100%", height: "100vh", display: "grid", placeItems: "center" }}>
        <Box>
          <LockIcon sx={{ fontSize: 100 }} />
        </Box>
      </Box>
    );
};

export default Admin;
