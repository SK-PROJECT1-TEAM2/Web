// 헤더 컴포넌트
// 상단 구성

import React from "react";

// 추후 벡엔드와 링크 연결
function Header() {
    return(
        <header style = {styles.header}>
            <h1 style = {styles.title}>ProfileHelper</h1>
            <nav style = {styles.nav}>
                <a href="/">홈</a>
                <a href="/profile">마이페이지</a>
            </nav>
            <div>
                <button style={styles.button1}>글쓰기</button>
                <button style={styles.button2}>로그인</button>
            </div>
        </header>
    );
}

const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: "1px solid #ddd",
    },
    title: { margin: 0 },
    nav: { 
        display: "flex", 
        gap: "10px", 
        justifyContent: "flex-start",
        flex: 1,
        paddingLeft: "20px", 
    },
    button1: {
      marginLeft: "10px",
      padding: "5px 10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    button2: {
        marginLeft: "10px",
        padding: "5px 10px",
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
      },
};

export default Header;