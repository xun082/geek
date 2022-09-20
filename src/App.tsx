import React, { Suspense } from "react";

import "@/assets/styles/index.scss";
import RouterConfig from "./router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Suspense fallback={<div>加载中</div>}>
          <RouterConfig />
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
