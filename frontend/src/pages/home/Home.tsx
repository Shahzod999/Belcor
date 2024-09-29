import { Box, Container, Grid, SelectChangeEvent } from "@mui/material";
import { useGetAllCategoryListQuery, useGetAllProductsQuery } from "../../app/api/dataFromDummy";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import TopProducts from "../../components/TopProducts/TopProducts";
import ProductCard from "../../components/productBox/ProductCard";

import { useState } from "react";
import PaginationRounded from "../../components/Pagination/PaginationRounded";
import Filter from "../../components/filterProducts/Filter";
import { useAppSelector } from "../../app/hooks";
import { selectedSearchParam } from "../../app/features/searchSlice";

const Home = () => {
  const searchParam = useAppSelector(selectedSearchParam);
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

  const { data, error, isLoading, isFetching } = useGetAllProductsQuery({
    limit: 20,
    skip: pagePagination,
    filter: filters.category ? `${filters.category}` : "",
    sortBy: filters.price ? "price" : filters.name ? "title" : "",
    order: filters.price || filters.name || "",
    search: searchParam,
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
    setPagePagination(page * 20);
    console.log(`Текущая страница: ${page}`);
  };

  if (error) {
    return <Error />;
  }
  if (isLoading) {
    return <Loader />;
  }

  const { products = [], total } = data || {};
  let setTotal;

  if (total) {
    setTotal = Math.round(total / 20);
  }

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
      return 0;
    }
  });

  console.log(isFetching);
  return (
    <Container sx={{ position: "relative" }}>
      <TopProducts />

      <Filter categoryList={categoryList || []} filters={filters} pageFilter={pageFilter} onFilterChange={handleFilterChange} onPageFilterChange={handlePageFilter} />

      <Grid container spacing={2} mt={1}>
        {isFetching && (
          <Box sx={{ zIndex: 999, top: 0, left: 0, bottom: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center" }} position={"fixed"}>
            <Loader />
          </Box>
        )}
        {totalFilteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} viewMode="grid" />
          </Grid>
        ))}
      </Grid>

      <PaginationRounded total={setTotal} handlePagination={handlePagination} />
    </Container>
  );
};

export default Home;
