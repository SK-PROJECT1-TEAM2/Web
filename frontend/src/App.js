// 커스텀 컴포넌트, 홈페이지
// 메인화면 구성 

import './App.css';

import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Board from "./components/Board";
import Article from "./pages/Article";

function App() {
  return (
    <Router>
      {/* 경로마다 다른 Header가 보이도록 렌더링 */}
      <Routes>
        <Route path="/" element={<Header page="home" />} />
        <Route path="/articles" element={<Header page="articles" />} />
        {/* 기타 경로 추가 */}
      </Routes>
      
      <Routes>
        <Route path = "/" element={<Board />} />
        <Route path = "/articles" element={<Article />} />
      </Routes>  
    </Router>
  );
}

export default App;
