import { Grid } from "@mui/material";
import { selectedFavorite } from "../../../app/features/favoriteSlice";
import { useAppSelector } from "../../../app/hooks";
import ProductCard from "../../../components/productBox/ProductCard";

const Favorite = () => {
  const favoriteProducts = useAppSelector(selectedFavorite);

  return (
    <Grid container spacing={2} sx={{ marginTop: "70px" }}>
      {favoriteProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} viewMode="grid" />
        </Grid>
      ))}
    </Grid>
  );
};

export default Favorite;
