import './App.css';

import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import Profile from "./components/Profile";
import WritePage from "./components/WritePage";
import Company from "./components/Company";
import Article from "./components/Article";
import Signin from './components/Signin';
import Signup from './components/Signup';


// 로그인 전에는 "/"에서 로그인 버튼이, 로그인 후에는 "/"에서 로그아웃 버튼이 나오게 설정
// "/Signin", "Signup"을 제외한 다른 경로들은 로그인이 된 후에만 사용가능하게 설정
// 로그인 전 : 상단에 로그인 버튼 / 로그인 후 : 상단에 로그아웃 버튼이 나오도록 헤더 설정
//                                            단, 글쓰기 화면에는 글등록 버튼만
function App() {
  return (
    <Router>
      {/* 경로마다 다른 Header가 보이도록 렌더링 */}
      <Routes>
        <Route path="/" element={<Header page="home" />} />
        <Route path="/profile" element={<Header page="my" />} />
        <Route path="/company/:id" element={<Header page="company" />} />
        <Route path="/articles/:id" element={<Header page="article" />} />
        {/* 기타 경로 추가 */}
      </Routes>
      
      <Routes>
        <Route path = "/" element={<MainBoard />} />\
        <Route path = "/profile" element={<Profile/>} />
        <Route path = "/writepage" element={<WritePage />} />
        {/* 회사 id를 동적으로 처리 */}
        <Route path = "/company/:id" element={<Company />} />
        {/* 게시글 id를 동적으로 처리 */}
        <Route path = "/articles/:id" element={<Article />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>  
    </Router>
  );
}

export default App;