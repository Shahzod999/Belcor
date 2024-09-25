import { ORDERS_URL } from "../constants";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: ORDERS_URL }),
  endpoints: (builder) => ({
    getUserOrders: builder.query<any, void>({
      query: () => ({
        url: ""
      })
    }),
    getAllOrders: builder.query<any, void>({
      query: () => ({
        url: "/onlyAdmin",
      })
    }),
    sendOrder: builder.mutation<any, any>({
      query: (data) => ({
        url: "/sendOrder",
        method: "PUT",
        body: data
      })
    })
  })
})

export const { useGetAllOrdersQuery, useSendOrderMutation, useGetUserOrdersQuery } = ordersApi