import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userInfoSlice from "./features/userInfoSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch