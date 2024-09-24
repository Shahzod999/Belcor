import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useGetAllCategoryListQuery, useGetAllProductsQuery } from "../../app/api/dataFromDummy";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import TopProducts from "../../components/TopProducts/TopProducts";
import ProductCard from "../../components/productBox/ProductCard";

import { useState } from "react";
import PaginationRounded from "../../components/Pagination/PaginationRounded";

const Home = () => {
  const { data: categoryList } = useGetAllCategoryListQuery();
  const [pagePagination, setPagePagination] = useState(0);
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    name: "",
  });
  const [pageFilter, setPageFilter] = useState({
    price: "",
    name: "",
  });

  const { data, error, isLoading } = useGetAllProductsQuery({
    limit: 5,
    skip: pagePagination,
    filter: filters.category ? `${filters.category}` : "",
    sortBy: filters.price ? "price" : filters.name ? "title" : "",
    order: filters.price || filters.name || "",
  });

  const handleFilterChange = (type: string) => (event: SelectChangeEvent<string>) => {
    setFilters((prev) => {
      if (type == "price") {
        return {
          ...prev,
          price: event.target.value,
          name: "",
        };
      } else if (type == "name") {
        return {
          ...prev,
          price: "",
          name: event.target.value,
        };
      } else {
        return {
          ...filters,
          [type]: event.target.value,
        };
      }
    });
  };

  const handlePageFilter = (type: string) => (event: SelectChangeEvent<string>) => {
    setPageFilter({
      price: "",
      name: "",
      [type]: event.target.value,
    });
  };

  const handlePagination = (page: number) => {
    setPagePagination(page * 30);
    console.log(`Текущая страница: ${page}`);
  };

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return <Loader />;
  }

  const { products = [], total } = data || {};

  const totalFilteredProducts = [...products].sort((a, b) => {
    if (pageFilter.price == "asc") {
      return a.price - b.price;
    } else if (pageFilter.price == "desc") {
      return b.price - a.price;
    } else if (pageFilter.name == "asc") {
      return a.title.localeCompare(b.title);
    } else if (pageFilter.name == "desc") {
      return b.title.localeCompare(a.title);
    } else {
      return 0; // Без сортировки
    }
  });

  console.log(pageFilter);

  return (
    <Container sx={{ position: "relative" }}>
      <TopProducts />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4, color: "white", bgcolor: "#171717", borderRadius: 1, p: 1 }}>
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

        <Typography>Page filter</Typography>
        <FormControl variant="outlined" sx={{ minWidth: 120, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Price</InputLabel>
          <Select value={pageFilter.price} onChange={handlePageFilter("price")} label="Цена" sx={{ color: "white" }}>
            <MenuItem value="">
              <em>No filter</em>
            </MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 120, border: "0.5px solid gray", borderRadius: 1, color: "white" }}>
          <InputLabel sx={{ color: "white" }}>Name</InputLabel>
          <Select value={pageFilter.name} onChange={handlePageFilter("name")} label="Название" sx={{ color: "white" }}>
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
        {totalFilteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} viewMode="grid" />
          </Grid>
        ))}
      </Grid>

      <PaginationRounded total={total} handlePagination={handlePagination} />
    </Container>
  );
};

export default Home;
