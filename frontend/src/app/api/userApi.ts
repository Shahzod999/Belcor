import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { USER__URL } from "../constants";

interface User {
  id: string,
  username: string,
  email: string
}
interface AuthState {
  _id: string,
  username: string,
  email: string,
  isAdmin: boolean,
}



interface DataState {
  username: string,
  email: string,
  password: string
}
interface LogoutResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: USER__URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthState, DataState>({
      query: (data) => ({
        url: "/belcor/user",
        method: "POST",
        body: data
      })
    }),
    loginUser: builder.mutation<AuthState, DataState>({
      query: (data) => ({
        url: "/belcor/user/auth",
        method: "POST",
        body: data
      })
    }),
    getProfileUser: builder.query<User, void>({
      query: () => ({
        url: "/belcor/user/profile"
      })
    }),
    logOutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/belcor/user/logout",
        method: "POST"
      })
    })
  })
})

export const { useGetProfileUserQuery, useRegisterUserMutation, useLoginUserMutation, useLogOutUserMutation } = userApi