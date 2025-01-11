import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSignup = (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 회원가입 데이터 백엔드로 전송
      fetch("http://localhost:8080/signup_process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 데이터 전송
        },
        body: JSON.stringify({
          user_name: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("회원가입 성공!");
            navigate("/signin");
          } else {
            alert("회원가입 실패! 다시 시도해주세요.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("서버 오류가 발생했습니다.");
        });
      };
  
    return (
        <div style={styles.outerContainer}>
          <div style={styles.boxContainer}>
            <h2 style={styles.title}>회원가입</h2>
            <form onSubmit={handleSignup} style={styles.form}>
              <input
                type="text"
                name="username"
                placeholder="Enter Your Username"
                value={formData.username}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
                required
              />

              <p style={styles.signinText}>
                <span style={styles.signinQuestion}>이미 계정이 있으신가요?</span>
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  style={styles.signinButton}
                >
                  로그인
                </button>
              </p>

              <button type="submit" style={styles.button}>
                회원가입
              </button>
            </form>
          </div>
        </div>
      );
  }
  
  
  const styles = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", 
      backgroundColor: "#f0f4f8", 
    },
    boxContainer: {
      width: "auto",
      minWidth: "350px",
      minHeight: "625px",
      height: "auto",
      maxHeight: "95vh",
      aspectRatio: "500 / 950",
      padding: "20px",
      backgroundColor: "#ffffff",
      textAlign: "center",
      fontFamily: "'Noto Sans KR', sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.1)", 
    },
    title: {
      display: "flex",
      fontFamily: "'Noto Sans KR', sans-serif",
      fontSize: "30px",
      fontWeight: "bold",
      marginTop: "-50px",
      marginBottom: "40px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      margin: "8px 0",
      marginBottom: "10px",
      padding: "10px",
      fontSize: "16px",
      width: "120%",
      fontFamily: "'Noto Sans KR', sans-serif",
      border: "1.25px solid rgba(4, 4, 4, 0.20)",
      borderRadius: "5px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#297BFF",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "130%",
      fontFamily: "'Noto Sans KR', sans-serif",
    },
    signinText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "15px",
      marginBottom: "80px",
    },
    signinQuestion: {
      fontSize: "14px",
      fontFamily: "'Noto Sans KR', sans-serif",
    },
    signinButton: {
      fontSize: "15px",
      color: "#000000",
      fontWeight: "bold",
      background: "none",
      border: "none",
      cursor: "pointer",
      textDecoration: "underline",
      fontFamily: "'Noto Sans KR', sans-serif",
    },
  };
  
export default Signup;