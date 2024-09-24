import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { USER__URL } from "../constants";
import { UserState } from "../types/UserTypes";

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
    registerUser: builder.mutation<UserState, DataState>({
      query: (data) => ({
        url: "/belcor/user",
        method: "POST",
        body: data
      })
    }),
    loginUser: builder.mutation<UserState, DataState>({
      query: (data) => ({
        url: "/belcor/user/auth",
        method: "POST",
        body: data
      })
    }),

    //пауза тут
    getProfileUser: builder.query<UserState, void>({
      query: () => ({
        url: "/belcor/user/profile"
      })
    }),

    updateUserProfile: builder.mutation<UserState, void>({
      query: (data) => ({
        url: "/belcor/user/profile",
        method: "PUT",
        body: data
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

export const { useGetProfileUserQuery, useUpdateUserProfileMutation, useRegisterUserMutation, useLoginUserMutation, useLogOutUserMutation } = userApi