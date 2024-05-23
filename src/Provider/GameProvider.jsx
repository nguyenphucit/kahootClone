import React, { useContext, useState } from "react";
import { createContext } from "react";
import GameApi from "../api/Game";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
export const GameContext = createContext();
export const GameProvider = ({ children }) => {
  const [userList, setuserList] = useState([]);
  const [host, sethost] = useState(false);
  const [isStart, setisStart] = useState(false);
  const [rankingList, setrankingList] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const HandleStartGame = (StompClient) => {
    try {
      StompClient.send(`/app/start`, {});
    } catch (error) {
      console.log(error);
    }
  };
  const handleCallNextQuestion = async (StompClient) => {
    try {
      StompClient.send(`/app/nextQuestion`, {});
    } catch (error) {
      console.log(error);
    }
  };
  const handleEndGame = (StompClient, gameId) => {
    if (rankingList.length === 0)
      try {
        StompClient.send("/app/endGame", {}, gameId);
      } catch (error) {
        console.log(error);
      }
    else {
      try {
        StompClient.send("/app/deleteGame", {}, gameId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCreateGame = async (e, selectedQuiz) => {
    e.preventDefault();
    const gameInfo = {
      quizId: parseInt(selectedQuiz),
      hostId: parseInt(user.id),
    };
    const response = await GameApi.createGame(gameInfo);
    if (response) {
      alert("successfully create Game");
      navigate(`/lobby/${response.id}`);
    }
  };
  return (
    <GameContext.Provider
      value={{
        userList,
        setuserList,
        host,
        sethost,
        isStart,
        setisStart,
        HandleStartGame,
        handleCallNextQuestion,
        rankingList,
        setrankingList,
        handleEndGame,
        handleCreateGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
