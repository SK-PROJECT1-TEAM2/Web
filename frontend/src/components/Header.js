// 헤더 컴포넌트
// 상단 구성

import React from "react";
import { Link } from "react-router-dom";

// 추후 링크 연결
function Header( {page} ) {
    return(
        <div style = {styles.divstyle}>
            <header style = {styles.header}>
                <h1 style = {styles.title}>ProfileHelper</h1>
                <nav style = {styles.nav}>
                    <a href="/">홈</a>
                    <a href="/profile">마이페이지</a>
                </nav>
                <div>
                    {/* 글쓰기 버튼을 누르면 글쓰기 페이지로 이동 */}
                    {page !== "articles" && 
                    <Link to ="/articles"> <button style={styles.button1}>글쓰기</button> </Link>}

                    {/* 글쓰기 페이지에서는 글등록 버튼만 존재 */}
                    {page === "articles" ? 
                        (<Link to ="/">
                            <button style={styles.button2}>글등록</button>
                        </Link> )
                        : (<Link to ="/">
                            <button style={styles.button2}>로그인</button>
                        </Link>)
                    }
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