import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const Login = lazy(() => import("@/pages/login"));
const Home = lazy(() => import("@/pages/home"));

const RouterConfig: React.FC = () => {
  return (
    <Suspense fallback={<div>加载中</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
