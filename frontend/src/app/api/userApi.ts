import { USER_URL } from './../constants';
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
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
  baseQuery: fetchBaseQuery({ baseUrl: USER_URL }),
  tagTypes: ["UserProfile"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserState, DataState>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["UserProfile"],
    }),
    loginUser: builder.mutation<UserState, DataState>({
      query: (data) => ({
        url: "/auth",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["UserProfile"],
    }),

    //пауза тут
    getProfileUser: builder.query<UserState, void>({
      query: () => ({
        url: "/profile"
      }),
      providesTags: ["UserProfile"],
    }),

    updateUserProfile: builder.mutation<UserState, DataState>({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["UserProfile"],
    }),
    logOutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST"
      }),
    })
  })
})

export const { useGetProfileUserQuery, useUpdateUserProfileMutation, useRegisterUserMutation, useLoginUserMutation, useLogOutUserMutation } = userApi