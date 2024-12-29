import React, { useEffect } from "react";

import "../css/FacebookAuth.css"
const FacebookLogin = () => {

  useEffect(() => {

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "907319744452633",  // 這裡填入你的 Facebook App ID
        xfbml: true,
        version: "v21.0"  // 使用的 API 版本
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "facebook-jssdk"));

  }, []);  // 空陣列確保只在組件掛載時執行一次

  // 處理 Facebook 登入
  const handleLogin = () => {
    window.FB.login(function (response) {
      if (response.authResponse) {
        console.log("Login successful:", response);
        // 可以將 response.authResponse.accessToken 發送到後端進行驗證
      } else {
        console.error("User login failed");
      }
    }, { scope: "public_profile,email" });  // 欲請求的權限
  };

  return (
    <div>
      <div id="fb-login" onClick={handleLogin}>
        <img id="fb-login-img" src={`${process.env.PUBLIC_URL}/assets/img/fb-logo.png`} alt="" />
        <span>使用Facebook帳戶登入</span>
      </div>
    </div>
  );
};

export default FacebookLogin;
