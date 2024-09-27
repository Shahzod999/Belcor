import { Container, Grid, SelectChangeEvent } from "@mui/material";
import {
  useGetAllCategoryListQuery,
  useGetAllProductsQuery,
} from "../../app/api/dataFromDummy";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import TopProducts from "../../components/TopProducts/TopProducts";
import ProductCard from "../../components/productBox/ProductCard";

import { useState } from "react";
import PaginationRounded from "../../components/Pagination/PaginationRounded";
import Filter from "../../components/filterProducts/Filter";
import { BASE_DUMMY_URL, BASE_URL, ORDERS_URL, USER_URL } from "../../app/constants";



console.log("USER_URL:", USER_URL);
console.log("BASE_URL:", BASE_URL);
console.log("BASE_DUMMY_URL:", BASE_DUMMY_URL);
console.log("ORDERS_URL:", ORDERS_URL);



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
    limit: 20,
    skip: pagePagination,
    filter: filters.category ? `${filters.category}` : "",
    sortBy: filters.price ? "price" : filters.name ? "title" : "",
    order: filters.price || filters.name || "",
  });

  const handleFilterChange =
    (type: string) => (event: SelectChangeEvent<string>) => {
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

  const handlePageFilter =
    (type: string) => (event: SelectChangeEvent<string>) => {
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

  return (
    <Container sx={{ position: "relative" }}>
      <TopProducts />

      <Filter
        categoryList={categoryList || []}
        filters={filters}
        pageFilter={pageFilter}
        onFilterChange={handleFilterChange}
        onPageFilterChange={handlePageFilter}
      />

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
