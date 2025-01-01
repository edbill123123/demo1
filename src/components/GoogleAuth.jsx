import React, { useEffect } from "react";

import "../css/GoogleAuth.css"

const GoogleAuth = () => {

  const handleSignIn = (response) => {
    try {
      const credential = response.credential;

      // 發送請求到 Node.js 伺服器
      fetch("https://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            console.log("Login successful:", data.user);
          } else {
            console.error("Login failed1:", data.error);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Login failed2:", error);
    }
  };

  const handleGoogleButton = () => {
    if (window.google && window.google.accounts) {
      console.log(123)
      window.google.accounts.id.prompt();
    }
  }

  useEffect(() => {
    /* 載入 Google login api 腳本 */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 初始化 Google 登錄 API
      window.google.accounts.id.initialize({
        client_id:
          "276752697110-g63lub9tkmg47jrk36mi20pocdiolntb.apps.googleusercontent.com",
        ux_mode: "redirect",
        auto_prompt: false,
        callback: handleSignIn,
      });
    };

  }, []);

  return (
    <div id="google-login" onClick={handleGoogleButton}>
      <img id="google-login-img" src={process.env.PUBLIC_URL+"/assets/img/google-logo.png"} alt="" />
      <span>使用google帳戶登入</span>
    </div>
  );
};

export default GoogleAuth;
