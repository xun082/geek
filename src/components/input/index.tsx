import React from "react";

import styles from "./index.module.scss";
import classNames from "classnames";

interface IProps {
  type: "text" | "password";
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  code?: boolean;
  className?: string;
  autoFocus?: boolean;
}

const Input: React.FC<
  IProps &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = (props) => {
  const { type, onClick, code, className, onChange, autoFocus, ...rest } =
    props;

  return (
    <div className={styles.root}>
      <input
        type={type}
        autoFocus={autoFocus}
        className={classNames("input", className)}
        onChange={onChange}
        {...rest}
      />
      {code && (
        <div className="extra" onClick={onClick}>
          发送验证码
        </div>
      )}
    </div>
  );
};

export default Input;
