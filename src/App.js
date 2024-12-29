import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { HashRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Authentication" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
