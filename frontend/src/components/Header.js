// 헤더 컴포넌트
// 상단 구성

import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, onLogout, page, selectedCompany }) {
  const navigate = useNavigate();
  const companyPage = `/company/${selectedCompany}`;

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>ProfileHelper</h1>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>홈</Link>
        <Link to="/profile" style={styles.link}>마이페이지</Link>
      </nav>
      <div style={styles.buttonContainer}>
        {page === "writepage" ? (
          <>
            <Link to={companyPage}>
              <button style={styles.button1}>글등록</button>
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} style={styles.button2}>
                로그아웃
              </button>
            ) : (
              <Link to="/signin">
                <button style={styles.button2}>로그인</button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/writepage">
              <button style={styles.button1}>글쓰기</button>
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} style={styles.button2}>
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
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 20px",
    borderBottom: "1px solid #ddd",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    height: "60px",
    backgroundColor: "#fff",
    zIndex: "1000",
    boxSizing: "border-box",  
    overflow: "hidden",  
    flexWrap: "wrap",
  },
  title: {
    fontSize: "24px",
    margin: "0",
    flexShrink: 0,  
    whiteSpace: "nowrap", 
  },
  nav: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-start",
    flex: 1,
    marginLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    flexShrink: 0,
  },
  button1: {
    padding: "5px 10px",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "#297BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  button2: {
    padding: "5px 10px",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "black",
    border: "1.25px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;