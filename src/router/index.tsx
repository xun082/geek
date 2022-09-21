import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

const Login = lazy(() => import("@/pages/login"));
const Layout = lazy(() => import("@/pages/layout"));

const My = lazy(() => import("@/pages/my"));
const Home = lazy(() => import("@/pages/home"));
const Issue = lazy(() => import("@/pages/issue"));
const Video = lazy(() => import("@/pages/video"));
const Edit = lazy(() => import("@/pages/my/child/edit"));

const RouterConfig: React.FC = () => {
  return useRoutes([
    { path: "/", element: <Navigate to="/home" /> },
    { path: "/login", element: <Login /> },
    { path: "/profile/edit", element: <Edit /> },
    {
      path: "/home",
      element: <Layout />,
      children: [{ path: "/home", element: <Home /> }],
    },
    {
      path: "/home",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "issue", element: <Issue /> },
        { path: "profile", element: <My /> },
        { path: "video", element: <Video /> },
      ],
    },
  ]);
};

export default RouterConfig;

//  <Route>
//    <Route path="/" element={<Home />}></Route>
//    <Route path="/profile" element={<My />}></Route>
//  </Route>;
