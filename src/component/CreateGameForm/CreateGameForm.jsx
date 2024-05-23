import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import QuizApi from "../../api/Quiz";
import { GameContext } from "../../Provider/GameProvider";
export const CreateGameForm = () => {
  const { user } = useContext(AuthContext);
  const { handleCreateGame } = useContext(GameContext);
  const [QuizList, setQuizList] = useState([]);
  const [selectedQuiz, setselectedQuiz] = useState();
  useEffect(() => {
    const getQuizByUserId = async () => {
      try {
        const response = await QuizApi.getQuizByUserId(user.id);
        if (response) {
          setQuizList(response);
          setselectedQuiz(response[0]?.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getQuizByUserId();
  }, [user]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Create Game</h1>
        <div className={styles.content}>
          <form action="">
            <div className={styles.gameTitleBox}>
              <div className={styles.gameTitleLabel}>Game title</div>
              <div className={styles.gameTitleInput}>
                <input type="text" />
              </div>
            </div>
            <div className={styles.gameQuizSelectBox}>
              <div className={styles.gameQuizSelectLabel}>Select Quiz</div>
              <div className={styles.gameSelectInput}>
                <select onChange={(e) => setselectedQuiz(e.target.value)}>
                  {QuizList?.map((item, index) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.createGameBtnBox}>
              <button
                className={styles.createGameBtn}
                onClick={(e) => handleCreateGame(e, selectedQuiz)}
              >
                Create Game
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
