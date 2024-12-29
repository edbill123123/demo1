import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Sidebar";

import "../css/Header.css"



function Header() {
  return (
    <header id="header">

      <div className="flex-container">

        <div id="logo" className="flex-item1">
          <Navbar />
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/assets/img/volleyball-logo.png"} alt="Logo" id="logo-image" />
          </Link>
        </div>

        <div className="flex-item2">
          <Link to="/">未知功能1</Link>
          <Link to="/">未知功能2</Link>
          <Link to="/">未知功能3</Link>
          <Link to="/Authentication" >登入</Link>
        </div>

      </div>
      
    </header>

  );
}

export default Header;