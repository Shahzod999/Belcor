import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_DUMMY_URL } from "../constants";
import { Product, ProductsResponse } from "../types/ProductTypes";

interface QueryParams {
  limit: string;
  skip: string;
  sortBy?: string;
  order?: string;
  q?: string;
}

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_DUMMY_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, { limit?: number, skip?: number, filter?: string, sortBy?: string, order?: string, search?: string }>({
      query: ({ limit = 30, skip = 0, filter = "", sortBy = "", order = "", search = "" }) => {
        const queryParams: QueryParams = {
          limit: limit.toString(),
          skip: skip.toString(),
        };

        if (sortBy) queryParams.sortBy = sortBy;
        if (order) queryParams.order = order;

        if (search) {
          queryParams.q = search;
          return {
            url: `/products/search`,
            params: queryParams,
          };
        }
        if (filter) {
          search = "";
        }
        const filterPath = filter ? `/category/${filter}` : "";
        return {
          url: `/products${filterPath}`,
          params: queryParams,
        };
      },
    }),
    getHightRaiting: builder.query<ProductsResponse, void>({
      query: () => '/products?limit=11&sortBy=rating&order=desc'
    }),
    getSingleProduct: builder.query<Product, { id: string | undefined }>({
      query: ({ id }) => `/products/${id}`
    }),
    getAllCategoryList: builder.query<string[], void>({
      query: () => "/products/category-list"
    })
  }),
})

export const { useGetAllProductsQuery, useGetHightRaitingQuery, useGetSingleProductQuery, useGetAllCategoryListQuery } = productsApi