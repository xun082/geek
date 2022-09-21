import React, { useState } from "react";

import { Toast } from "antd-mobile";
import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";
import Input from "@/components/input";
import { useFormik } from "formik";
import * as yup from "yup";
import classNames from "classnames";
import { sendCode } from "@/services/login";

import { LoginAction } from "@/store/modules/login";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [timer, setTimer] = useState<number>(0);

  const formIk = useFormik({
    initialValues: {
      mobile: "13911111111",
      code: "246810",
    },
    onSubmit: async (value) => {
      await dispatch(LoginAction(value));

      Toast.show("登录成功");
      navigate("/home");
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
  } = formIk;

  // 发送验证码
  const sendCodeHandle = async () => {
    if (timer > 0) return;
    // 先对手机号进行验证
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formIk.setTouched({
        mobile: true,
      });
      return;
    }

    try {
      await sendCode(mobile);
      Toast.show({
        icon: "success",
        content: "验证码发送成功",
      });
      setTimer(60);
      let timeId = setInterval(() => {
        setTimer((timer) => {
          // 清除定时器
          if (timer === 1) clearInterval(timeId);

          return timer - 1;
        });
      }, 1000);
    } catch (error: any) {
      if (error.response) {
        Toast.show({
          icon: "fail",
          content: error.response.data.message,
        });
      } else {
        Toast.show({
          icon: "fail",
          content: "服务器繁忙,请稍后重试",
        });
      }
    }
  };

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
              onClick={sendCodeHandle}
              extra={timer === 0 ? "发送验证码" : timer + "s后获取"}
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
