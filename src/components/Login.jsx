import React, { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import FacebookAuth from "./FacebookAuth";

import "../css/Login.css"


function Login() {

  const [formData, setFormData] = useState({
    account: "",
    password: ""

  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,      //保留之前的屬性
      [name]: value,    //更新當前屬性
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 防止表單提交刷新頁面
    console.log(event);
    console.log(event.target);
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit} className="form">
        <label>
          帳戶:
          <input
            type="text"
            name="account"
            value={formData.account}
            onChange={handleChange}
            required
            placeholder="請輸入帳戶"
          />
        </label>
        <br />
        <label>
          密碼:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="請輸入密碼"
          />
        </label>
        <br />
        <button className="submit" type="submit">登入</button>

        <h3 className="other">其他登入方式</h3>
        <div className="google-button">
          <GoogleAuth />
        </div>
        <div className="facebook-button">
          <FacebookAuth />
        </div>

      </form>
    </div>
  );
}
export default Login;