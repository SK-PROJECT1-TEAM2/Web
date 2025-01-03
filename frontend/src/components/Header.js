// 헤더 컴포넌트
// 상단 구성

import React from "react";

// 추후 링크 연결
function Header() {
    return(
        <div style = {styles.divstyle}>
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
        </div>
    );
}

const styles = {
    divstyle : {
        maxWidth: "1900px",
        width:"180%"
    },
    header: {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    title: { 
        margin: "0 400px",
        flex:0,
    },
    nav: { 
        display: "flex", 
        gap: "10px", 
        justifyContent: "flex-start",
        flex: 1,
        marginLeft: "-300px",
    },
    button1: {
      marginRight: "10px",
      padding: "5px 10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    button2: {
        marginRight: "400px",
        padding: "5px 10px",
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
      },
};

export default Header;