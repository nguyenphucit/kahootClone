import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Message } from "../Message/Message";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
export const LobbyChatBox = ({ gameId }) => {
  const { user } = useContext(AuthContext);
  const [StompClient, setStompClient] = useState();
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [data, setdata] = useState([]);
  const bottomRef = useRef();
  const chatContentRef = useRef();
  useEffect(() => {
    const socket = new SockJS("http:/localhost:8080/ws");
    const client = Stomp.over(socket);
    let isConnected = false;
    client.connect({}, () => {
      client.subscribe(`/topic/lobby-chat/${gameId}`, async (message) => {
        const receivedMessage = await JSON.parse(message.body);
        setmessages((prev) => [...prev, receivedMessage]);
      });
      isConnected = true;
      setStompClient(client);
    });
    return () => {
      if (isConnected) client.disconnect();
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const MessageList = [...messages];
    const newMessageList = MessageList.map((item, index) => {
      if (index === MessageList.length - 1)
        item.isOther = user.id !== messages[messages.length - 1].senderId;
      return item;
    });
    setdata(() => [...newMessageList]);
    // eslint-disable-next-line
  }, [messages.length]);

  useEffect(() => {
    if (chatContentRef.current) {
      const { scrollHeight, clientHeight } = chatContentRef.current;
      chatContentRef.current.scrollTop = scrollHeight - clientHeight;
      setTimeout(() => {
        chatContentRef.current.scrollTop += 200;
      }, 0);
    }
  }, [messages.length]);

  const handleSendMessage = () => {
    try {
      if (message.trim()) {
        const payload = {
          senderId: user.id,
          sender: user.userName,
          content: message,
        };
        StompClient.send(
          `/app/Sendchat/${gameId}`,
          {},
          JSON.stringify(payload)
        );
        setmessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>LOBBY CHATBOX</div>
      <div className={styles.content} ref={chatContentRef}>
        {data.map((item) => (
          <Message
            key={Math.random()}
            isOther={item.isOther}
            sender={item.sender}
            content={item.content}
            senderId={item.senderId}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <button onClick={() => handleSendMessage()}>Send</button>
      </div>
    </div>
  );
};
