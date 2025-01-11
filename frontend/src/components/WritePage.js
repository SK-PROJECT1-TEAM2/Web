import React, { useState } from "react";
import Header from "./Header"; 

function WritePage({ isLoggedIn, onLogout }) { 
  const [company, setCompany] = useState("");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    alignment: "left",
    title: "",
    content: "",
    font: "폰트 선택",
    fontSize: "크기 선택",
  });

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
    <div>
      <Header page="writepage" selectedCompany={company} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div style={styles.container}>
        <div style={styles.toolbar}>
          <select onChange={handleCompanyChange} value={company} style={styles.select}>
            <option value="">회사명 선택</option>
            <option value="1">회사1</option>
            <option value="2">회사2</option>
            <option value="3">회사3</option>
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
    flexWrap: "wrap", // 반응형 대응
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
  // 반응형 스타일링
  "@media (max-width: 768px)": {
    container: {
      padding: "15px",
      margin: "10px",
    },
    titleInput: {
      fontSize: "18px",
    },
    textArea: {
      fontSize: "14px",
      height: "200px",
    },
    toolbar: {
      gap: "5px",
    },
    select: {
      fontSize: "14px",
    },
  },
};

export default WritePage;
