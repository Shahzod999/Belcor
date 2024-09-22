import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Rating, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProductToFavorite, removeProductFromFavorite, selectedFavorite } from "../../app/features/favoriteSlice";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

type ProductCardProps = {
  product: any;
  viewMode?: "single" | "grid";
};
export interface ReviewState {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

const ProductCard = ({ product, viewMode = "single" }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectedFavorite);

  const isFavorite = favorites.some((favProd: any) => favProd.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeProductFromFavorite(product.id));
    } else {
      dispatch(addProductToFavorite(product));
    }
  };
  //в принципе чтобы добавлять к favorites я бы отправил PUT запрос на сервер и добавил бы в обьект ключ пару favorites: true

  return (
    <Card
      sx={{
        minHeight: "300px",
        height: "100%",
        p: viewMode === "single" ? 3 : 2,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        "&:hover": { transform: viewMode === "grid" ? "scale(1.05)" : "none" },
        position: "relative",
      }}>
      <Box position="absolute" right={10} top={10} onClick={toggleFavorite} sx={{ cursor: "pointer" }}>
        {isFavorite ? <FavoriteIcon sx={{ color: "#fc665b", fontSize: "33px" }} /> : <FavoriteBorderIcon />}
      </Box>

      <Grid container>
        {/* Изображение продукта */}
        <Grid md={viewMode === "single" ? 6 : 12}>
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

        {/* Описание продукта */}
        <Grid md={viewMode === "single" ? 6 : 12}>
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
            <Rating value={product.rating} readOnly precision={0.1} />

            {/* Дополнительная информация только для страницы одного продукта */}
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
                </Box>

                <Box mt={2}>
                  <Typography variant="subtitle1">Shipping Information</Typography>
                  <Typography variant="body2">{product.shippingInformation}</Typography>
                  <Typography variant="body2">Return Policy: {product.returnPolicy}</Typography>
                </Box>

                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Add to Cart
                </Button>
              </>
            )}

            {/* Ссылка на продукт в режиме "grid" */}
            {viewMode === "grid" && (
              <Button component={Link} to={`/${product.id}`} variant="contained" color="primary" sx={{ mt: 2 }}>
                View Details
              </Button>
            )}
          </CardContent>
        </Grid>
      </Grid>

      {/* Отзывы только для страницы одного продукта */}
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
