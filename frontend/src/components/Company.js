import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function Company() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [companies, setCompanies] = useState([]);
  const [companyPosts, setCompanyPosts] = useState({});

  useEffect(() => {
    getAllCompanies();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 호출


  const getAllCompanies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/companies');
      const data = await response.json();
      setCompanies(data); // 상태 업데이트
      
      data.forEach((company) => {
        getPostsByCompany(company.companyNo);
      });
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const getPostsByCompany = async (companyNo) => {
    try {
      const response = await fetch(`http://localhost:8080/api/companies/${companyNo}/all_posts`);
      const data = await response.json();
      console.log("response", response);
      setCompanyPosts((prevPosts) => ({
        ...prevPosts,
        [companyNo]: data,
      }));
    } catch (error) {
      console.error(`Error fetching posts for company ${companyNo}:`, error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/Articles/${postId}`); // 게시글 ID를 URL에 포함하여 이동
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

  return (
    <div style={styles.boardContainer}>
      {companies
        .filter((company) => String(company.companyNo) === String(id)) 
        .map((company) => {
          return (
            <div key={company.companyNo} style={styles.companyContainer}>
              <h3 style={styles.companyName}>{company.companyName}</h3>
              {companyPosts[company.companyNo] ? (
                <ul style={styles.postList}>
                  {companyPosts[company.companyNo].length > 0 ? (
                    companyPosts[company.companyNo].map((post) => (
                      <li
                        key={post.postNo}
                        style={styles.post}
                        onClick={() => handlePostClick(post.postNo)} // 게시글 클릭 시 ID 포함 이동
                      >
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
          );
        })}
    </div>
  );
}

const styles = {
  companyContainer: {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "1100px",
    width: "95%",
    boxSizing: "border-box",
  },
  companyName: {
    marginTop: "15px",
    fontSize: "1.8rem",
    marginBottom: "50px",
    textAlign: "left",
    marginLeft: "15px",
    fontWeight: "bold",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  postList: {
    border: "1px solid #ddd",
    listStyleType: "none", 
    padding: "15px",
    margin: 0,
  },
  post: {
    marginBottom: "10px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "3px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  postTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "15px",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  postcontent: {
    fontSize: "0.95rem",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif",
    marginBottom: "15px",
  },
  postDetails: {
    marginTop: "10px",
    fontSize: "0.75rem",
    color: "#888",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
};

export default Company;
