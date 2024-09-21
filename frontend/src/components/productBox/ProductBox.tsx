import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../app/types/ProductTypes";

const ProductBox = ({ product }: { product: Product }) => {
  return (
    <Card sx={{ boxShadow: "0 0 20px 10px black" }}>
      <CardMedia sx={{ height: 140, backgroundSize: "contain", backgroundPosition: "center" }} image={product.thumbnail} title="Product Thumbnail" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
        {/* Цена */}
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          Price: {product.price} $
        </Typography>
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          Raiting: {product.rating}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          Buy
        </Button>
        <Button size="small" variant="outlined">
          more info...
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductBox;
