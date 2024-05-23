import React from "react";
import { CodeBox } from "../../component/EnterGameCodeBox/CodeBox";
import GameCodeBG from "../../img/GCBG.png";
import styles from "./WelcomePage.module.scss";
export const WelcomePage = () => {
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
      <CodeBox />
      <div className={styles.footer}>
        <div className={styles.createAccount}>
          Create your own account for FREE <a href="/login">Kaphoot!!</a>
          <div>Terms | privacy</div>
        </div>
      </div>
    </div>
  );
};
