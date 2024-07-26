import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import { Home } from "../pages/Home";
import { Blog } from "../pages/Blog";
import WriteBlog from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cookies from "js-cookie";

const getAccessToken = () => {
  return Cookies.get("accessToken");
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    index: true,
  },
  {
    element: <PrivateRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "post",
        element: <WriteBlog />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
