import React from "react";
import styles from "./style.module.scss";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
export const CreateGameLeftMenu = ({
  getQuestion,
  data,
  addQuestion,
  saveAll,
  quizTitle,
  setTitle,
}) => {
  const handleGetQuestionFromLeftMenu = (item) => {
    const question = {
      id: item.id,
      category: item.category,
      difficulty: item.difficulty,
      option1: item.option1,
      option2: item.option2,
      option3: item.option3,
      option4: item.option4,
      title: item.title,
      answer: item.answer,
    };
    getQuestion(() => question);
    item.isActive = !item.isActive;
    if (item.isActive) {
      data.forEach((otherItem) => {
        if (otherItem.title !== item.title) otherItem.isActive = false;
      });
    }
  };
  const handleAddQuestion = () => {
    const currentDataLenght = data.length + 1;
    const question = {
      id: currentDataLenght,
      category: "custom",
      difficulty: "easy",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      title: "",
      answer: "",
      isActive: true,
    };
    addQuestion((prev) => [...prev, question]);
    data.forEach((otherItem) => {
      otherItem.isActive = false;
    });
    getQuestion(() => question);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.quizTitle}>
          <h2>QUIZ TITLE</h2>
          <input
            type="text"
            value={quizTitle}
            style={{
              boxSizing: "border-box",
              width: "90%",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "14px",
              color: "rgb(51,51,51)",
              fontWeight: "700",
              border: "solid rgb(207,207,207) 1px",
              textAlign: "center",
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.currentQuestions}>
          {data?.map((item, index) => (
            <div className={styles.leftGameBox} key={index}>
              <div className={styles.GameBox_index}>{index + 1} Quiz</div>
              <div
                className={`${styles.GameBox_mini}  ${
                  item.isActive ? styles.active : null
                }`}
                onClick={() => handleGetQuestionFromLeftMenu(item)}
              >
                <div className={styles.title}>{item.title}</div>
                <PanoramaOutlinedIcon className={styles.icon} />
                <div className={styles.options}>
                  <div className={styles.option}></div>
                  <div className={styles.option}></div>
                  <div className={styles.option}></div>
                  <div className={styles.option}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={() => handleAddQuestion()}>Add question</button>
          <button className={styles.saveBtn} onClick={() => saveAll()}>
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
