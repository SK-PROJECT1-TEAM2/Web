import React, {useState} from "react";
import Header from "./Header"; 

function WritePage({isLoggedIn, handleLogout}) { 
  const [company, setCompany] = useState("");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState ({
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
    setFormData({...formData, alignment: alignmentType});
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} page="writepage" selectedCompany={company} />
      <div style={styles.container}>
        <div style={styles.toolbar}>
          <select onChange={handleCompanyChange} value={company}>
            <option value="">회사명 선택</option>
            <option value="1">회사1</option>
            <option value="2">회사2</option>
            <option value="3">회사3</option>
          </select>
          <select onChange={handleFontChange} value={formData.font}>
            <option value="">폰트 선택</option>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
          <select onChange={handleFontSizeChange} value={formData.fontSize}>
            <option value="">크기 선택</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
          </select>
          <div>
          <button onClick={() => handleAlignmentChange("left")}>
            <i className="fas fa-align-left" style={{ fontSize: "20px" }}></i>
          </button>
          <button onClick={() => handleAlignmentChange("center")}>
            <i className="fas fa-align-center" style={{ fontSize: "20px" }}></i>
          </button>
          <button onClick={() => handleAlignmentChange("right")}>
            <i className="fas fa-align-right" style={{ fontSize: "20px" }}></i>
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
    padding: "30px 50px",
    margin: "40px 350px",
    maxWidth: "1070px",
    width: "93%",
  },
  toolbar: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    fontSize: "20px"
  },
  titleInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "30px",
  },
  textArea: {
    width: "100%",
    height: "400px",
    padding: "10px",
    marginBottom: "10px",
  },
  fileUpload: {
    marginBottom: "10px",
  },
};

export default WritePage;
