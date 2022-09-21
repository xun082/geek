import React, { useState, useEffect } from "react";

import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";
import { List, DatePicker, Toast } from "antd-mobile";
import { useAppDispatch, RootState } from "@/store";
import { getUserProfileAction } from "@/store/modules/profile";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "@/store/modules/login";

import { useSelector } from "react-redux";

const Edit: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userProfile } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  // 退出登陆
  const logout = () => {
    dispatch(logoutAction());
    Toast.show("退出成功,3秒后返回首页");
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  return (
    <div className={styles.root}>
      <NavBar path="/home/profile">个人信息</NavBar>

      <div className="wrapper">
        <List className="profile-list">
          <List.Item
            onClick={() => {}}
            extra={
              <span className="avatar-wrapper">
                <img src={userProfile.photo} alt="" />
              </span>
            }
          >
            头像
          </List.Item>
          <List.Item onClick={() => {}} extra={userProfile.name}>
            昵称
          </List.Item>
          <List.Item onClick={() => {}} extra={userProfile.mobile}>
            电话
          </List.Item>
          <List.Item
            onClick={() => {}}
            extra={
              <span
                className={classNames("intro", userProfile.intro && "normal")}
              >
                {userProfile.intro || "未填写"}
              </span>
            }
          >
            简介
          </List.Item>
        </List>

        <List className="profile-list">
          <List.Item
            extra={userProfile.gender === 0 ? "男" : "女"}
            onClick={() => {}}
          >
            性别
          </List.Item>
          {/* 生日 */}
          <List.Item
            arrow={true}
            extra={
              <>
                <span
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <>{userProfile.birthday}</>
                </span>
                <DatePicker
                  title="选择生日"
                  visible={visible}
                  min={new Date("1900-01-01")}
                  max={new Date()}
                  value={new Date(userProfile.birthday)}
                  onClose={() => {
                    setVisible(false);
                  }}
                  onConfirm={(val) => {
                    console.log(val);
                  }}
                />
              </>
            }
          >
            生日
          </List.Item>
        </List>
      </div>
      {/* 底部栏：退出登录按钮 */}
      <div className="logout" onClick={logout}>
        <button className="btn">退出登录</button>
      </div>
    </div>
  );
};

export default Edit;
