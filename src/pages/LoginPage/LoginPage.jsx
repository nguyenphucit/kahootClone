import React, { useEffect } from "react";
import styles from "./style.module.scss";
import LoginBG from "../../img/LOGINBG.jpg";
import { LoginForm } from "../../component/LoginForm/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (user !== undefined) navigate("/admin");
    // eslint-disable-next-line
  }, [user]);

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
      <LoginForm />
    </div>
  );
};
