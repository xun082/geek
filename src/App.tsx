import React from "react";

import "./App.scss";
import RouterConfig from "./router";
import { HashRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <Link to="/login">登陆</Link>
        <Link to="/home">首页</Link>
        <RouterConfig />
      </HashRouter>
    </div>
  );
};

export default App;
