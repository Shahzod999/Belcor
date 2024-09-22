import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userInfoSlice from "./features/userInfoSlice";
import { productsApi } from "./api/dataFromDummy";
import { userApi } from "./api/userApi";
import favoriteSlice from "./features/favoriteSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    favorite: favoriteSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware).concat(userApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch