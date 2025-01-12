import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios 사용

function WritePage() {
  const [company, setCompany] = useState("");
  const [companies, setCompanies] = useState([]); // 회사 목록 저장
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    alignment: "left",
    title: "",
    content: "",
    font: "폰트 선택",
    fontSize: "크기 선택",
  });

  useEffect(() => {
    // 백엔드에서 회사 목록 가져오기
    axios
      .get("http://localhost:8080/api/companies") // 백엔드 API URL
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCompanies(response.data); // 데이터 설정
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", response.data);
        }
      })
      .catch((error) => {
        console.error("회사 목록을 불러오는 중 오류 발생:", error);
      });
  }, []);


  // 제출 버튼 클릭 시 실행
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) FormData 객체 생성
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("companyNo", company);

    // 파일이 있으면 추가
    if (file) {
      formDataToSend.append("file", file);
    }

    console.log(formDataToSend);

    // 2) Axios POST 요청
    axios
      .post("http://localhost:8080/api/articles/post", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      })
      .then((res) => {
        console.log("글 작성 성공:", res.data);
        // 글 작성 후 이동하거나, 알림 띄우는 등 처리
        // 예) window.location.href = "/board"; 
      })
      .catch((err) => {
        console.error("글 작성 오류:", err);
      });
  };

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

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
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
            <button type="button" onClick={() => handleAlignmentChange("left")} style={styles.button}>
              <i className="fas fa-align-left" style={styles.icon}></i>
            </button>
            <button type="button" onClick={() => handleAlignmentChange("center")} style={styles.button}>
              <i className="fas fa-align-center" style={styles.icon}></i>
            </button>
            <button type="button" onClick={() => handleAlignmentChange("right")} style={styles.button}>
              <i className="fas fa-align-right" style={styles.icon}></i>
            </button>
          </div>
          {/* 제출 버튼 */}
            <button type="submit" style={styles.submitButton}>
            글 등록
            </button>
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

        
      </form>
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
  submitButton: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "170px",
  },
};

export default WritePage;