import React, { useState, useEffect, useContext } from "react";
import styles from "./LobbyPage.module.scss";
import GameCodeBG from "../../img/GCBG.png";
import { User } from "../../component/User/User";
import { LockOpenOutlined, LockOutlined } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { NameBox } from "../../component/NameBox/NameBox";
import { useNavigate, useParams } from "react-router-dom";
import GameApi from "../../api/Game";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import { AuthContext } from "../../Provider/AuthProvider";
import { GameContext } from "../../Provider/GameProvider";
import { LobbyChatBox } from "../../component/LobbyChatBox/LobbyChatBox";
export const LobbyPage = () => {
  const [Name, setName] = useState();
  const [Lock, setLock] = useState(false);
  const [StompClient, setStompClient] = useState();
  const { gameId } = useParams();
  const { user } = useContext(AuthContext);
  const [isClose, setisClose] = useState(true);
  const {
    userList,
    setuserList,
    host,
    sethost,
    setisStart,
    isStart,
    HandleStartGame,
  } = useContext(GameContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserInRoom = async () => {
      try {
        const response = await GameApi.getUserInRoom(gameId);
        if (response) setuserList(() => response);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInRoom();
    return () => {};
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const socket = new SockJS("http:/localhost:8080/ws");
    const client = Stomp.over(socket);
    let isConnected = false;
    client.connect({}, () => {
      client.subscribe("/topic/lobby-user", async (message) => {
        const receivedMessage = await JSON.parse(message.body);
        setuserList((prev) => [...prev, receivedMessage.body.data]);
      });
      client.subscribe("/topic/game", async (message) => {
        const receivedMessage = await JSON.parse(message.body);
        if (receivedMessage.body.code === 200) {
          setisStart(true);
        }
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
    if (user !== undefined) setName(() => user.userName);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let isExisting = undefined;
    if (userInfo?.id !== undefined)
      isExisting = userList.find((user) => user.id === userInfo?.id);
    if (isExisting === undefined) {
      const getUser = () => {
        const payload = {
          user: user,
          game: {
            id: gameId,
          },
        };
        StompClient.send(`/app/add-user`, {}, JSON.stringify(payload));
      };
      if (user !== undefined && StompClient !== undefined) {
        if (user.isGuest === false && !host) {
          getUser();
        }
      }
    }
    // eslint-disable-next-line
  }, [user, StompClient, host]);

  useEffect(() => {
    const checkHost = async () => {
      try {
        const response = await GameApi.checkHost(gameId);
        if (response) {
          if (response.id === user.id) sethost(() => true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (Name) checkHost();
    // eslint-disable-next-line
  }, [Name]);
  useEffect(() => {
    if (isStart) {
      navigate(`/game/${gameId}`);
    }
    // eslint-disable-next-line
  }, [isStart]);

  return (
    <div
      style={{
        backgroundImage: `url(${GameCodeBG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={styles.container}
    >
      {Name ? (
        <div className={`${styles.chatBox}  ${isClose ? null : styles.open}`}>
          <div
            className={styles.chatController}
            onClick={() => setisClose((prev) => !prev)}
          >
            {isClose ? (
              <ExpandLessSharpIcon fontSize="large" />
            ) : (
              <ExpandMoreSharpIcon fontSize="large" />
            )}
          </div>
          <LobbyChatBox gameId={gameId} />
        </div>
      ) : null}
      {Name && host ? (
        <button
          className={styles.startGame}
          onClick={() => HandleStartGame(StompClient)}
        >
          Start
        </button>
      ) : null}
      {Name ? (
        <div className={styles.currentMember}>
          <PersonIcon className={styles.currentMemberIcon} />
          {userList.length}
        </div>
      ) : null}
      {Name && host ? (
        <div className={styles.lock} onClick={() => setLock((prev) => !prev)}>
          {Lock ? (
            <LockOutlined className={styles.lockIcon} />
          ) : (
            <LockOpenOutlined className={styles.lockIcon} />
          )}
        </div>
      ) : null}

      {Name ? (
        <div className={styles.lobbyMember}>
          {userList.map((user) => (
            <User name={user?.userName} key={user?.id} />
          ))}
        </div>
      ) : (
        <NameBox
          onSetName={setName}
          gameId={gameId}
          socketClient={StompClient}
        />
      )}
      {Lock || !Name ? null : (
        <div className={styles.waiting}>Waiting for players...</div>
      )}
    </div>
  );
};
