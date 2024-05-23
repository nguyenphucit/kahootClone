import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.scss";
import { AdminNavBar } from "../../component/AdminNavBar/AdminNavBar";
import { CreateGameLeftMenu } from "../../component/CreateGameLeftMenu/CreateGameLeftMenu";
import createBG from "../../img/kahootAdminBG.jpg";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import QuizApi from "../../api/Quiz";
import { useLocation } from "react-router-dom";
export const CreateQuizPage = () => {
  const location = useLocation();
  const [question, setquestion] = useState({});
  const { register, handleSubmit, setValue } = useForm();
  const [QuizTitle, setQuizTitle] = useState(() => {
    if (location.state) {
      return location.state.quizList.title;
    } else return "";
  });
  const [currentQuestion, setcurrentQuestion] = useState();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [quizId, setquizId] = useState(() => {
    if (location.state) {
      return location.state.quizList.id;
    } else return "";
  });
  const [questionList, setquestionList] = useState(() => {
    if (location.state) {
      return location.state.quizList.questions;
    } else return [];
  });
  const handleSaveAll = async () => {
    if (quizId !== "") {
      try {
        const response = await QuizApi.updateQuizAdmin(
          questionList,
          QuizTitle,
          quizId
        );
        if (response) {
          alert("đã update thành công quiz");
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await QuizApi.createQuizAdmin(
          questionList,
          user.id,
          QuizTitle
        );
        if (response) {
          alert("đã tạo thành công quiz");
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    let answer = null;
    for (let i = 1; i <= 4; i++) {
      if (question[`option${i}`] === question.answer) {
        answer = i;
        break;
      }
    }
    setcurrentQuestion(() => question.id);
    setValue("option1", question.option1);
    setValue("option2", question.option2);
    setValue("option3", question.option3);
    setValue("option4", question.option4);
    setValue("answer", answer.toString());
    setValue("title", question.title);
    // eslint-disable-next-line
  }, [question]);

  const onSubmit = (data) => {
    const newQuestionList = [...questionList];
    const existingQuestion = newQuestionList.find(
      (questionExist) => questionExist.id === question.id
    );
    if (existingQuestion) {
      existingQuestion.title = data.title;
      existingQuestion.option1 = data.option1;
      existingQuestion.option2 = data.option2;
      existingQuestion.option3 = data.option3;
      existingQuestion.option4 = data.option4;
      existingQuestion.answer = data[`option${data["answer"]}`];
    } else {
      const newData = {
        id: currentQuestion,
        category: "custom",
        difficulty: "easy",
        isActive: true,
        title: data.title,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        answer: data[`option${data["answer"]}`],
      };
      newQuestionList[currentQuestion - 1] = newData;
    }
    console.log(newQuestionList);
    setquestionList(() => [...newQuestionList]);
  };
  const handleDeleteQuestion = async () => {
    try {
      const questionIdNeedToDelete = question.id;
      const response = await QuizApi.deleteQuestion(questionIdNeedToDelete);
      if (response) {
        const newQuizList = questionList.filter(
          (questionStay) => questionStay.id !== questionIdNeedToDelete
        );
        const position = questionList.findIndex(
          (questionStay) => questionStay.id === questionIdNeedToDelete
        );
        setquestionList(() => newQuizList);
        const question =
          position !== 0
            ? questionList[position - 1]
            : questionList[position + 1];
        question.isActive = true;
        setquestion(() => question);
        alert("successfully delete question");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <AdminNavBar />
      <div className={styles.content}>
        <CreateGameLeftMenu
          getQuestion={setquestion}
          data={questionList}
          addQuestion={setquestionList}
          saveAll={handleSaveAll}
          setTitle={setQuizTitle}
          quizTitle={QuizTitle}
        />
        <div className={styles.contentRight}>
          <img src={createBG} className={styles.AdminBG} alt="" />
          <div className={styles.questionBox}>
            <input
              type="text"
              className={styles.questionIp}
              placeholder="Start typing your question"
              {...register("title")}
            />
          </div>
          <button
            className={styles.DeleteQuestionBtn}
            onClick={() => handleDeleteQuestion()}
          >
            Delete
          </button>
          <form className={styles.answerBox} onSubmit={handleSubmit(onSubmit)}>
            <button className={styles.SaveQuestionBtn}>Save</button>
            <div className={styles.choice}>
              <div
                className={styles.choiceIcon}
                style={{ background: "rgb(226, 27, 60)" }}
              >
                <div
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                ></div>
              </div>
              <input
                type="text"
                className={styles.choiceIp}
                placeholder="add answer 1"
                {...register("option1")}
              />
              <input
                {...register("answer")}
                type="radio"
                className={styles.correctAnswer}
                value="1"
              />
            </div>
            <div className={styles.choice}>
              <div
                className={styles.choiceIcon}
                style={{ background: "rgb(19 104 206)" }}
              >
                <div style={{ clipPath: "circle(50% at 50% 50%)" }}></div>
              </div>
              <input
                type="text"
                className={styles.choiceIp}
                placeholder="add answer 2"
                {...register("option2")}
              />
              <input
                {...register("answer")}
                type="radio"
                className={styles.correctAnswer}
                value="2"
              />
            </div>
            <div className={styles.choice}>
              <div
                className={styles.choiceIcon}
                style={{ background: "rgb(216 158 0)" }}
              >
                <div
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                ></div>
              </div>
              <input
                type="text"
                className={styles.choiceIp}
                placeholder="add answer 3"
                {...register("option3")}
              />
              <input
                {...register("answer")}
                type="radio"
                className={styles.correctAnswer}
                value="3"
              />
            </div>
            <div className={styles.choice}>
              <div
                className={styles.choiceIcon}
                style={{ background: "rgb(38 137 12)" }}
              >
                <div
                  style={{
                    clipPath:
                      "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
                  }}
                ></div>
              </div>
              <input
                type="text"
                className={styles.choiceIp}
                placeholder="add answer 4"
                {...register("option4", { defaultValue: "" })}
              />
              <input
                {...register("answer")}
                type="radio"
                className={styles.correctAnswer}
                value="4"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
