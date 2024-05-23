import React, { useContext } from "react";
import styles from "./style.module.scss";
import LoginBG from "../../img/LOGINBG.jpg";
import { RegisterForm } from "../../component/RegisterForm/RegisterForm";
import { AuthContext } from "../../Provider/AuthProvider";
export const RegisterPage = () => {
  const { Loading } = useContext(AuthContext);
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
      {Loading ? (
        <div className={styles.loading}>
          <div className={styles.loadingIcon}></div>
        </div>
      ) : null}
      <RegisterForm />
    </div>
  );
};
