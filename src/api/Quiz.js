import axiosClient from "./axiosconfig";
const QuizApi={
    submit:async(gameId,quizId,userId,answers)=>{
        const url=`/quiz/submit/${quizId}`
        console.log(answers)
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
    createQuizAdmin: async(listQuestion,userId,Title)=>{
        const url=`/quiz/createQuiz/${userId}`
        try {
            const response=await axiosClient.post(url,listQuestion,{params:{quizTitle:Title}})
            if(response.code===201)
                return response.data
        } catch (error) {
            console.log(error)
        }
    },
    updateQuizAdmin:async(listQuestion,Title,quizId)=>{
        const url=`/quiz/updateQuiz/${quizId}`
        try {
            const response=await axiosClient.put(url,listQuestion,{params:{quizTitle:Title}})
            if(response.code===200)
                return true
        } catch (error) {
            console.log(error)
        }
    },
    getQuizByUserId:async(userId)=>{
        const url=`/quiz`
        const params={userId}
        try {
            const response=await axiosClient.get(url,{params})
            if(response.code===200)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    deleteQuiz:async(quizId)=>{
        const url=`/quiz/delete/${quizId}`
        try {
            const response=await axiosClient.delete(url)
            if(response.code===200)
            return true
        } catch (error) {
            console.log(error)
        }
    },
    deleteQuestion:async(questionId)=>{
        const url=`/question/${questionId}`
        try {
            const response=await axiosClient.delete(url)
            if(response!=="")
            return true
        } catch (error) {
            console.log(error)
        }

    }
}
export default QuizApi