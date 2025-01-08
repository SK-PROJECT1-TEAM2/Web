import React from "react";
import { useNavigate } from "react-router-dom";

function PostList({ company }) {
  const navigate = useNavigate();

  const handleCompanyClick = () => {
    navigate(`/company/${company.id}`);
  };

  return (
    <div style={styles.container}>
      <h3 style={{ borderBottom: "1px solid black", paddingBottom: "5px" }} onClick={handleCompanyClick} >
        {company.name}</h3>
      <ul>
        {company.posts.map((post, index) => (
        <li key={index} style={styles.post}>
        <div style={styles.postTitle}><span>{post.title}</span></div>
        <div style={styles.postDetails}>
          <span style={styles.postTime}>{post.time}</span> 
          <span>{post.user}</span>
        </div>
      </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { marginBottom: "20px" },
  post: {
    display: "flex",
    padding: "7px 0",
  },
  postTitle: {
    flex: 1, 
    marginLeft : "-40px",
  },
  postDetails: {
    display: "flex",
    gap: "10px",
  },
  postTime: {
    marginRight: "30px",
  },
};

export default PostList;