import React from "react";
import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";

const Login: React.FC = (props) => {
  return (
    <div className={styles.root}>
      <NavBar>登陆</NavBar>
    </div>
  );
};

export default Login;
