import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
export const LoginForm = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [allowed, setallowed] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  useEffect(() => {
    if (username !== "" && password !== "") setallowed(() => true);
    else {
      setallowed(() => false);
    }
  }, [username, password]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Log in</h2>
        <form action="">
          <div className={styles.loginInput}>
            <div className={styles.inputlabel}>Email</div>
            <input
              type="email"
              className={styles.inputbar}
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className={styles.loginInput}>
            <div className={styles.inputlabel}>Password</div>
            <input
              type="password"
              className={styles.inputbar}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div
            className={`${styles.loginBtn}   ${allowed ? styles.allow : null}`}
          >
            <button
              disabled={!allowed}
              onClick={(e) => handleLogin(e, username, password)}
            >
              Log in
            </button>
          </div>
        </form>

        <div className={styles.registerSwitch}>
          dont have account yet ?<a href="/register">Register Here</a>
        </div>
      </div>
    </div>
  );
};
