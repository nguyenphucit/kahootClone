import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { AdminNavBar } from "../../component/AdminNavBar/AdminNavBar";
import QuizApi from "../../api/Quiz";
import QuizBG from "../../img/kahootAdminBG.jpg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
export const AdminPage = () => {
  const [QuizList, setQuizList] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getQuizByUserId = async () => {
      try {
        const response = await QuizApi.getQuizByUserId(user.id);
        if (response) setQuizList(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (user !== undefined) getQuizByUserId();
  }, [user]);
  const handleReviewQuiz = (item) => {
    navigate("createQuiz", {
      state: {
        quizList: item,
      },
    });
  };
  const handleDeleteQuiz = async (item) => {
    try {
      const response = await QuizApi.deleteQuiz(item.id);
      if (response) {
        const newQuizList = QuizList.filter((quiz) => quiz.id !== item.id);
        setQuizList(() => newQuizList);
        alert("successfully delete quiz");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AdminNavBar />
        <div className={styles.content}>
          <h2 className={styles.title}>This is your quiz gallery</h2>
          <div className={styles.quizList}>
            {QuizList.map((item, index) => (
              <div className={styles.quiz} key={item.id}>
                <img src={QuizBG} alt="" />
                <div className={styles.quizInfo}>
                  <h2 className={styles.quizTitle}>{item.title}</h2>
                  <button
                    className={styles.quizBtn}
                    onClick={() => handleReviewQuiz(item)}
                  >
                    Preview
                  </button>
                  <button
                    style={{
                      backgroundColor: "rgb(226, 27, 60)",
                      marginTop: "10px",
                    }}
                    className={styles.quizBtn}
                    onClick={() => handleDeleteQuiz(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
