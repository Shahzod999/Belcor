import { ORDERS_URL } from "../constants";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { OrderState } from "../types/basketSendOrder";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: ORDERS_URL }),
  tagTypes: ["OrderUpdate"],
  endpoints: (builder) => ({
    getUserOrders: builder.query<OrderState[], void>({
      query: () => ({
        url: ""
      }),
      providesTags: ["OrderUpdate"],
    }),
    getAllOrders: builder.query<OrderState[], void>({
      query: () => ({
        url: "/onlyAdmin",
      }),
      providesTags: ["OrderUpdate"],
    }),
    sendOrder: builder.mutation<OrderState, OrderState>({
      query: (data) => ({
        url: "/sendOrder",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["OrderUpdate"],
    }), 
    updateOrder: builder.mutation<OrderState, OrderState>({
      query: (data) => ({
        url: "/updateOrder",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["OrderUpdate"],
    })
  })
})


export const { useGetAllOrdersQuery, useSendOrderMutation, useGetUserOrdersQuery, useUpdateOrderMutation } = ordersApi