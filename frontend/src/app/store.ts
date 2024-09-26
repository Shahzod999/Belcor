import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userInfoSlice from "./features/userInfoSlice";
import { productsApi } from "./api/dataFromDummy";
import { userApi } from "./api/userApi";
import favoriteSlice from "./features/favoriteSlice";
import bascketSlice from "./features/bascketSlice";
import { ordersApi } from "./api/ordersApi";
import snackBarSlice from "./features/snackBarSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    favorite: favoriteSlice,
    basket: bascketSlice,
    mySnackBar: snackBarSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(userApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
