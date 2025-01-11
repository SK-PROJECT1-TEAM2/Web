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
      <div>
        {company.posts
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .map((post, index) => (
            <div
              key={index}
              style={styles.post}
              onClick={() => navigate(`/Articles/${index}`)}
            >
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postContent}>{post.content}</p>
              <div style={styles.postDetails}>
                <span>{post.user}</span>
                <span>{post.time}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 50px",
    margin: "40px auto",
    maxWidth: "1100px",
    width: "90%",
    boxSizing: "border-box",
  },
  companyName: {
    fontSize: "2rem",
    marginBottom: "30px",
    textAlign: "left",
    marginLeft: "15px",
    fontWeight: "bold",
  },
  post: {
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  postTitle: {
    marginLeft: "15px",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  postContent: {
    marginLeft: "30px",
    fontSize: "1rem",
    color: "#555",
  },
  postDetails: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    color: "#888",
    margin: "15px"
  },
  // 반응형 스타일링
  "@media (max-width: 768px)": {
    container: {
      padding: "20px",
      margin: "20px auto",
      width: "95%",
    },
    companyName: {
      fontSize: "2rem",
    },
    post: {
      padding: "10px",
    },
    postTitle: {
      fontSize: "1rem",
    },
    postContent: {
      fontSize: "0.9rem",
    },
    postDetails: {
      fontSize: "0.8rem",
    },
  },
};

export default Company;
