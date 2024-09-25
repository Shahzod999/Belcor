import { ORDERS_URL } from "../constants";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { Order, SendOrderState } from "../types/basketSendOrder";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: ORDERS_URL }),
  endpoints: (builder) => ({
    getUserOrders: builder.query<Order[], void>({
      query: () => ({
        url: ""
      })
    }),
    getAllOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/onlyAdmin",
      })
    }),
    sendOrder: builder.mutation<SendOrderState, SendOrderState>({
      query: (data) => ({
        url: "/sendOrder",
        method: "PUT",
        body: data
      })
    })
  })
})

export const { useGetAllOrdersQuery, useSendOrderMutation, useGetUserOrdersQuery } = ordersApi