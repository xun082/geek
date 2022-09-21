import React, { useEffect } from "react";

import styles from "./index.module.scss";
import Icon from "@/components/icon";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, RootState } from "@/store";
import { getUserInfoAction } from "@/store/modules/profile";
import { useSelector } from "react-redux";

const My: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const { token } = useSelector((state: RootState) => state.login);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token.length !== 0) dispatch(getUserInfoAction());
  }, [dispatch, token]);

  const goDetail = () => {
    if (token) navigate("/profile/edit");
    else navigate("/login");
  };

  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={userInfo.photo} alt="" />
          </div>
          <div className="user-name">{userInfo.name}</div>
          <div onClick={goDetail}>
            个人信息 <Icon type="iconbtn_right" />
          </div>
        </div>

        {/* 今日阅读区域 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读 <span>10</span> 分钟
        </div>

        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{userInfo.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{userInfo.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{userInfo.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{userInfo.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div
            className="service-item"
            onClick={() => navigate("/profile/feedback")}
          >
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div
            className="service-item"
            onClick={() => navigate("/profile/chat")}
          >
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default My;
