import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import Profile from "./components/Profile";
import WritePage from "./components/WritePage";
import Company from "./components/Company";
import Article from "./components/Article";
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(""); // 상태 선언 추가

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/hello") // Spring Boot API 주소
        .then((response) => response.text())
        .then((data) => setMessage(data))
        .catch((error) => console.error("Error:", error));
}, []);

  return (
    <Router>
      {/* 로그인 상태에 따라 Header가 다르게 표시되도록 */}
      <Routes>
        <Route path="/" element={<Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/profile" element={<Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/company/:id" element={<Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/articles/:id" element={<Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        {/* 기타 경로 추가 */}
      </Routes>

      <Routes>
        {/* 로그인 상태에 따라 접근 가능한 페이지 설정 */}
        <Route path="/" element={<MainBoard />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/writepage" element={isLoggedIn ? <WritePage isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : <Navigate to="/signin" />} />
        <Route path="/company/:id" element={isLoggedIn ? <Company /> : <Navigate to="/signin" />} />
        <Route path="/articles/:id" element={isLoggedIn ? <Article /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
