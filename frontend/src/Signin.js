import './App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
      
      if (formData.email === "test@example.com" && formData.password === "1234") {
        alert("로그인 성공");
        navigate("/main"); 
      } else {
        alert("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    };
  
    return (
        <div style={styles.outerContainer}>
          <div style={styles.boxContainer}>
            <h2 style={styles.title}>로그인</h2>
            <form onSubmit={handleLogin} style={styles.form}>
              
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
              />
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
              />

              <p style={styles.signupText}>
                <span style={styles.signupQuestion}>처음이신가요?</span>
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  style={styles.signupButton}
                >
                  회원가입
                </button>
              </p>

              <button type="submit" style={styles.button}>
                Login
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
      backgroundColor: "#ffffff",
      fontFamily: "'Noto Sans KR', sans-serif",
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
      border: "1.25px solid rgba(0, 0, 0, 0.2)", 
      textAlign: "center",
      fontFamily: "'Noto Sans KR', sans-serif",
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center",
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
    label: {
        fontSize: "16px",
        marginBottom: "1px",
        textAlign: "left",
        width: "120%",
        fontFamily: "'Noto Sans KR', sans-serif",
        fontWeight: "Regular",
        marginTop: "30px",
    },
    input: {
      margin: "5px 0",
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
    signupText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center", 
      marginTop: "15px",
      marginBottom:"80px",
    },
    signupQuestion: {
      fontSize: "14px",
      fontFamily: "'Noto Sans KR', sans-serif",
    },
    signupButton: {
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
  
  
export default Login;