import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import UserApi from "../api/User";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState();
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))?.id !== undefined) {
      setuser(() => JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);
  const navigate = useNavigate();

  // handle Logout function////////////////////////////
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setuser(() => undefined);
    navigate("/login");
  };

  // handle Login function/////////////////////////////
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    const loginInfo = {
      email: email,
      password: password,
    };
    const response = await UserApi.Login(loginInfo);
    if (response?.id !== undefined) {
      const user = {
        id: response.id,
        isGuest: response.isGuest,
        userName: response.userName,
      };
      localStorage.setItem("userInfo", JSON.stringify(user));
      setuser(user);
      navigate("/admin");
    } else {
      alert(response);
    }
  };
  // handle submit otp//////////////////////////////
  const handleSubmitOTP = async (otp) => {
    try {
      const response = await UserApi.submitOTP(parseInt(otp), user);
      if (response) {
        setuser(() => response);
        alert("successfully create account, please log in to your account");
        navigate("/login");
      } else {
        alert("seems like otp code is wrong, please try again");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handle register//////////////////////////
  const handleRegister = async (e, username, email, password) => {
    e.preventDefault();
    const registerInfo = {
      userName: username,
      password,
      email,
    };
    try {
      setLoading(true);
      const response = await UserApi.Register(registerInfo);
      if (response?.id !== undefined) {
        setLoading(false);
        setuser(() => response);
        navigate("/otpVerify");
      } else {
        setLoading(false);
        alert(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setuser,
        handleLogout,
        handleLogin,
        handleSubmitOTP,
        handleRegister,
        Loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
