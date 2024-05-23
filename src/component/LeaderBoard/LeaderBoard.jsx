import React from "react";
import styles from "./style.module.scss";
import goldMedal from "../../img/gold-medal.png";
export const LeaderBoard = ({ data, total }) => {
  return (
    <div className={styles.container}>
      <div id={styles.leaderboard}>
        <div class={styles.ribbon}></div>
        <table>
          {data.map((item, index) => (
            <tr key={item[0].id}>
              <td className={styles.number}>{index + 1}</td>
              <td className={styles.name}>{item[0].userName}</td>
              <td className={styles.points}>
                {item[1]} / {total}
                {index === 0 ? (
                  <img
                    className="gold-medal"
                    src={goldMedal}
                    alt="gold medal"
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
