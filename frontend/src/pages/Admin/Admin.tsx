import { Box } from "@mui/material";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import { useAppSelector } from "../../app/hooks";
import LockIcon from "@mui/icons-material/Lock";

const Admin = () => {
  const userAdmin = useAppSelector(selectedUserInfo);

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
