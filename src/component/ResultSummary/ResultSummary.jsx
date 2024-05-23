import React from "react";
import styles from "./style.module.scss";
export const ResultSummary = ({ data }) => {
  return (
    <div className={styles.container}>
      <table id="myTable" className={styles.myTable}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.statusHeader}>Status</th>
            <th className={styles.rightAnswerHeader}>Right answer</th>
            <th className={styles.yourAnswerHeader}>Your answer</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data?.map((item) => {
            return (
              <tr className={styles.tr}>
                <td style={{ flex: 1 }}>
                  <span
                    className={`${styles.dot}  ${
                      item.userAnswer === item.rightAnswer
                        ? styles.greenDot
                        : styles.redDot
                    }`}
                  ></span>
                </td>
                <td className={styles.rightAnswer}>{item.rightAnswer}</td>
                <td className={styles.yourAnswer}>{item.userAnswer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
