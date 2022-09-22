import React, { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";
import NavBar from "@/components/NavBar";
import Icon from "@/components/icon";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { getUserProfileAction } from "@/store/modules/profile";
import io from "socket.io-client";
import { getTokenInfo } from "@/utils/storage";
import { Toast } from "antd-mobile";

interface MessageType {
  msg: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { photo } = useSelector((state: RootState) => state.user.userProfile);
  const dispatch = useAppDispatch();

  const clientRef = useRef<HTMLElement | any>("");
  const listRef = useRef<HTMLElement | any>("");

  const [messageList, setMessageList] = useState([
    // 放两条初始消息
    { type: "robot", text: "亲爱的用户您好，小智同学为您服务。" },
    { type: "user", text: "你好" },
  ]);

  // 要发送的信息
  const [message, setMessage] = useState("");

  useEffect(() => {
    //  获取用户信息
    dispatch(getUserProfileAction());

    clientRef.current = io("http://geek.itheima.net", {
      query: {
        token: getTokenInfo().token,
      },
      transports: ["websocket"],
    });

    //   连接服务器成功的事件
    clientRef.current.on("connect", () => {
      Toast.show("服务器连接成功");
      setMessageList((messageList) => {
        return [
          ...messageList,
          { type: "robot", text: "我是小智，有什么想要问我的？" },
        ];
      });
    });

    clientRef.current.on("message", (e: MessageType) => {
      console.log(e);

      setMessageList((messageList) => {
        return [
          ...messageList,
          {
            type: "robot",
            text: e.msg,
          },
        ];
      });
    });

    return () => {
      // 组件销毁,关闭连接
      clientRef.current.close();
    };
  }, [dispatch]);

  useEffect(() => {
    // messageList 发送变化时滚动
    listRef.current.scrollTop =
      listRef.current.scrollHeight - listRef.current.offsetHeight;
  }, [messageList]);

  const onKeyUp = (e: { keyCode: number }) => {
    if (e.keyCode !== 13) return;
    if (!message) return;
    // 回车的时候，
    // 1. 需要给服务器发送消息
    // 2. 把自己的消息添加到消息列表中
    setMessageList([
      ...messageList,
      {
        type: "user",
        text: message,
      },
    ]);

    clientRef.current.emit("message", {
      message,
      timestamp: Date.now(),
    });

    setMessage("");
  };

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header">小智同学</NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={listRef}>
        {messageList.map((item, index) =>
          item.type === "robot" ? (
            <div key={index} className="chat-item">
              <Icon type="iconbtn_xiaozhitongxue" />
              <div className="message">{item.text}</div>
            </div>
          ) : (
            <div key={index} className="chat-item user">
              <img src={photo} alt="" />
              <div className="message">{item.text}</div>
            </div>
          )
        )}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
