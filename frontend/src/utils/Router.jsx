import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Home from "../pages/Home";
import { Blog } from "../pages/Blog";
import WriteBlog from "../pages/Post";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyPost from "../pages/UserPost";
import Cookies from "js-cookie";

export const getAccessToken = (token) => {
  if (token != undefined) {
    Cookies.set("accessToken", token);
    location.reload();
    window.location.href = "/";
  }
  return Cookies.get("accessToken");
};

const isAuthenticated = () => {
  // const token = Cookies.get();
  // console.log(token);
  return !!getAccessToken();
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    index: true,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <PrivateRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: "/",
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
        path: "mypost",
        element: <MyPost />,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
