import React from "react";
import styles from "./style.module.scss";
import { AdminNavBar } from "../../component/AdminNavBar/AdminNavBar";
import LoginBG from "../../img/LOGINBG.jpg";
import { CreateGameForm } from "../../component/CreateGameForm/CreateGameForm";
export const CreateGamePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${LoginBG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={styles.container}
    >
      <AdminNavBar />
      <div className={styles.content}>
        <CreateGameForm />
      </div>
    </div>
  );
};
