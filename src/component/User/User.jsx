import React from "react";
import styles from "./style.module.scss";
import FaceIcon from "@mui/icons-material/Face";
export const User = ({ name }) => {
  return (
    <div className={styles.container}>
      <FaceIcon className={styles.icon} />
      <div className={styles.username}>{name}</div>
    </div>
  );
};
