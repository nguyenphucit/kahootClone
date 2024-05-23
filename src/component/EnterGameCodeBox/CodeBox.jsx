import React, { useState } from "react";
import styles from "./style.module.scss";
import GameApi from "../../api/Game";
import { useNavigate } from "react-router-dom";
export const CodeBox = () => {
  const [gamePin, setgamePin] = useState("");
  const navigate = useNavigate();
  const handleJoinGame = async () => {
    try {
      const response = await GameApi.checkGamePin(gamePin);
      if (response) {
        if (response === 200) {
          navigate(`/lobby/${gamePin}`);
        }
      } else alert("game not exist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        <input
          type="text"
          placeholder="Game PIN"
          className={styles.input}
          value={gamePin}
          onChange={(e) => setgamePin(e.target.value)}
        />
      </div>
      <button className={styles.button} onClick={() => handleJoinGame()}>
        Enter
      </button>
    </div>
  );
};
