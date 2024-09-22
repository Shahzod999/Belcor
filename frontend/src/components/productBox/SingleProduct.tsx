import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../app/api/dataFromDummy";
import Error from "../Error";
import Loader from "../Loader";
import { Box, Container } from "@mui/material";
import ProductCard from "./ProductCard";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleProductQuery({ id });
  console.log(data);
  console.log(id);

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <div>404</div>;
  }
  return (
    <Container>
      <Box sx={{ marginTop: "70px" }}>
        <ProductCard product={data} viewMode="single" />
      </Box>
    </Container>
  );
};

export default SingleProduct;
