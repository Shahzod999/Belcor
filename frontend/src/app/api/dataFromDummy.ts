import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE__URL } from "../constants";
import { Product, ProductsResponse } from "../types/ProductTypes";


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
    getSingleProduct: builder.query<Product, { id: string | undefined }>({
      query: ({ id }) => `/products/${id}`
    })
  }),
})

export const { useGetAllProductsQuery, useGetHightRaitingQuery, useGetSingleProductQuery } = productsApi