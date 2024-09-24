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
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["UserProfile"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserState, DataState>({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data
      })
    }),
    loginUser: builder.mutation<UserState, DataState>({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data
      })
    }),

    //пауза тут
    getProfileUser: builder.query<UserState, void>({
      query: () => ({
        url: `${USER_URL}/profile`
      }),
      providesTags: ["UserProfile"],
    }),

    updateUserProfile: builder.mutation<UserState, void>({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["UserProfile"],
    }),
    logOutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST"
      })
    })
  })
})

export const { useGetProfileUserQuery, useUpdateUserProfileMutation, useRegisterUserMutation, useLoginUserMutation, useLogOutUserMutation } = userApi