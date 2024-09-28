import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Rating, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProductToFavorite, removeProductFromFavorite, selectedFavorite } from "../../app/features/favoriteSlice";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductToBasket, removeProductFromBasket, selectedBasket } from "../../app/features/bascketSlice";
import { useState } from "react";
import { Product } from "../../app/types/ProductTypes";
import { selectedUserInfo } from "../../app/features/userInfoSlice";
import { toggleSnackBar } from "../../app/features/snackBarSlice";

type ProductCardProps = {
  product: Product;
  viewMode?: "single" | "grid" | "basket";
};
export interface ReviewState {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

const ProductCard = ({ product, viewMode = "single" }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectedFavorite);
  //в принципе чтобы добавлять к favorites я бы отправил PUT запрос на сервер и добавил бы в обьект ключ пару favorites: true
  const basket = useAppSelector(selectedBasket);
  const userInfo = useAppSelector(selectedUserInfo);

  const isFavorite = favorites.some((favProd: Product) => favProd.id === product.id);
  const productInBasket = basket.find((basketProd: Product) => basketProd.id === product.id);
  const [quantity, setQuantity] = useState(productInBasket?.quantity || 1);

  const totalPriceProduct = (product.price * quantity).toFixed(2);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeProductFromFavorite(product.id));
      dispatch(toggleSnackBar({ isActive: true, text: "Deleted from favorites!" }));
    } else {
      dispatch(addProductToFavorite(product));
      dispatch(toggleSnackBar({ isActive: true, text: "Added to favorites!" }));
    }
  };

  const handleQuantity = (method: string) => {
    switch (method) {
      case "+":
        setQuantity((prev) => Math.min(prev + 1, product.stock));
        break;
      case "-":
        // пауза тут исправить минус вычитание
        setQuantity((prev) => Math.max(prev - 1, 1));
        break;
    }
  };

  const handleAddToBasket = () => {
    if (!userInfo) {
      return navigate("/logOut");
    }
    dispatch(addProductToBasket({ ...product, quantity: quantity, totalPriceProduct }));
    dispatch(toggleSnackBar({ isActive: true, text: "Added to basket!" }));
  };

  const removeFromBasket = () => {
    dispatch(removeProductFromBasket(product));
    dispatch(toggleSnackBar({ isActive: true, text: "Deleted from basket!" }));
  };

  return (
    <Card
      sx={{
        minHeight: "300px",
        height: "100%",
        p: viewMode === "single" ? 3 : 2,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        "&:hover": { transform: viewMode === "grid" || viewMode === "basket" ? "scale(1.05)" : "none" },
        position: "relative",
      }}>
      <Box position="absolute" right={10} top={10} onClick={toggleFavorite} sx={{ cursor: "pointer" }}>
        {isFavorite ? <FavoriteIcon sx={{ color: "#fc665b", fontSize: "33px" }} /> : <FavoriteBorderIcon />}
      </Box>

      <Grid container>
        <Grid item md={viewMode === "single" ? 6 : 12}>
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{
              width: "100%",
              height: viewMode === "single" ? "auto" : 200,
              borderRadius: 2,
              objectFit: "contain",
            }}
          />
        </Grid>

        <Grid item md={viewMode === "single" ? 6 : 12}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {product.title}
            </Typography>
            {viewMode === "single" && (
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Category: {product.category}
              </Typography>
            )}
            <Typography variant="body1" color="text.secondary" paragraph>
              {viewMode === "single" ? product.description : `${product.description.slice(0, 60)}...`}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mb: 2 }}>
              Price: ${product.price}
            </Typography>
            {(viewMode === "single" || viewMode === "basket") && (
              <Typography color="secondary" sx={{ fontWeight: "bold", mb: 2 }}>
                Total Price: ${totalPriceProduct} x {quantity}
              </Typography>
            )}

            <Rating value={product.rating} readOnly precision={0.1} />

            {viewMode === "single" && (
              <>
                <Box mt={2}>
                  <Typography variant="body2">SKU: {product.sku}</Typography>
                  <Typography variant="body2">Stock: {product.stock}</Typography>
                  <Typography variant="body2">Weight: {product.weight} g</Typography>
                  <Typography variant="body2">
                    Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                  </Typography>
                  <Typography variant="body2">Warranty: {product.warrantyInformation}</Typography>
                  <Typography variant="body2">In stock: {product.stock}</Typography>
                </Box>

                <Box mt={2}>
                  <Typography variant="subtitle1">Shipping Information</Typography>
                  <Typography variant="body2">{product.shippingInformation}</Typography>
                  <Typography variant="body2">Return Policy: {product.returnPolicy}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <IconButton onClick={() => handleQuantity("-")} disabled={quantity <= 1}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ mx: 2 }}>
                    {quantity}
                  </Typography>
                  <IconButton onClick={() => handleQuantity("+")}>
                    <AddIcon />
                  </IconButton>
                </Box>

                <Button onClick={handleAddToBasket} variant="contained" color="primary">
                  {productInBasket ? "Change Basket" : "Add to Basket"}
                </Button>
              </>
            )}

            {(viewMode === "basket" || viewMode === "single") && productInBasket && (
              <IconButton aria-label="delete" size="large" onClick={removeFromBasket}>
                <DeleteForeverIcon fontSize="inherit" />
              </IconButton>
            )}

            {viewMode === "basket" && (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    padding: 2,
                    backgroundColor: "primary.main",
                    borderRadius: 1,
                    boxShadow: 3,
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <Typography sx={{ color: "white", fontSize: "13px" }}>Items in Basket: {productInBasket?.quantity || 0}</Typography>
                </Box>
              </>
            )}

            {(viewMode === "grid" || viewMode === "basket") && (
              <Button component={Link} to={`/${product.id}`} variant="contained" color="primary" sx={{ mt: 2 }}>
                View Details
              </Button>
            )}
          </CardContent>
        </Grid>
      </Grid>

      {viewMode === "single" && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          <List>
            {product.reviews.map((review: ReviewState, index: number) => (
              <Box key={index}>
                <ListItem>
                  <ListItemText primary={`${review.reviewerName} (${review.rating}/5)`} secondary={review.comment} />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Card>
  );
};

export default ProductCard;
