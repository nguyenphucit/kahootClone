import axiosClient from "./axiosconfig";
const UserApi={
    createUser:async(data)=>{
        const url='/user/create'
        try {
             const response=await axiosClient.post(url,data)
             if(response.code===200)
             return response.data
        } catch (error) {
            console.log(error)
        }
    },
    findUserById:async(id)=>{
        const url=`/user/${id}`
        try {
            const response=await axiosClient.get(url)
            if(response.code===200)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    Login:async(loginInfo)=>{
        const url=`/auth/login`
        try {
            const response=await axiosClient.post(url,loginInfo)
            if(response.code===200)
            return response.data
        } catch (error) {
            const response=error.response.data
            if(response.code===400)
            return response.message
        }
    },
    Register:async(registerInfo)=>{
        const url=`/auth/register`
        try {
            const response=await axiosClient.post(url,registerInfo)
            if(response.code===201)
            return response.data
        } catch (error) {
            const response=error.response.data
            if(response.code===409)
            return response.message
        }
    },
    submitOTP:async(otp,userInfo)=>{
        const url=`/auth/verifyOtp`
        try {
            const response=await axiosClient.post(url,userInfo,{params:{otp:otp}})
            if(response.code===200)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
export default UserApi