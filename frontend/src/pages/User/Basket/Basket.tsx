import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import ProductCard from "../../../components/productBox/ProductCard";
import { useAppSelector } from "../../../app/hooks";
import { selectedBasket } from "../../../app/features/bascketSlice";
import { ChangeEvent, useState } from "react";
import { selectedUserInfo } from "../../../app/features/userInfoSlice";
import { useSendOrderMutation } from "../../../app/api/ordersApi";
import { BasketItem } from "../../../app/types/basketSendOrder";
import Loader from "../../../components/Loader";
import WaitingOrders from "../../../components/waitingOrderlist/WaitingOrders";

const Basket = () => {
  const basket = useAppSelector(selectedBasket);
  const userInfo = useAppSelector(selectedUserInfo);
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const totalprice = basket.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.quantity), 0);
  const [sendOrder, { isLoading: sendingOrderLoading }] = useSendOrderMutation();

  const handleToggalConfirm = () => {
    setOpen(!open);
  };

  console.log(basket);

  const handleConfirmOrder = async () => {
    let orders: BasketItem[] = [];

    if (!cardNumber) {
      return alert("Error: Please fill in the required card number.");
    }
    if (!basket || basket.length === 0) {
      setOpen(false);
      return alert("Error: Your basket is empty.");
    }

    const endPoint = confirm("Would you like to confirm the order?");
    if (!endPoint) {
      return alert("You have canceled the order.");
    }

    basket.forEach((element) => {
      const { title, quantity, price, brand, category, stock, availabilityStatus } = element;
      orders.push({ title, quantity, price, brand, category, stock, availabilityStatus });
    });

    try {
      const res = await sendOrder({ basket: orders, totalprice, cardNumber, userInfo }).unwrap();
      console.log(res, "Alhamdullilah");
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    if (!/^\d*$/.test(number)) {
      alert("Only numbers are allowed for the card number.");
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
        <Box sx={{ mt: 5, mb: 15, display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div" color="white">
            Total Price: ${totalprice.toFixed(2)}
          </Typography>

          <Button variant="contained" onClick={handleToggalConfirm}>
            Order
          </Button>
        </Box>
      </Grid>

      <Dialog open={open} onClose={handleToggalConfirm}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Total Price: ${totalprice.toFixed(2)}
          </Typography>
          <TextField autoFocus margin="dense" label="Card Number" type="text" fullWidth variant="outlined" value={cardNumber} onChange={handleCardNumber} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggalConfirm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmOrder} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <WaitingOrders />
    </>
  );
};

export default Basket;
