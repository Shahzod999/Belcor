import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Loader from "../Loader";
import Error from "../Error";
import { WaitingOrdersProps } from "../../app/types/basketSendOrder";

const WaitingOrders = ({ data: waitingOrderList, isError, isLoading }: WaitingOrdersProps) => {
  console.log(waitingOrderList);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" gutterBottom>
        Waiting Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price x 1</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Card Number</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {waitingOrderList?.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {order.basket.map((item) => (
                  <Typography key={item._id}>{item.title}</Typography>
                ))}
              </TableCell>
              <TableCell align="right">
                {order.basket.map((item) => (
                  <Typography key={item._id}>{item.quantity}</Typography>
                ))}
              </TableCell>
              <TableCell align="right">
                {order.basket.map((item) => (
                  <Typography key={item._id}>${item.price.toFixed(2)}</Typography>
                ))}
              </TableCell>
              <TableCell align="right">${order.totalprice.toFixed(2)}</TableCell>
              <TableCell align="right">**** **** **** {order.cardNumber.slice(-4)}</TableCell>
              <TableCell align="right">{order.userInfo.username}</TableCell>
              <TableCell align="right">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaitingOrders;
