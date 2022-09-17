import React from "react";

import Icon from "@/components/icon";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Icon
        type="iconfanhui"
        onClick={() => {
          console.log(1111);
        }}
      />
      <Link to="/login">登陆</Link>
    </div>
  );
};

export default Home;
