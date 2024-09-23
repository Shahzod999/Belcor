import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useGetAllCategoryListQuery, useGetAllProductsQuery } from "../../app/api/dataFromDummy";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import TopProducts from "../../components/TopProducts/TopProducts";
import ProductCard from "../../components/productBox/ProductCard";
import { useState } from "react";

const Home = () => {
  const { data: categoryList } = useGetAllCategoryListQuery();
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    name: "",
  });

  const { data, error, isLoading } = useGetAllProductsQuery({
    limit: 60,
    skip: 0,
    filter: filters.category ? `/category/${filters.category}` : "",
    sort: filters.price || filters.name ? `&sortBy=${filters.price ? "price" : "title"}&order=${filters.price || filters.name}` : "",
  });

  const handleFilterChange = (type: string) => (event: SelectChangeEvent<string>) => {
    setFilters({
      ...filters,
      [type]: event.target.value,
    });
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

      <Box sx={{ display: "flex", gap: 2, mt: 4, color: "white", bgcolor: "#171717", borderRadius: 1, p: 1 }}>
        <FormControl variant="outlined" sx={{ minWidth: 120, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}> Категория</InputLabel>
          <Select value={filters.category} onChange={handleFilterChange("category")} label="Категория" sx={{ color: "white" }}>
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
          <Select value={filters.price} onChange={handleFilterChange("price")} label="Цена" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 120, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Name</InputLabel>
          <Select value={filters.name} onChange={handleFilterChange("name")} label="Название" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* пауза тут */}

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
