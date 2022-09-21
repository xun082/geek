import React, { ReactElement } from "react";
import Icon from "@/components/icon";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface Props {
  children: string | ReactElement;
  extra?: string | ReactElement;
  className?: string;
  onLeftClick?: () => void;
  path?: unknown;
}

const NavBar: React.FC<Props> = (props) => {
  const { className, children, extra, path } = props;

  const navigate = useNavigate();

  return (
    <div className={classNames(styles.root, className)}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={() => navigate(path || -1)} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>
      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  );
};

export default NavBar;
