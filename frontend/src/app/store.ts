import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userInfoSlice from "./features/userInfoSlice";
import { productsApi } from "./api/dataFromDummy";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    [productsApi.reducerPath]: productsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch