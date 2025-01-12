import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import Profile from "./components/Profile";
import WritePage from "./components/WritePage";
import Company from "./components/Company";
import Article from "./components/Article";
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 초기 상태를 false로 설정

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // 특정 경로에서 Header를 숨기기 위한 컴포넌트
  const Layout = ({ children }) => {
    const location = useLocation();
    const hideHeaderRoutes = ["/signin", "/signup"]; // Header를 숨길 경로
    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

    return (
      <>
        {!shouldHideHeader && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        {children}
      </>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainBoard />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/writepage" element={isLoggedIn ? <WritePage /> : <Navigate to="/signin" />} />
          <Route path="/company/:id" element={isLoggedIn ? <Company /> : <Navigate to="/signin" />} />
          <Route path="/Articles/:id" element={<Article />} />
          <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;