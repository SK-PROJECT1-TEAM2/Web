import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Board() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [companyPosts, setCompanyPosts] = useState({});

  const getAllCompanies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/companies');
      const data = await response.json();
      setCompanies(data); 

      data.forEach((company) => {
        getPostsByCompany(company.companyNo);
      });
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const getPostsByCompany = async (companyNo) => {
    try {
      const response = await fetch(`http://localhost:8080/api/companies/${companyNo}/posts`);
      const data = await response.json();
      setCompanyPosts((prevPosts) => ({
        ...prevPosts,
        [companyNo]: data,
      }));
    } catch (error) {
      console.error(`Error fetching posts for company ${companyNo}:`, error);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []); 

  const handleCompanyClick = (companyNo) => {
    navigate(`/company/${companyNo}`);
  };

  const formatTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}초 전`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분 전`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}일 전`;
    }
  };

  console.log(companies)
  console.log(companyPosts)

  return (
    <div style={styles.boardContainer}>
      <h2 style={styles.heading}>전체 게시판</h2>
      {companies.map((company) => (
        <div
          key={company.companyNo}
          style={styles.companyContainer}
          onClick={() => handleCompanyClick(company.companyNo)}
        >
          <h3 style={styles.companyName}>{company.companyName}</h3>
          {companyPosts[company.companyNo] ? (
            <ul style={styles.postList}>
              {companyPosts[company.companyNo].length > 0 ? (
                companyPosts[company.companyNo].map((post) => (
                  <li key={post.postNo} style={styles.post}>
                    <div style={styles.postTitle}>{post.title}</div>
                    <div style={styles.postcontent}>{post.content}</div>
                    <div style={styles.postDetails}>
                      <span>{post.userName}</span>
                      <span>{formatTime(post.createdAt)}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li style={styles.post}>게시글이 없습니다.</li>
              )}
            </ul>
          ) : (
            <p>게시글을 불러오는 중...</p>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  boardContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    margin: "20px auto",
    maxWidth: "1100px",
    width: "95%",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "left",
    marginLeft: "15px",
    marginTop: "50px",
    fontSize: "1.8rem",
    marginBottom: "50px",
  },
  companyContainer: {
    cursor: "pointer",
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "3px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  companyName: {
    marginBottom: "15px",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "black",
    borderBottom: "2px solid #f0f0f0",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  postList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
  },
  post: {
    width: "95%",
    marginBottom: "10px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "3px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  postTitle: {
    marginBottom: "15px",
    fontWeight: "bold",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  postcontent: {
    marginBottom: "15px",
    fontSize: "0.95rem",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif",
  },
  postDetails: { 
    fontSize: "0.75rem",
    color: "#555",
    display: "flex",
    gap: "10px",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
};

export default Board;
