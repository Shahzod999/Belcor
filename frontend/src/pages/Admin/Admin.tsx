import { Box } from "@mui/material";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import { useAppSelector } from "../../app/hooks";
import LockIcon from "@mui/icons-material/Lock";
import { useGetAllOrdersQuery } from "../../app/api/ordersApi";
import WaitingOrders from "../../components/waitingOrderlist/WaitingOrders";

const Admin = () => {
  const userAdmin = useAppSelector(selectedUserInfo);
  const AdminGetOrderList = useGetAllOrdersQuery();

  if (userAdmin?.isAdmin) {
    return (
      <Box mt={10}>
        <WaitingOrders data={AdminGetOrderList.data} isError={AdminGetOrderList.isError} isLoading={AdminGetOrderList.isLoading} />
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
