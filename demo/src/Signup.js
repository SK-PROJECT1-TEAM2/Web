import './App.css';
import {
    useState,       
    useEffect,      
    useMemo,          
    useCallback,   
    useRef,        
    useContext,
    createContext,     
} from "react";
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
      alert(`회원가입 성공: ${formData.username}, ${formData.email}`);
      navigate("/");
    };
  
    return (
        <div style={styles.outerContainer}>
          <div style={styles.boxContainer}>
            <h2>회원가입</h2>
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
                placeholder="비밀번호를 다시 입력해주세요"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <p>
                이미 계정이 있으신가요?{" "}
                <button onClick={() => navigate("/")} style={styles.linkButton}>
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
        backgroundColor: "#ffffff", 
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
      },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "#297BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    linkButton: {
      background: "none",
      color: "#007BFF",
      border: "none",
      padding: "0",
      fontSize: "16px",
      cursor: "pointer",
      textDecoration: "underline",
      textAlign: "center"
    },
  };
  
export default Signup;
