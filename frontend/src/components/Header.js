// 헤더 컴포넌트
// 상단 구성

import React from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout, page, selectedCompany }) {
  const companyPage = `/company/${selectedCompany}`;

  return (
    <div style={styles.divstyle}>
      <header style={styles.header}>
        <h1 style={styles.title}>ProfileHelper</h1>
        <nav style={styles.nav}>
          <Link to="/">홈</Link>
          <Link to="/profile">마이페이지</Link>
        </nav>
        <div>
          {page === "writepage" ? (
            // WritePage일 경우
            <>
              <Link to={companyPage}>
                <button style={styles.button1}>글등록</button>
              </Link>
              {isLoggedIn ? (
                <button onClick={onLogout} style={styles.button2}>
                  로그아웃
                </button>
              ) : (
                <Link to="/signin">
                  <button style={styles.button2}>로그인</button>
                </Link>
              )}
            </>
          ) : (
            // WritePage가 아닐 경우
            <>
              <Link to="/writepage">
                <button style={styles.button1}>글쓰기</button>
              </Link>
              {isLoggedIn ? (
                <button onClick={onLogout} style={styles.button2}>
                  로그아웃
                </button>
              ) : (
                <Link to="/signin">
                  <button style={styles.button2}>로그인</button>
                </Link>
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
}

const styles = {
  divstyle: {
    maxWidth: "1900px",
    width: "180%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  title: {
    margin: "0 400px",
    flex: 0,
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
