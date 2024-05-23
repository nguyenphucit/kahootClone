import React from "react";
import styles from "./style.module.scss";
import Avatar from "@mui/material/Avatar";
export const Message = ({ sender, content, senderId, isOther }) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    const nameParts = name.split(" ");
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        nameParts.length >= 2
          ? `${nameParts[0][0]}${nameParts[1][0]}`
          : name[0],
    };
  }
  return (
    <div className={`${styles.container}   ${isOther ? styles.other : null}`}>
      <div className={styles.msg}>
        <div className={styles.sender}>
          <Avatar
            style={{ marginRight: "3px" }}
            sx={{ width: 40, height: 40 }}
            {...stringAvatar(sender)}
          >
            {sender[0]}
          </Avatar>
          {sender}
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};
