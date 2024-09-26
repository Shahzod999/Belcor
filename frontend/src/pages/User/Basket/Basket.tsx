import {
  Box,
  Button,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ProductCard from "../../../components/productBox/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  removeTotalBasket,
  selectedBasket,
} from "../../../app/features/bascketSlice";
import { ChangeEvent, useState } from "react";
import { selectedUserInfo } from "../../../app/features/userInfoSlice";
import {
  useGetUserOrdersQuery,
  useSendOrderMutation,
} from "../../../app/api/ordersApi";
import { BasketState } from "../../../app/types/basketSendOrder";
import Loader from "../../../components/Loader";
import WaitingOrders from "../../../components/waitingOrderlist/WaitingOrders";
import UniversalModal from "../../../components/modal/Modal";
import { toggleSnackBar } from "../../../app/features/snackBarSlice";

const Basket = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectedBasket);
  const userInfo = useAppSelector(selectedUserInfo);
  const waitingOrderList = useGetUserOrdersQuery();
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const totalprice = basket.reduce(
    (acc, curr) => acc + Number(curr.price) * Number(curr.quantity),
    0,
  );
  const [sendOrder, { isLoading: sendingOrderLoading }] =
    useSendOrderMutation();

  const handleToggalConfirm = () => {
    setOpen(!open);
  };

  console.log(basket);

  const handleConfirmOrder = async () => {
    const orders: BasketState[] = [];
    const orderStatus = {
      delivered: false,
      shipped: false,
      received: true,
    };

    if (!cardNumber) {
      dispatch(
        toggleSnackBar({
          isActive: true,
          text: "Error: Please fill in the required card number.",
          error: true,
        }),
      );
      return;
    }
    if (!basket || basket.length === 0) {
      setOpen(false);
      dispatch(
        toggleSnackBar({
          isActive: true,
          text: "Error: Your basket is empty.",
          error: true,
        }),
      );
      return;
    }

    if (!userInfo) {
      dispatch(
        toggleSnackBar({
          isActive: true,
          text: "Error User Info",
          error: true,
        }),
      );
      return;
    }

    basket.forEach((element) => {
      const {
        title,
        quantity,
        price,
        brand,
        category,
        stock,
        availabilityStatus,
      } = element;
      orders.push({
        title,
        quantity,
        price,
        brand,
        category,
        stock,
        availabilityStatus,
      });
    });

    try {
      const res = await sendOrder({
        basket: orders,
        totalprice,
        cardNumber,
        userInfo,
        orderStatus,
      }).unwrap();

      dispatch(removeTotalBasket());
      dispatch(
        toggleSnackBar({
          isActive: true,
          text: "Order ready :)",
        }),
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    if (!/^\d*$/.test(number)) {
      dispatch(
        toggleSnackBar({
          isActive: true,
          text: "Only numbers are allowed for the card number.",
          error: true,
        }),
      );
      return;
    }
    setCardNumber(number);
  };

  return (
    <>
      {sendingOrderLoading && <Loader />}
      <Grid container spacing={2} sx={{ mt: 10 }}>
        {basket.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} viewMode="basket" />
          </Grid>
        ))}
        <Box
          sx={{
            mt: 5,
            mb: 15,
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant="h6" component="div" color="white">
            Total Price: ${totalprice.toFixed(2)}
          </Typography>

          <Button variant="contained" onClick={handleToggalConfirm}>
            Order
          </Button>
        </Box>
      </Grid>

      <UniversalModal
        open={open}
        onClose={handleToggalConfirm}
        onConfirm={handleConfirmOrder}
        title="Are u agree to continue"
        isLoading={sendingOrderLoading}>
        <DialogTitle>Confirm Order</DialogTitle>
        <Typography variant="body1" gutterBottom>
          Total Price: ${totalprice.toFixed(2)}
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Card Number"
          type="text"
          fullWidth
          variant="outlined"
          value={cardNumber}
          onChange={handleCardNumber}
        />
      </UniversalModal>

      <WaitingOrders
        data={waitingOrderList.data}
        isError={waitingOrderList.isError}
        isLoading={waitingOrderList.isLoading}
      />
    </>
  );
};

export default Basket;
