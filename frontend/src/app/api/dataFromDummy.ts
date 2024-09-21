import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE__URL } from "../constants";
import { Product } from "../types/types";

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: BASE__URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, { limit: number, skip?: number }>({
      query: ({ limit, skip = 0 }) => `/products?limit=${limit}&skip=${skip}`
    }),
    getHightRaiting: builder.query<ProductsResponse, void>({
      query: () => '/products?limit=11&sortBy=rating&order=desc'
    }),
  }),
})

export const { useGetAllProductsQuery, useGetHightRaitingQuery } = productsApi