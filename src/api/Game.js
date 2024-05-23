import axiosClient from "./axiosconfig";
const GameApi={
    checkGamePin:async(id)=>{
        const url=`/game/checkexist/${id}`
        try {
            const response=await axiosClient.post(url)
            return response.code
        } catch (error) {
            console.log(error)
        }
    },

    getUserInRoom:async(id)=>{
        const url=`/game/${id}/user`
        try {
            const response=await axiosClient.get(url)
            if(response.code===200)
                return response.data
            return null
        } catch (error) {
            console.log(error)
        }
    },

    checkHost:async(id)=>{
        const url=`/game/checkhost/${id}`
        try {
            const response=await axiosClient.post(url)
            if(response.code===200)
                return response.data
            return null
        } catch (error) {
            console.log(error)
        }
    },

    getGameById:async(id)=>{
        const url=`/game/${id}`
        try {
            const response=await axiosClient.get(url)
            if(response.code===200)
                return response.data
            return null
        } catch (error) {
            console.log(error)
        }
    },
    submit:async(gameId,quizId,userId,answers)=>{
        const url=`/quiz/submit/${quizId}`
        const params={
            userId,gameId
        }
        try {
            const response=await axiosClient.post(url,answers,{params})
            if(response.code===200)
                return response.data
            return null
        } catch (error) {
            console.log(error)
        }
    },
    createQuizAdmin: async(listQuestion,userId)=>{
        const url=`/quiz/createQuiz/${userId}`
        try {
            const response=await axiosClient.post(url,listQuestion)
            if(response.code===201)
                return response.data
        } catch (error) {
            console.log(error)
        }
    },
    createGame:async(gameInfo)=>{
        console.log(gameInfo)
        const url=`/game/create`
        try {
            const response=await axiosClient.post(url,gameInfo)
            if(response.code===201)
                return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
export default GameApi