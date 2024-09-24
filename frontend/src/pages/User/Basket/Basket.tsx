import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import ProductCard from "../../../components/productBox/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addToTotalOrderForWaiting, selectedBasket, selectedWaitingOrderList } from "../../../app/features/bascketSlice";
import { ChangeEvent, useState } from "react";
import { selectedUserInfo } from "../../../app/features/userInfoSlice";

const Basket = () => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectedBasket);
  const waitingOrderList = useAppSelector(selectedWaitingOrderList);
  const userInfo = useAppSelector(selectedUserInfo);
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const totalprice = basket.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.quantity), 0);

  const handleToggalConfirm = () => {
    setOpen(!open);
  };

  const handleConfirmOrder = () => {
    if (!cardNumber) {
      return alert("Error Fill required");
    }
    setOpen(false);
    dispatch(addToTotalOrderForWaiting({ basket, totalprice, cardNumber, userInfo }));
    alert("Order Confirmed!");
  };

  const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    // Проверка: только цифры
    if (!/^\d*$/.test(number)) {
      alert("Only numbers are allowed for the card number.");
      return;
    }
    setCardNumber(number);
  };

  console.log(waitingOrderList, "11221543298875");

  return (
    <>
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
    </>
  );
};

export default Basket;
