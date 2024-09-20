import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userInfoState {
  userInfo: any
}

const initialState: userInfoState = {
  userInfo: []
}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userInfoHolder: (state, action) => {
      state.userInfo = "Nice"
    }
  }
})

export const { userInfoHolder } = userInfoSlice.actions
export const selectedUserInfo = (state: RootState) => state.userInfo
export default userInfoSlice.reducer