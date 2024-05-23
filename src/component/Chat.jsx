import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
export const Chat = () => {
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [Sender, setSender] = useState("");
  const [StompClient, setStompClient] = useState();
  useEffect(() => {
    const name = prompt("what is your name");
    const socket = new SockJS("http:/localhost:8080/ws");
    const client = Stomp.over(socket);
    let isConnected = false;
    client.connect({}, () => {
      client.subscribe("/topic/users", async (message) => {
        const receivedMessage = await JSON.parse(message.body);
        setmessages((prev) => [...prev, receivedMessage]);
      });
      isConnected = true;
      setStompClient(client);
      setSender(name); // Đưa việc lưu client vào state vào đây sau khi kết nối thành công.
    });

    return () => {
      if (isConnected) client.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const payload = {
        user: {
          userName: Sender,
        },
        game: {
          id: Number(message),
        },
      };
      StompClient.send("/app/user", {}, JSON.stringify(payload));
      setmessage("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setmessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send</button>
      <ul className="messageBox">
        {messages.map((item, index) => (
          <li key={index}>
            {item.userName}: {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};
