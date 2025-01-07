import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
        <Route path="/" element={<MainBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/writepage" element={<WritePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/company/:id" element={<Company />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
