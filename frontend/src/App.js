import './App.css';

import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./Header";
import MainBoard from "./MainBoard";
import Article from "./Article";
import Signin from './Signin';
import Signup from './Signup';

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
        <Route path = "/" element={<MainBoard />} />
        <Route path = "/articles" element={<Article />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* 기타 페이지 추가 */}
      </Routes>  
    </Router>
  );
}

export default App;
