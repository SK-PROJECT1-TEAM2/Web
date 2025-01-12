import React, { useEffect, useState } from "react";
import profileImage from "./profileImage.png";

function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/mypage", {
      method: "GET",
      credentials: "include",
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
        window.location.href = "/login";
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
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>멘토 여부</span>
          <span>✔️</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 20px",
    margin: "30px auto",
    maxWidth: "800px",
    width: "90%",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "600px", 
  },
  title: {
    marginBottom: "50px",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  image: {
    marginBottom: "30px",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "5px solid #ccc",
  },
  username: {
    marginBottom: "0",
    fontSize: "20px",
    fontWeight: "bold",
  },
  infoBox: {
    width: "70%",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "40px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "0 10px",
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#555",
  },

  "@media (max-width: 768px)": {
    container: {
      padding: "20px",
      margin: "10px auto",
      maxWidth: "90%",
    },
    title: {
      fontSize: "24px",
    },
    image: {
      width: "120px",
      height: "120px",
    },
    username: {
      fontSize: "18px",
    },
    infoRow: {
      flexDirection: "column",
      alignItems: "center",
    },
    infoLabel: {
      marginBottom: "5px",
    },
  },
};

export default Profile;