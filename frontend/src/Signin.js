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
            <h2>로그인</h2>
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
                처음이신가요?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  style={styles.linkButton}
                >
                  회원가입
                </button>
              </p>

              <button type="submit" style={styles.button}>
                로그인
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
      minHeight: "600px", 
      height: "auto", 
      maxHeight: "95vh", 
      aspectRatio: "500 / 950", 
      padding: "20px",
      backgroundColor: "#ffffff", 
      border: "1.25px solid #ccc", 
      textAlign: "center",
      fontFamily: "'Noto Sans KR', sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    label: {
        fontSize: "16px",
        marginBottom: "5px",
        textAlign: "left",
        width: "100%",
        fontFamily: "'Noto Sans KR', sans-serif",
        fontWeight: 700,
    },
    input: {
      margin: "10px 0",
      marginBottom: "40px",
      padding: "10px",
      fontSize: "16px",
      width: "100%",
      fontFamily: "'Noto Sans KR', sans-serif",
       
    },
    button: {
      padding: "10px",
      backgroundColor: "#297BFF",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      fontFamily: "'Noto Sans KR', sans-serif", 
    },
    linkButton: {
      color: "#007BFF",
      background: "none",
      border: "none",
      cursor: "pointer",
      textDecoration: "underline",
    },
    signupText: {
      display: "flex",
      justifyContent: "center", 
      marginTop: "3px",
      marginBottom:"80px",
    },
  };
  
  
export default Login;