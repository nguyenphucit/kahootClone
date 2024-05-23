import React, { useState } from "react";
import LoginBG from "../../img/LOGINBG.jpg";
import OTPInput from "react-otp-input";
import styles from "./style.module.scss";
import OtpLogo from "../../img/otpLogo.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
export const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const { user, handleSubmitOTP } = useContext(AuthContext);
  return (
    <div
      style={{
        backgroundImage: `url(${LoginBG})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <div className={styles.OTP_logo}>
          <img src={OtpLogo} alt="otpLogo" />
        </div>
        <div className={styles.OTP_content}>
          <div className={styles.OTP_title}>OTP VERIFICATION</div>
          <div className={styles.OTP_mail}>
            Enter the OTP sent to <b>{user?.email}</b>
          </div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              fontSize: "45px",
              backgroundColor: "white",
              border: "none",
              outline: "none",
              marginLeft: "15px",
              marginRight: "15px",
              textAlign: "center",
              borderBottom: "3px solid #333333",
            }}
            containerStyle={{
              margin: "15px",
              padding: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              borderRadius: "6px",
              textAlign: "center",
            }}
            inputType="text"
          />
          <button onClick={() => handleSubmitOTP(otp)}>Verify & Proceed</button>
        </div>
      </div>
    </div>
  );
};
