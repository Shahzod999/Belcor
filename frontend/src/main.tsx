import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import Error from "./components/Error.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin.tsx";
import Auth from "./pages/Auth.tsx";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
