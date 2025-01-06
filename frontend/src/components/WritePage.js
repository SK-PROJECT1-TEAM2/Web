import React, {useState} from "react";
import Header from "./Header"; 

function WritePage() { 
  const [company, setCompany] = useState("");
  const [alignment, setAlignment] = useState("left");

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleAlignmentChange = (alignmentType) => {
    setAlignment(alignmentType); 
  };

  return (
    <div>
      <Header page="writepage" selectedCompany={company} />
      <div style={styles.container}>
        <div style={styles.toolbar}>
          <select onChange={handleCompanyChange} value={company}>
            <option value="">회사명 선택</option>
            <option value="1">회사1</option>
            <option value="2">회사2</option>
            <option value="3">회사3</option>
          </select>
          <select>
            <option>폰트 선택</option>
            <option>Arial</option>
            <option>Verdana</option>
          </select>
          <select>
            <option>폰트 크기</option>
            <option>12px</option>
            <option>14px</option>
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
          placeholder="제목을 입력하세요."
          style={styles.titleInput}
        />
        <textarea
          placeholder="내용을 입력하세요."
          style={{ ...styles.textArea, textAlign: alignment }}
        ></textarea>

        <div style={styles.fileUpload}>
          <p>파일 첨부</p>
          <input 
            type="file" 
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
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default WritePage;
