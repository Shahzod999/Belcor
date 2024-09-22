import { Container, Grid } from "@mui/material";
import { useGetAllProductsQuery } from "../../app/api/dataFromDummy";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import TopProducts from "../../components/TopProducts/TopProducts";
import ProductCard from "../../components/productBox/ProductCard";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({ limit: 60, skip: 0 });

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <TopProducts />
      <Grid container spacing={2} sx={{ marginTop: "70px" }}>
        {data?.products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} viewMode="grid" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
