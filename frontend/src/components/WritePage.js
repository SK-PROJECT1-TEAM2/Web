// import React, { useState, useEffect } from "react";
// import Header from "./Header"; 
// import axios from "axios"; // Axios 사용

// function WritePage({ isLoggedIn, onLogout }) { 
//   const [company, setCompany] = useState("");
//   const [companies, setCompanies] = useState([]); // 회사 목록 저장
//   const [file, setFile] = useState(null);
//   const [formData, setFormData] = useState({
//     alignment: "left",
//     title: "",
//     content: "",
//     font: "폰트 선택",
//     fontSize: "크기 선택",
//   });

//   useEffect(() => {
//     // 백엔드에서 회사 목록 가져오기
//     axios
//       .get("http://localhost:8080/api/companies") // 백엔드 API URL
//       .then((response) => {
//         if (Array.isArray(response.data)) {
//           setCompanies(response.data); // 데이터 설정
//         } else {
//           console.error("응답 데이터가 배열이 아닙니다:", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("회사 목록을 불러오는 중 오류 발생:", error);
//       });
//   }, []);

//   const handleCompanyChange = (e) => {
//     setCompany(e.target.value);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFontChange = (e) => {
//     setFormData({ ...formData, font: e.target.value });
//   };

//   const handleFontSizeChange = (e) => {
//     setFormData({ ...formData, fontSize: e.target.value });
//   };

//   const handleAlignmentChange = (alignmentType) => {
//     setFormData({ ...formData, alignment: alignmentType });
//   };

//   return (
//     <div>
//       <Header page="writepage" selectedCompany={company} isLoggedIn={isLoggedIn} onLogout={onLogout} />
//       <div style={styles.container}>
//         <div style={styles.toolbar}>
//           {/* 회사명 선택 드롭다운 */}
//           <select onChange={handleCompanyChange} value={company} style={styles.select}>
//             <option value="">회사명 선택</option>
//             {companies.map((c) => (
//               <option key={c.companyNo} value={c.companyNo}>
//                 {c.companyName}
//               </option>
//             ))}
//           </select>
//           <select onChange={handleFontChange} value={formData.font} style={styles.select}>
//             <option value="">폰트 선택</option>
//             <option value="Arial">Arial</option>
//             <option value="Verdana">Verdana</option>
//             <option value="Times New Roman">Times New Roman</option>
//           </select>
//           <select onChange={handleFontSizeChange} value={formData.fontSize} style={styles.select}>
//             <option value="">크기 선택</option>
//             <option value="12px">12px</option>
//             <option value="14px">14px</option>
//             <option value="16px">16px</option>
//             <option value="18px">18px</option>
//           </select>
//           <div style={styles.alignmentButtons}>
//             <button onClick={() => handleAlignmentChange("left")} style={styles.button}>
//               <i className="fas fa-align-left" style={styles.icon}></i>
//             </button>
//             <button onClick={() => handleAlignmentChange("center")} style={styles.button}>
//               <i className="fas fa-align-center" style={styles.icon}></i>
//             </button>
//             <button onClick={() => handleAlignmentChange("right")} style={styles.button}>
//               <i className="fas fa-align-right" style={styles.icon}></i>
//             </button>
//           </div>
//         </div>

//         <input
//           type="text"
//           name="title"
//           placeholder="제목을 입력하세요."
//           style={styles.titleInput}
//           onChange={handleChange}
//           value={formData.title}
//         />
//         <textarea
//           name="content"
//           placeholder="내용을 입력하세요."
//           style={{
//             ...styles.textArea,
//             textAlign: formData.alignment,
//             fontFamily: formData.font,
//             fontSize: formData.fontSize,
//           }}
//           onChange={handleChange}
//           value={formData.content}
//         ></textarea>
//         <div style={styles.fileUpload}>
//           <p>파일 첨부</p>
//           <input 
//             type="file" 
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//     margin: "20px auto",
//     maxWidth: "900px",
//     width: "95%",
//     boxSizing: "border-box",
//   },
//   toolbar: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   select: {
//     padding: "5px",
//     fontSize: "16px",
//   },
//   alignmentButtons: {
//     display: "flex",
//     gap: "5px",
//   },
//   button: {
//     background: "#f0f0f0",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     padding: "5px 10px",
//     cursor: "pointer",
//   },
//   icon: {
//     fontSize: "20px",
//   },
//   titleInput: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "20px",
//     fontSize: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   textArea: {
//     width: "100%",
//     height: "500px",
//     padding: "10px",
//     fontSize: "16px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     resize: "vertical",
//   },
//   fileUpload: {
//     marginTop: "10px",
//     marginLeft: "10px",
//   },
// };

// export default WritePage;

import React, { useState, useEffect } from "react";
import Header from "./Header"; 

function WritePage({ isLoggedIn, onLogout }) {
  const [userInfo, setUserInfo] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const [company, setCompany] = useState(""); // 선택된 회사 상태 추가
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    alignment: "left",
    title: "",
    content: "",
    font: "폰트 선택",
    fontSize: "크기 선택",
  });

  // 사용자 정보 가져오기 (user_no)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/mypage", {
          method: "GET",
          credentials: "include", // 세션 쿠키 포함
        });
        if (!response.ok) {
          throw new Error("사용자 정보를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error(error.message);
        window.location.href = "/login"; // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };
    fetchUserInfo();
  }, []); // 초기 렌더링 시 한 번만 호출


  // 회사 목록 가져오기
  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/companies");
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        } else {
          console.error("회사 목록을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    getAllCompanies();
  }, []); // 초기 렌더링 시 한 번만 호출


  // userInfo와 companies가 변경될 때마다 로그 찍기
  // 디버깅용
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo); // userInfo가 업데이트된 후에만 찍기
    }
  }, [userInfo]);

  useEffect(() => {
    if (companies.length > 0) {
      console.log(companies); // companies가 업데이트된 후에만 찍기
    }
  }, [companies]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

    const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFontChange = (e) => {
    setFormData({ ...formData, font: e.target.value });
  };

  const handleFontSizeChange = (e) => {
    setFormData({ ...formData, fontSize: e.target.value });
  };

  const handleAlignmentChange = (alignmentType) => {
    setFormData({ ...formData, alignment: alignmentType });
  };

  const handleSubmit = async () => {
    const fileBase64 = file ? await convertFileToBase64(file) : null;
  
    const data = {
      title: formData.title,
      companyNo: company.companyNo,
      content: formData.content,
      file: fileBase64,  // Base64로 인코딩된 파일
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/articles/postRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      
  
      if (response.ok) {
        alert("글이 등록되었습니다!");
      } else {
        console.error("글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버와의 통신 중 오류가 발생했습니다.", error);
    }
    console.log(data);
  };
  
  // 파일을 Base64로 변환하는 함수
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]);  // Data URL에서 Base64 부분만 추출
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);  // 파일을 Base64로 변환
    });
  };

  return (
    <div>
      <Header 
        page="writepage" selectedCompany={company} 
        isLoggedIn={isLoggedIn} onLogout={onLogout}
        onSubmit={handleSubmit} 
      />
      <div style={styles.container}>
        <div style={styles.toolbar}>
          {/* 회사명 선택 드롭다운 */}
          <select onChange={handleCompanyChange} value={company} style={styles.select}>
            <option value="">회사명 선택</option>
            {companies.map((c) => (
              <option key={c.companyNo} value={c.companyNo}>
                {c.companyName}
              </option>
            ))}
          </select>
          <select onChange={handleFontChange} value={formData.font} style={styles.select}>
            <option value="">폰트 선택</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
          <select onChange={handleFontSizeChange} value={formData.fontSize} style={styles.select}>
            <option value="">크기 선택</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
          </select>
          <div style={styles.alignmentButtons}>
            <button onClick={() => handleAlignmentChange("left")} style={styles.button}>
              <i className="fas fa-align-left" style={styles.icon}></i>
            </button>
            <button onClick={() => handleAlignmentChange("center")} style={styles.button}>
              <i className="fas fa-align-center" style={styles.icon}></i>
            </button>
            <button onClick={() => handleAlignmentChange("right")} style={styles.button}>
              <i className="fas fa-align-right" style={styles.icon}></i>
            </button>
          </div>
        </div>

        <input
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
          style={styles.titleInput}
          onChange={handleChange}
          value={formData.title}
        />
        <textarea
          name="content"
          placeholder="내용을 입력하세요."
          style={{
            ...styles.textArea,
            textAlign: formData.alignment,
            fontFamily: formData.font,
            fontSize: formData.fontSize,
          }}
          onChange={handleChange}
          value={formData.content}
        ></textarea>
        <div style={styles.fileUpload}>
          <p>파일 첨부</p>
          <input 
            type="file" 
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "900px",
    width: "95%",
    boxSizing: "border-box",
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  select: {
    padding: "5px",
    fontSize: "16px",
  },
  alignmentButtons: {
    display: "flex",
    gap: "5px",
  },
  button: {
    background: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  icon: {
    fontSize: "20px",
  },
  titleInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textArea: {
    width: "100%",
    height: "500px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical",
  },
  fileUpload: {
    marginTop: "10px",
    marginLeft: "10px",
  },
};
export default WritePage;