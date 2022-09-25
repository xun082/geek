import React, { useEffect } from "react";

import styles from "./index.module.scss";
import Tabs from "@/components/Tabs";
import { useAppDispatch } from "@/store";
import { channelsAction } from "@/store/modules/home";
import { useAppSelector } from "@/store";
import Icon from "@/components/icon";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { channels } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(channelsAction());
  }, [dispatch]);
  return (
    <div className={styles.root}>
      {channels && <Tabs tabs={channels}></Tabs>}

      {/* 频道 Tab 栏右侧的两个图标按钮：搜索、频道管理 */}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => navigate("/search")} />
        <Icon type="iconbtn_channel" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Home;
