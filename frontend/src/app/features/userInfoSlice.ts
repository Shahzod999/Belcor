import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserState } from "../types/UserTypes";

interface userInfoState {
  userInfo: UserState | null
}

const initialState: userInfoState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string) : null
}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userInfoHolder: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo")
    }
  }
})

export const { userInfoHolder, logout } = userInfoSlice.actions
export const selectedUserInfo = (state: RootState) => state.userInfo.userInfo
export default userInfoSlice.reducer