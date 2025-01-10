import React, { useEffect, useState } from "react";
import profileImage from "./profileImage.png";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/mypage", {
      method: "GET",
      credentials: "include", // 세션 쿠키 포함
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("사용자 정보를 불러오는 데 실패했습니다.");
        }
      })
      .then((data) => setUserInfo(data))
      .catch((error) => {
        console.error(error.message);
        window.location.href = "/login"; // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      });
  }, []);

  if (!userInfo) {
    return <p>로딩 중...</p>;
  }

      return (
        <div style={styles.container}>  
          <h1 style={styles.title}>마이페이지</h1>
          <div style={styles.profile}>
            <img src={profileImage} alt="Profile" style={styles.image} />
            <p style={styles.username}>{userInfo.username}</p>
          </div>
          <div style={styles.infoBox}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>사용자 이름</span>
              <span>{userInfo.username}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>이메일</span>
              <span>{userInfo.email}</span>
            </div>
          </div>
        </div>
      );
}

const styles = {
    container:{
        padding: "150px 50px",
        margin: "70px 400px",
        maxWidth: "990px",
        width: "84%", 
        border: "1px solid #ddd",
    },
    title: {
        marginTop: "-130px",
        marginBottom: "100px",
        marginLeft: "-20px",
        fontSize: "32px",
        fontWeight: "bold",
      },
      profile: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "50px",
      },
      image: {
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        border: "5px solid #ccc",
      },
      username: {
        marginTop: "15px",
        fontSize: "24px",
        fontWeight: "bold",
      },
      infoBox: {
        width: "300px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#fff",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "0 auto", 
        textAlign: "center",
      },
      infoRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      },
      infoLabel: {
        fontWeight: "bold",
        color: "#555",
      },
    };
    
    export default Profile;