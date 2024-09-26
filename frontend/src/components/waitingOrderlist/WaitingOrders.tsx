import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, SelectChangeEvent } from "@mui/material";
import Loader from "../Loader";
import { WaitingOrdersProps } from "../../app/types/basketSendOrder";
import RenderStatusIndicator from "./RenderStatusIndicator";
import OrderFilter from "../filterProducts/OrderFilter";

type OrderStatus = "received" | "shipped" | "delivered" | "";

const WaitingOrders = ({ data: waitingOrderList, isLoading }: WaitingOrdersProps) => {
  const [status, setStatus] = useState<OrderStatus>("");
  

  if (isLoading) {
    return <Loader />;
  }

  console.log(waitingOrderList);
  


  const statusFilters = ["received", "shipped", "delivered"];

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as OrderStatus);
  };

  console.log(status);
  
  const filteredOrderList = status ? waitingOrderList?.filter(order => order.orderStatus[status]) : waitingOrderList;


  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" align="center" gutterBottom>
        Waiting Orders
      </Typography>

      <OrderFilter
        statusFilters={statusFilters}
        status={status}
        onStatusChange={handleStatusChange}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price x 1</TableCell>
            <TableCell align="center">Total Price</TableCell>
            <TableCell align="center">Card Number</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrderList?.map((order) => (
            <React.Fragment key={order._id}>
              <TableRow >
                <TableCell>{order._id}</TableCell>
                <TableCell>
                  {order.basket.map((item) => (
                    <Typography key={item._id}>{item.title}</Typography>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {order.basket.map((item) => (
                    <Typography key={item._id}>{item.quantity}</Typography>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {order.basket.map((item) => (
                    <Typography key={item._id}>${item.price.toFixed(2)}</Typography>
                  ))}
                </TableCell>
                <TableCell align="center">${order.totalprice.toFixed(2)}</TableCell>
                <TableCell align="center">**** **** **** {order.cardNumber.slice(-4)}</TableCell>
                <TableCell align="center">{order.userInfo.username}</TableCell>
                <TableCell align="center">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</TableCell>
              </TableRow>
              <TableRow >
                <RenderStatusIndicator status={order.orderStatus} product={order}/>
              </TableRow>
            </React.Fragment>

          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaitingOrders;
