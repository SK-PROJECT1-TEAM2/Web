import React from "react";

function WritePage() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>글쓰기 창</h2>
      <div style={styles.editor}>
        <div style={styles.toolbar}>
          <select>
            <option>회사명 선택</option>
            <option>회사1</option>
            <option>회사2</option>
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
            <button>B</button>
            <button>I</button>
            <button>U</button>
          </div>
        </div>
        <input
          type="text"
          placeholder="제목을 입력하세요."
          style={styles.titleInput}
        />
        <textarea
          placeholder="내용을 입력하세요."
          style={styles.textArea}
        ></textarea>
        <div style={styles.fileUpload}>
          <p>파일 첨부</p>
          <input type="file" />
        </div>
        <button style={styles.submitButton}>공유하기</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    border: "1px solid #ddd",
  },
  title: {
    textAlign: "center",
  },
  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  titleInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
  },
  textArea: {
    width: "100%",
    height: "200px",
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
