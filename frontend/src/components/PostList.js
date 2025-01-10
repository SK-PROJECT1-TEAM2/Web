import React from "react";
import { useNavigate } from "react-router-dom";

function PostList({ company }) {
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate(`/company/${company.id}`);
  };

  return (
    <div style={styles.container}>
      <h3
        style={styles.companyName}
        onClick={handleCompanyClick}
      >
        {company.name}
      </h3>
      <div style={styles.postsContainer}>
        {company.posts.map((post, index) => (
          <div key={index} style={styles.post}>
            <div style={styles.postTitle}>
              <span>{post.title}</span>
            </div>
            <div style={styles.postDetails}>
              <span>{post.user}</span>
              <span style={styles.postTime}>{post.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    margin: "40px auto",
    maxWidth: "900px",
    width: "100%",
    border: "1.25px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    boxSizing: "border-box",
    marginTop: "90px",
  },
  companyName: {
    textAlign: "left",
    width: "100%",
    fontSize: "34px",
    fontWeight: "700",
    marginTop: "-5px",
    marginBottom: "30px",
    cursor: "pointer",
    borderBottom: "1px solid black",
    paddingBottom: "5px",
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  post: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  postTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "-1px",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },
  postDetails: {
    fontSize: "0.9rem",
    color: "#888",
    display: "flex",
    justifyContent: "space-between",
  },
  postTime: {
    fontStyle: "italic",
  },
};

export default PostList;
