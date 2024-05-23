import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import UserApi from "../../api/User";
import { AuthContext } from "../../Provider/AuthProvider";
export const NameBox = ({ onSetName, gameId, socketClient }) => {
  const { setuser } = useContext(AuthContext);
  const [Name, setName] = useState("");
  const handleAddUserToRoom = async () => {
    try {
      const response = await UserApi.createUser({ userName: Name });
      if (response) {
        setuser(response);
        const payload = {
          user: {
            id: response.id,
          },
          game: {
            id: gameId,
          },
        };
        socketClient.send(`/app/add-user`, {}, JSON.stringify(payload));
      }
      onSetName(Name);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        <input
          type="text"
          placeholder="Enter Your Name"
          className={styles.input}
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={() => handleAddUserToRoom()}>
        Enter
      </button>
    </div>
  );
};
