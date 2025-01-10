import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 더미 데이터
const dummyCompanies = [
  {
    id: 1,
    name: "회사1",
    posts: [
      { title: "글1-1", content: "내용1", user: "username1", time: "2025-01-06 12:34" },
      { title: "글2-1", content: "내용2", user: "username2", time: "2025-01-06 12:33" },
      { title: "글3-1", content: "내용3", user: "username3", time: "2025-01-06 12:32" },
    ],
  },
  {
    id: 2,
    name: "회사2",
    posts: [
      { title: "글1-2", content: "내용1", user: "username1", time: "2025-01-06 12:34" },
      { title: "글2-2", content: "내용2", user: "username2", time: "2025-01-06 12:33" },
      { title: "글3-2", content: "내용3", user: "username3", time: "2025-01-06 12:32" },
    ],
  },
  {
    id: 3,
    name: "회사3",
    posts: [
      { title: "글1-3", content: "내용1", user: "username1", time: "2025-01-06 12:34" },
      { title: "글2-3", content: "내용2", user: "username2", time: "2025-01-06 12:33" },
      { title: "글3-3", content: "내용3", user: "username3", time: "2025-01-06 12:32" },
    ],
  },
];

function Company() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    const foundCompany = dummyCompanies.find((company) => company.id === parseInt(id));
    if (foundCompany) {
      setCompany(foundCompany);
    } else {
      navigate("/404");
    }
  }, [id, navigate]);

  if (!company) {
    return <div>회사를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.companyName}>{company.name}</h2>
      <div style={styles.postsContainer}>
        {company.posts
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .map((post, index) => (
            <div 
              key={index} 
              style={styles.post}
              onClick={() => navigate(`/articles/${index}`)}  
            >
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postContent}>{post.content}</p>
              <div style={styles.postDetails}>
                <span style={styles.postUser}>{post.user}</span>
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
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  post: {
      padding: "0", 
      border: "none", 
      borderRadius: "0", 
      backgroundColor: "transparent", 
    },
  postTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "-1px",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
  },
  postContent: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  postDetails: {
    fontSize: "0.9rem",
    color: "#888",
    display: "flex",
    justifyContent: "space-between",
  },
  postUser: {
    fontWeight: "500",
  },
  postTime: {
    fontStyle: "italic",
  },
};

export default Company;