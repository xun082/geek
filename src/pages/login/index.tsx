import React from "react";

import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";
import Input from "@/components/input";
import { useFormik } from "formik";
import * as yup from "yup";
import classNames from "classnames";

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      // mobile: "1391111111",
      // code: "123456",
      mobile: "",
      code: "",
    },
    onSubmit: (value) => {
      console.log(value);
    },
    // 校验规则
    validationSchema: yup.object({
      mobile: yup
        .string()
        .required("手机号不能为空")
        .matches(/^1[3-9]\d{9}$/, "手机号格式错误"),
      code: yup
        .string()
        .required("验证码不能为空")
        .matches(/^\d{6}$/, "验证码格式错误"),
    }),
  });

  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    isValid,
  } = formik;

  return (
    <div className={styles.root}>
      <NavBar>登陆</NavBar>
      <div className="content">
        <h3>短信登陆</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              type="text"
              autoFocus={true}
              name="mobile"
              onChange={handleChange}
              value={mobile}
              autoComplete="off"
              onBlur={handleBlur}
              placeholder="请输入手机号码"
            />
            {touched.mobile && errors.mobile && (
              <div className="validate">{errors.mobile}</div>
            )}
          </div>
          <div className="input-item">
            <Input
              type="text"
              code={true}
              value={code}
              name="code"
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
              placeholder="请输入验证码"
            />
            {touched.code && errors.code && (
              <div className="validate">{errors.code}</div>
            )}
          </div>

          <button
            type="submit"
            className={classNames("login-btn", { disabled: !isValid })}
            disabled={!isValid}
          >
            登陆
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
