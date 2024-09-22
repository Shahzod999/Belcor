import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.scss";
import Error from "./components/Error.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Profile from "./pages/User/Profile.tsx";
import Home from "./pages/home/Home.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Favorite from "./pages/User/Favorite/Favorite.tsx";
import Basket from "./pages/User/Basket/Basket.tsx";
import SingleProduct from "./components/productBox/SingleProduct.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <SingleProduct />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/logOut",
        element: <Auth />,
      },
      {
        path: "/profile",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "favorite",
            element: <Favorite />,
          },
          {
            path: "basket",
            element: <Basket />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
