import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_DUMMY_URL } from "../constants";
import { Product, ProductsResponse } from "../types/ProductTypes";


export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_DUMMY_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, { limit?: number, skip?: number, filter?: string, sortBy?: string, order?: string, search?: string }>({
      query: ({ limit = 30, skip = 0, filter = "", sortBy = "", order = "", search = "" }) => {
        const queryParams = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        })

        if (filter) {
          search = "";
        }
        if (search) {
          queryParams.append("q", search);
          console.log(`/products/search?${queryParams.toString()}`, 'url');
          return `/products/search?${queryParams.toString()}`
        }
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (order) queryParams.append("order", order);
        const filterPath = filter ? `/category/${filter}` : ""
        return `/products${filterPath}?${queryParams.toString()}`
      }
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