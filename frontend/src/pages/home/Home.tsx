import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useGetAllCategoryListQuery, useGetAllProductsQuery } from "../../app/api/dataFromDummy";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import TopProducts from "../../components/TopProducts/TopProducts";
import ProductCard from "../../components/productBox/ProductCard";
import { useState } from "react";

const Home = () => {
  const { data: categoryList } = useGetAllCategoryListQuery();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [nameOrder, setNameOrder] = useState("");

  const { data, error, isLoading } = useGetAllProductsQuery({ limit: 60, skip: 0, filter: selectedCategory });

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(`/category/${event.target.value}`);
  };

  const handlePriceChange = (event: SelectChangeEvent<string>) => {
    setPriceOrder(event.target.value);
  };

  const handleNameChange = (event: SelectChangeEvent<string>) => {
    setNameOrder(event.target.value);
  };

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <TopProducts />

      {/*  */}
      <Box sx={{ display: "flex", gap: 2, mt: 4, color: "white", bgcolor: "#171717", borderRadius: 1, p: 1 }}>
        <FormControl variant="outlined" sx={{ minWidth: 120, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}> Категория</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange} label="Категория" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categoryList?.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 120, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Price</InputLabel>
          <Select value={priceOrder} onChange={handlePriceChange} label="Цена" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 120, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Name</InputLabel>
          <Select value={nameOrder} onChange={handleNameChange} label="Название" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/*  */}

      <Grid container spacing={2} mt={1}>
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
