import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
export const RegisterForm = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [allowed, setallowed] = useState(false);
  const { handleRegister } = useContext(AuthContext);
  useEffect(() => {
    if (username !== "" && password !== "" && email !== "")
      setallowed(() => true);
    else {
      setallowed(() => false);
    }
  }, [username, password, email]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Register</h2>
        <form action="">
          <div className={styles.RegisterInput}>
            <div className={styles.inputlabel}>Email</div>
            <input
              type="email"
              className={styles.inputbar}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className={styles.RegisterInput}>
            <div className={styles.inputlabel}>Username</div>
            <input
              type="text"
              className={styles.inputbar}
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className={styles.RegisterInput}>
            <div className={styles.inputlabel}>Password</div>
            <input
              type="password"
              className={styles.inputbar}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div
            className={`${styles.RegisterBtn}   ${
              allowed ? styles.allow : null
            }`}
          >
            <button
              disabled={!allowed}
              onClick={(e) => handleRegister(e, username, email, password)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
