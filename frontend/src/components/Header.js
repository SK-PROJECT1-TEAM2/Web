import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ isLoggedIn, onLogout, page, selectedCompany }) {
  const navigate = useNavigate();
  const main_Page = `/`;

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.divstyle}>
        <header style={styles.headFirst}>지능형 애플리케이션 개발자 양성 과정 2기</header>
        <div style={styles.fullWidthLine}></div>
        <header style={styles.header1}>
          <div style={styles.titleNavContainer}>
            <h1 style={styles.title}>ProfileHelper</h1>
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
                <Link to="/">
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
      <div style={styles.bottomLine}></div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%", // 전체 페이지 너비
  },
  divstyle: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "10px 20px",
    boxSizing: "border-box",
  },
  headFirst: {
    textAlign: "left", // 중앙 정렬
    paddingBottom: "10px",
    fontSize: "0.9rem",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif",
  },
  fullWidthLine: {
    backgroundColor: "red",
    position: "absolute", // 화면 전체 너비 적용
    width: "100vw", // 화면 전체 너비
    height: "1px", // 선의 두께
    backgroundColor: "#ddd", // 선 색상
    left: 0,
  },
  header1: {
    marginTop: "20px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  titleNavContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "bold",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif",
  },
  nav: {
    marginLeft: "20px",
    display: "flex",
    gap: "10px",
  },
  link1: {
    fontSize: "1.2rem",
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
  link2: {
    marginLeft: "20px",
    fontSize: "1.2rem",
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
  bottomLine: {
    width: "100%", // 전체 화면 너비
    height: "1px", // 선의 두께
    backgroundColor: "#ddd", // 선 색상
  },

  "@media (max-width: 768px)": {
    header: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    titleNavContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px",
    },
    buttonContainer: {
      flexDirection: "column",
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