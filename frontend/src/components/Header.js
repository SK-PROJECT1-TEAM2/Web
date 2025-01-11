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
    <div style={styles.divstyle}>
      <header style={styles.header}>
        <div style={styles.titleNavContainer}>
          <h1 style={styles.title}>
            ProfileHelper
            </h1>
          <nav style={styles.nav}>
            <Link to="/" style={styles.link1}>
              홈
            </Link>
            <Link to="/profile" style={styles.link2}>
              마이페이지
            </Link>
          </nav>
        </div>
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
    </div>
  );
}

const styles = {
  divstyle: {
    maxWidth: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
    flexWrap: "wrap", // 줄바꿈 허용
  },
  titleNavContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px", // 제목과 내비게이션 사이 간격
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
  link1: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
  link2: {
    textDecoration: "none",
    color: "black",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button1: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  button2: {
    padding: "5px 10px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  // 반응형 스타일링
  "@media (max-width: 768px)": {
    header: {
      flexDirection: "column", // 세로 배치
      alignItems: "flex-start", // 왼쪽 정렬
    },
    titleNavContainer: {
      flexDirection: "column", // 제목과 내비게이션을 세로로 배치
      alignItems: "flex-start",
      gap: "10px",
    },
    buttonContainer: {
      flexDirection: "column", // 버튼을 세로로 배치
      gap: "10px",
    },
    button1: {
      width: "100%",
    },
    button2: {
      width: "100%",
    },
  },
};

export default Header;