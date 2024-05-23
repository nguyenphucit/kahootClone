import React, { useState, useEffect, useContext } from "react";
import styles from "./GamePage.module.scss";
import GameApi from "../../api/Game";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useNavigate, useParams } from "react-router-dom";
import clock from "../../img/clock.png";
import { AuthContext } from "../../Provider/AuthProvider";
import { GameContext } from "../../Provider/GameProvider";
import { LeaderBoard } from "../../component/LeaderBoard/LeaderBoard";
import QuizApi from "../../api/Quiz";
import { ResultSummary } from "../../component/ResultSummary/ResultSummary";
export const GamePage = () => {
  const [questions, setquestions] = useState([]);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [answers, setanswers] = useState([]);
  const [quizId, setquizId] = useState();
  const [Time, setTime] = useState(30);
  const [disable, setdisable] = useState(false);
  const [isAnswer, setisAnswer] = useState(false);
  const [isEnd, setisEnd] = useState(false);
  const { gameId } = useParams();
  const { user, setuser } = useContext(AuthContext);
  const [result, setresult] = useState([]);
  const {
    host,
    setisStart,
    sethost,
    setuserList,
    handleCallNextQuestion,
    rankingList,
    setrankingList,
    handleEndGame,
  } = useContext(GameContext);
  const [StompClient, setStompClient] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const socket = new SockJS("http:/localhost:8080/ws");
    const client = Stomp.over(socket);
    let isConnected = false;
    client.connect({}, () => {
      client.subscribe("/topic/game", async (message) => {
        const receivedMessage = await JSON.parse(message.body);
        if (receivedMessage.body.code === 201) {
          setcurrentQuestion((prev) => prev + 1);
          setTime(() => 30);
          setdisable(() => false);
          setisAnswer(() => false);
        } else if (receivedMessage.body.code === 200) {
          setrankingList(receivedMessage.body.data);
        } else if (receivedMessage.body.code === 204) {
          setisStart(false);
          sethost(null);
          setuserList([]);
          setrankingList([]);

          if (JSON.parse(localStorage.getItem("userInfo"))?.id === undefined)
            setuser(undefined);
          alert(
            "host have remove this game, you will automatically remove from this room in 10s"
          );
          setTimeout(() => {
            navigate("/");
          }, 10000);
        }
      });
      isConnected = true;
      setStompClient(client);
    });

    return () => {
      if (isConnected) client.disconnect();
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!user) navigate("/");
    const getGame = async () => {
      try {
        const response = await GameApi.getGameById(gameId);
        if (response) {
          setquizId(response.quiz.id);
          setquestions(response.quiz.questions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGame();
    return () => {};
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let countDown;
    if (!disable) {
      countDown = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setdisable(() => true);
            clearInterval(countDown);
            return prev;
          }
        });
      }, 1000);
    }
    return () => {
      clearInterval(countDown);
    };
  }, [disable]);
  useEffect(() => {
    if (currentQuestion === questions.length && questions.length !== 0) {
      const submitAnswer = async () => {
        try {
          const response = await QuizApi.submit(
            gameId,
            quizId,
            user.id,
            answers
          );
          if (response) {
            let answerIndex = 0;
            let userResult = [];
            for (let i = 0; i < questions.length; i++) {
              if (answerIndex === answers.length) break;
              if (answers[answerIndex]?.id !== questions[i].id) {
                const result = {
                  rightAnswer: questions[i].answer,
                  userAnswer: " ",
                };
                userResult.push(result);
              } else {
                const result = {
                  rightAnswer: questions[i].answer,
                  userAnswer: answers[answerIndex].answer,
                };
                userResult.push(result);
                answerIndex++;
              }
            }
            alert(
              user.userName + " đạt: " + response.score + "/" + questions.length
            );
            setresult(() => userResult);
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (!host) submitAnswer();
      setisEnd(() => true);
    }
    // eslint-disable-next-line
  }, [currentQuestion, questions]);
  useEffect(() => {}, [rankingList]);

  const handleAnswer = (e) => {
    if (Number(e.target.value) === 1) {
      const choice = {
        id: questions[currentQuestion].id,
        answer: questions[currentQuestion].option1,
      };
      setanswers((prev) => [...prev, choice]);
    } else if (Number(e.target.value) === 2) {
      const choice = {
        id: questions[currentQuestion].id,
        answer: questions[currentQuestion].option2,
      };
      setanswers((prev) => [...prev, choice]);
    } else if (Number(e.target.value) === 3) {
      const choice = {
        id: questions[currentQuestion].id,
        answer: questions[currentQuestion].option3,
      };
      setanswers((prev) => [...prev, choice]);
    } else if (Number(e.target.value) === 4) {
      const choice = {
        id: questions[currentQuestion].id,
        answer: questions[currentQuestion].option4,
      };
      setanswers((prev) => [...prev, choice]);
    }
    setisAnswer(true);
  };
  console.log(result);
  return (
    <div className={styles.container}>
      <div className={styles.Wrapper}>
        <div className={styles.content}>
          {rankingList.length !== 0 ? null : (
            <div className={styles.time}>
              <img src={clock} alt="" />
              <span>{isEnd ? 0 : Time}</span>
            </div>
          )}
          {host ? (
            <button
              className={styles.nextBtn}
              onClick={() => {
                isEnd
                  ? handleEndGame(StompClient, gameId)
                  : handleCallNextQuestion(StompClient);
              }}
            >
              {isEnd ? "End" : "Next"}
            </button>
          ) : null}
          {rankingList.length !== 0 ? (
            <div className={styles.leaderboardBox}>
              <h1>LEADER BOARD</h1>
              <LeaderBoard data={rankingList} total={questions.length} />
            </div>
          ) : null}
          {rankingList.length !== 0 ? null : (
            <div className={styles.question} style={{ marginTop: "100px" }}>
              {isEnd
                ? "That's is the last question,Here is your answer check"
                : questions[currentQuestion]?.title + "?"}
            </div>
          )}
          {result.length === 0 || rankingList.length !== 0 ? null : (
            <div style={{ width: "100%", marginTop: "20px" }}>
              <ResultSummary data={result} />
            </div>
          )}
        </div>
        {isEnd ? null : (
          <div className={styles.options}>
            <button
              className={styles.option}
              style={{ backgroundColor: "rgb(204 8 56)" }}
              disabled={disable || isAnswer}
              value={1}
              onClick={(e) => handleAnswer(e)}
            >
              <span className={styles.redOptionIcon}></span>
              {questions[currentQuestion]?.option1}
            </button>
            <button
              className={styles.option}
              style={{ backgroundColor: "rgb(42 89 159)" }}
              value={2}
              disabled={disable || isAnswer}
              onClick={(e) => handleAnswer(e)}
            >
              <span className={styles.blueOptionIcon}></span>
              {questions[currentQuestion]?.option2}
            </button>
            <button
              className={styles.option}
              style={{ backgroundColor: "rgb(207 157 44)" }}
              value={3}
              disabled={disable || isAnswer}
              onClick={(e) => handleAnswer(e)}
            >
              <span className={styles.yellowOptionIcon}></span>
              {questions[currentQuestion]?.option3}
            </button>
            <button
              className={styles.option}
              style={{ backgroundColor: "rgb(102 162 48)" }}
              value={4}
              disabled={disable || isAnswer}
              onClick={(e) => handleAnswer(e)}
            >
              <span className={styles.greenOptionIcon}></span>
              {questions[currentQuestion]?.option4}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
