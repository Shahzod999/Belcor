import { Grid } from "@mui/material";
import ProductCard from "../../../components/productBox/ProductCard";
import { useAppSelector } from "../../../app/hooks";
import { selectedBasket } from "../../../app/features/bascketSlice";

const Basket = () => {
  const basket = useAppSelector(selectedBasket);

  const totalprice = basket.reduce((acc, curr) => acc + Number(curr.price), 0);

  console.log(totalprice);

  return (
    <Grid container spacing={2} sx={{ marginTop: "70px" }}>
      {basket.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} viewMode="basket" />
        </Grid>
      ))}
    </Grid>
  );
};

export default Basket;
