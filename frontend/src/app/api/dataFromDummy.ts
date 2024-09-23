import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE__URL } from "../constants";
import { Product, ProductsResponse } from "../types/ProductTypes";


export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: BASE__URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, { limit: number, skip?: number, filter?: string }>({
      query: ({ limit, skip = 0, filter }) => `/products${filter}?limit=${limit}&skip=${skip}`
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