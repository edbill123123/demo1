import React, { useState, useRef, useEffect } from "react";
import "../css/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // 切換狀態
  };

  const handleClickOutside = (event) => {
    // 確保點擊不在 sidebar 或按鈕範圍內
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      const isButtonClick = event.target.closest("button");
      if (!isButtonClick) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div id="sidebar">

      <button className="hamburger-open" onClick={toggleSidebar}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      <div className={`sidebar-content ${isOpen ? "open" : ""}`} ref={sidebarRef}>
        
        <button className="hamburger-close" onClick={toggleSidebar}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        <ul className="sidebar-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

      </div>
      
    </div>
  );
}

export default Sidebar;
