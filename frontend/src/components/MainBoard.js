// 게시판 구성

// import React, {useState, useEffect} from "react";
// import axios from "axios";
import PostList from "./PostList";

// 추후 벡엔드와 연결하여 동적으로 데이터를 받아옴
// useEffect, useState 훅 사용
// axios 라이브러리를 통한 통신
// 불러온 데이터(회사 이름)을 클릭하면 해당 회사 게시판으로 이동
const companies = [
    {id:1, name: "회사1", posts: [{ title: "글1-1", time: "12:34", user: "username1" }, { title: "글2-1", time: "12:33", user: "username2" }, { title: "글3-1", time: "12:32", user: "username3" }] },
    {id:2, name: "회사2", posts: [{ title: "글1-2", time: "12:34", user: "username1" }, { title: "글2-2", time: "12:33", user: "username2" }, { title: "글3-2", time: "12:32", user: "username3" }] },
    {id:3, name: "회사3", posts: [{ title: "글1-3", time: "12:34", user: "username1" }, { title: "글2-3", time: "12:33", user: "username2" }, { title: "글3-3", time: "12:32", user: "username3" }] },
];

function Board() {
    /*
      const [companies, setCompanies] = useState([]);
      useEffect(() => {
        // 백엔드 호출
        axios.get("/api/companies")  
          .then((response) => {
            // 최신 글 3개 호출
            const recentThree = response.data.map((company) => ({
              ...company,
              posts: company.posts
                  .sort((a, b) => new Date(b.time) - new Date(a.time))
                  .slice(0, 3),              
            }));
            setCompanies(recentThree);
          })
          .catch((error) => {
            console.log("데이터 호출 오류 : ", error);
          });
      }, []);

    */

      return (
        <div style={styles.mainContainer}>
            <div style={styles.boardContainer}>
                <h2 style={styles.title}>회사 게시판</h2>
                <div style={styles.cardContainer}>
                    {companies.map((company, index) => (
                        <div key={index} style={styles.card}>
                            <div style={styles.logoContainer}>
                                {/*추후 회사별 로고 사진 추가*/}
                                <img src={`path/to/logo_${company.id}.png`} alt={`${company.name} 로고`} style={styles.logo} />
                            </div>
                            <h3 style={styles.companyName}>{company.name}</h3>
                            <PostList company={company} />
                            {/*더보기 버튼 클릭 시 해당 게시판으로 이동하는 기능 추후 추가 */}
                            <button style={styles.viewButton}>더보기</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
  mainContainer: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f0f4f8", 
    minHeight: "100vh",
    marginTop: "60px",
    padding: "30px",
  },
  boardContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.1)", 
    transition: "box-shadow 0.3s ease",
  },
  title: {
    fontSize: "38px",
    fontWeight: "700",
    marginBottom: "40px",
    color: "#2e2e2e", 
    textAlign: "center",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
    padding: "0 20px",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.13)",
    padding: "30px",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "auto",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    position: "relative",
  },
  
  logoContainer: {
    height: "80px",
    marginBottom: "20px",
  },
  logo: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
  },
  companyName: {
    fontSize: "24px",
    fontWeight: "500",
    marginBottom: "15px",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: "1px",
    textAlign: "center", 
  },
  viewButton: {
    marginTop: "20px",
    padding: "10px 18px", 
    fontSize: "14px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #0077b6,rgb(1, 176, 211))", 
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block", 
    width: "100%",
  },

  // 미디어 쿼리 추가
  "@media (max-width: 1024px)": {
    boardContainer: {
      padding: "30px",  
    },
    title: {
      fontSize: "28px", 
    },
  },

  "@media (max-width: 768px)": {
    card: {
      padding: "20px",
      marginBottom: "20px",  
    },
    viewButton: {
      fontSize: "14px",  
      padding: "10px 20px",  
    },
  },

  "@media (max-width: 480px)": {
    cardContainer: {
      gridTemplateColumns: "1fr",  
      padding: "0 10px", 
    },
    logoContainer: {
      height: "60px",  
    },
    companyName: {
      fontSize: "24px",
    },
  },
};

export default Board;