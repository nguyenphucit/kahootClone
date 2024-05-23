import React, { useContext } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../../Provider/AuthProvider";
export const AdminNavBar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <div className={styles.top_left}>
        <div className={styles.logo}>KaPhoot!!!</div>
        <div
          className={styles.top_left_item}
          onClick={() => navigate("/admin")}
        >
          Home
        </div>
        <div
          className={styles.top_left_item}
          onClick={() => navigate("/admin/createQuiz")}
        >
          Create Quiz
        </div>
        <div
          className={styles.top_left_item}
          onClick={() => navigate("/admin/createGame")}
        >
          Create Game
        </div>
      </div>
      <div className={styles.top_right}>
        {/* <button
          className={styles.createGameBtn}
          onClick={() => navigate("/admin/createGame")}
        >
          Game
        </button>
        <button
          className={styles.createGameBtn}
          onClick={() => navigate("/admin/createQuiz")}
        >
          Quiz
        </button> */}
        <button className={styles.createGameBtn} onClick={() => navigate("/")}>
          JoinGame
        </button>
        <div className={styles.logoutBtn} onClick={() => handleLogout()}>
          LOGOUT <ExitToAppIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};
