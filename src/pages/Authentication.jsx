import React, { useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Signin from "../components/Signin";

import "../css/Authentication.css"

function Authentication() {

  const [isAtive, setIsAtive] = useState({
    loginButton: true,
    signinButton: false
  });

  const toggleAuthMode = (event) => {
    if (event.target.name === "button-login") {
      setIsAtive({
        loginButton: true,
        signinButton: false
      });
    }
    else if (event.target.name === "button-signin") {
      setIsAtive({
        loginButton: false,
        signinButton: true
      });
    }
  };

  return (
    <div>

      <Header />

      <div id="authentication">

        <div className="flex-container">

          <div className="flex-item1">
            <button onClick={toggleAuthMode} className={`button ${isAtive.loginButton ? "active" : "inactive"}`} name="button-login">登入</button>
            <button onClick={toggleAuthMode} className={`button ${isAtive.signinButton ? "active" : "inactive"}`} name="button-signin">註冊</button>
          </div>

          <div className="flex-item2">
            <div style={{ display: isAtive.loginButton ? 'block' : 'none' }}><Login /></div>
            <div style={{ display: isAtive.signinButton ? 'block' : 'none' }}><Signin /></div>
          </div>

        </div>

      </div>

    </div>
  );
}
export default Authentication;