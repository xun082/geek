import React from "react";

import Icon from "@/components/icon";

import styles from "./index.module.scss";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { tabBar } from "@/components/common/local";

import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <div className="tab-content">
        {/* 配置二级路由 */}
        <Outlet />
      </div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tab-bar">
        {tabBar.map((item) => (
          <Link
            className={classNames(
              "tab-bar-item",
              location.pathname === item.path ? "tab-bar-item-active" : ""
            )}
            key={item.title}
            to={item.path}
          >
            <Icon
              type={
                location.pathname === item.path ? item.icon + "_sel" : item.icon
              }
            />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Layout;
