import React from "react";

import "./App.scss";
import RouterConfig from "./router";
import { HashRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <RouterConfig />
      </HashRouter>
    </div>
  );
};

export default App;
