import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.scss";
import Error from "./components/Error.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import Profile from "./pages/User/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
