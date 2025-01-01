import React, { useEffect, useState } from "react";
import axios from 'axios';

import config from "../static/js/confiig.js";
import "../css/Signin.css"


function Signin() {

  const isValidString = (input) => /^[A-Za-z0-9]+$/.test(input);
  const isValidNumber = (input) => /^\d+$/.test(input);
  const isValidEmail = (email) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

  //儲存字串內容的state
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    password: "",
    password2: "",
    cellphone: "",
    phoneNumberVerification: "",
    email: "",
    emailVerification: "",
  });

  //判定字串是否合法的state
  const [hint, isHint] = useState({
    name: false,
    account: false,
    password: false,
    password2: false,
    cellphone: false,
    phoneNumberVerification: false,
    email: false,
  });

  const [phoneTimer, setPhoneTimer] = useState(0);
  const [isPhoneSending, setIsPhoneSending] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [emailTimer, setEmailTimer] = useState(0);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [allow, setAllow] = useState(false);


  const formatPhoneNumber = (phone) => {
    // 假設電話號碼來自台灣
    if (phone.startsWith("0")) {
      return "+886" + phone.slice(1); // 替換為 +886965019063
    }
    return phone; // 已經是國際格式
  };

  const formattedPhoneNumber = formatPhoneNumber(formData.cellphone); // 格式化電話號碼

  //發送手機驗證碼
  const sendPhoneCode = async () => {
    if (isPhoneSending) return;
    setIsPhoneSending(true);
    setPhoneTimer(30);

    try {
      await axios.post(`${config.API_URL}/phone/sendCode`, {
        phoneNumber: formattedPhoneNumber
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // 驗證手機驗證碼
  const verifyPhoneCode = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/phone/verifyCode`, {
        phoneNumber: formattedPhoneNumber,
        code: formData.phoneNumberVerification
      });
      if (response.status === 200) {
        setIsPhoneVerified(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //發送信箱驗證碼
  const sendEmailCode = async () => {
    if (isEmailSending) return;
    setIsEmailSending(true);
    setEmailTimer(30);

    try {
      await axios.post(`${config.API_URL}/email/sendCode`, {
        email: formData.email
      })
    } catch (error) {
      console.log(error.response);
    }
  };

  //驗證信箱驗證碼
  const verifyEmailCode = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/email/verifyCode`, {
        email: formData.email,
        code: formData.emailVerification
      })
      if (response.status === 200) {
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //儲存字串內容
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,      //保留之前的屬性
      [name]: value,    //更新當前屬性
    }));
  };

  //判定字串是否合法
  const handleStringBlur = (event) => {
    const { name, value } = event.target;
    //不是信箱的
    if (name !== "email") {
      if (!isValidString(value) && value !== "") {
        isHint((prevData) => ({
          ...prevData,
          [name]: true
        }))
      }
      else {
        isHint((prevData) => ({
          ...prevData,
          [name]: false
        }))
      }

      //密碼2次輸入確認
      if (name === "password") {
        if (value === formData.password2) {
          isHint((prevData) => ({
            ...prevData,
            password2: false
          }))
        }
      }
      else if (name === "password2") {
        if (value !== formData.password) {
          isHint((prevData) => ({
            ...prevData,
            [name]: true
          }))
        }
        else {
          isHint((prevData) => ({
            ...prevData,
            [name]: false
          }))
        }
      }
    }


    //信箱的
    else if (name === "email") {
      if (!isValidEmail(value) && value !== "") {
        isHint((prevData) => ({
          ...prevData,
          [name]: true
        }))
      }
      else {
        isHint((prevData) => ({
          ...prevData,
          [name]: false
        }))
      }
    }
  }

  //判定手機是否只含數字
  const handleNumberBlur = (event) => {
    const { name, value } = event.target;
    if (!isValidNumber(value) && value !== "") {
      isHint((prevData) => ({
        ...prevData,
        [name]: true
      }))
    }
    else {
      isHint((prevData) => ({
        ...prevData,
        [name]: false
      }))
    }
  }

  const nextStep = () => {
    const inputs = document.querySelectorAll("#form input:not([style*='display: none'])");
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        inputs[i].reportValidity();
        break;
      }
    }
    let check = true;
    const i = 4;
    let counter = 0;
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (counter === i) {
          break
        }
        else {
          if (formData[key] === "") {
            check = false;
          }
        }
      }
      counter++;
    }
    counter = 0;
    for (const key in hint) {
      if (hint.hasOwnProperty(key)) {
        if (counter === i) {
          break
        }
        else {
          if (hint[key] === true) {
            check = false;
          }
        }
      }
    }

    if (check) {
      setAllow(true);
    }
  }

  const prevStep = () => {
    setAllow(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // 防止表單提交刷新頁面

  };

  // 按下 Enter 键时阻止提交
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 阻止默认的 Enter 键提交行为
      console.log('Enter key pressed, but form is not submitted');
    }
  };

  useEffect(() => {
    let intervalForPhone;
    if (phoneTimer > 0) {
      intervalForPhone = setInterval(() => {
        setPhoneTimer((prev) => prev - 1);
      }, 1000);
    }
    else if (phoneTimer === 0) {
      setIsPhoneSending(false);
    }

    return () => clearInterval(intervalForPhone);
  }, [phoneTimer])

  useEffect(() => {
    let intervalForEmail;
    if (emailTimer > 0) {
      intervalForEmail = setInterval(() => {
        setEmailTimer((prev) => prev - 1);
      }, 1000);
    }
    else if (emailTimer === 0) {
      setIsEmailSending(false);
    }
    return () => clearInterval(intervalForEmail);
  }, [emailTimer]);


  return (
    <div id="signin">

      <h1 className="welcome">歡迎註冊</h1>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="form" id="form">

        <div className={`first-page ${allow ? "hidden" : ""}`}>
          <span>名字:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="請輸入名字"
          />
        </div>

        <div className={`first-page ${allow ? "hidden" : ""}`}>
          <span>帳號:</span>
          <input
            type="text"
            name="account"
            value={formData.account}
            onChange={handleChange}
            onBlur={handleStringBlur}
            required
            placeholder="請輸入帳號"
          />
        </div>
        {hint.account ? <span className="hint">字串無效，只允許 A-Z, a-z, 0-9</span> : ""}

        <div className={`first-page ${allow ? "hidden" : ""}`}>
          <span>密碼:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleStringBlur}
            required
            placeholder="請輸入密碼"
          />
        </div>
        {hint.password ? <span className="hint">字串無效，只允許 A-Z, a-z, 0-9</span> : ""}

        <div className={`first-page ${allow ? "hidden" : ""}`}>
          <span>密碼再次確認:</span>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            onBlur={handleStringBlur}
            required
            placeholder="請再次輸入密碼"
          />
        </div>
        {hint.password2 ? <span className="hint">需要跟密碼設置一樣</span> : ""}

        <div className={`second-page ${allow ? "show" : ""}`}>
          <span>手機:</span>
          <input
            type="tel"
            name="cellphone"
            value={formData.cellphone}
            onChange={handleChange}
            onBlur={handleNumberBlur}
            required
            placeholder="請輸入手機"
          />
          <button
            type="button"
            onClick={sendPhoneCode}
            className={`verify ${allow ? "show" : ""}`}
            disabled={isPhoneSending}
          >{isPhoneSending ? `重新發送 ${phoneTimer}s` : "發送驗證"}
          </button>
        </div>
        {hint.cellphone ? <span className="hint">字串無效，只允許0-9</span> : ""}

        <div className={`second-page ${allow ? "show" : ""}`}>
          <span>手機驗證:</span>
          <input
            type="tel"
            name="phoneNumberVerification"
            value={formData.phoneNumberVerification}
            onChange={handleChange}
            onBlur={handleNumberBlur}
            required
            placeholder="請輸入手機驗證碼"
          />
          {isPhoneVerified ? (
            <div className="tick">
              ✓
            </div>)
            : (
              <button
                type="button"
                onClick={verifyPhoneCode}
                className={`verify ${allow ? "show" : ""}`}
              >驗證
              </button>
            )}
        </div>

        <div className={`second-page ${allow ? "show" : ""}`}>
          <span>信箱:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleStringBlur}
            required
            placeholder="請輸入信箱"
          />
          <button
            type="button"
            className={`verify ${allow ? "show" : ""}`}
            onClick={sendEmailCode}
            disabled={isEmailSending}
          >{isEmailSending ? `重新發送${emailTimer}s` : "發送驗證"}
          </button>
        </div>
        {hint.email ? <span className="hint">非法的信箱格式</span> : ""}

        <div className={`second-page ${allow ? "show" : ""}`}>
          <span>信箱驗證:</span>
          <input
            type="text"
            name="emailVerification"
            value={formData.emailVerification}
            onChange={handleChange}
            required
            placeholder="請輸入信箱驗證碼"
          />
          {isEmailVerified ? (
            <div className="tick">
              ✓
            </div>)
            : (
              <button
                type="button"
                className={`verify ${allow ? "show" : ""}`}
                onClick={verifyEmailCode}
              >驗證
              </button>)}
        </div>

        <button type="button" className={`next ${allow ? "hidden" : ""}`} onClick={nextStep}>下一步</button>
        <button type="button" className={`prev ${allow ? "show" : ""}`} onClick={prevStep}>上一步</button>
        <button className={`submit  ${allow ? "show" : ""}`} type="submit">註冊</button>
      </form>
    </div >
  );
}
export default Signin;