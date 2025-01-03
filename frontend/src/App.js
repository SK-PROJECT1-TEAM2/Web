// 커스텀 컴포넌트, 홈페이지
// 메인화면 구성 

import './App.css';

import React from "react";
import Header from "./components/Header";
import Board from "./components/Board";

function App() {
  return (
    <div>
      <Header />
      <Board />
    </div>
  );
}

export default App;
