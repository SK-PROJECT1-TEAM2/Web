import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Board() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [companyPosts, setCompanyPosts] = useState({}); // 각 회사에 대한 게시글을 저장할 객체

  const getAllCompanies = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/companies');
      const data = await response.json();
      setCompanies(data); // 상태 업데이트
      // 각 회사의 게시글을 가져오기
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
        [companyNo]: data, // companyNo를 키로, 해당 회사의 게시글 데이터를 값으로 추가
      }));
    } catch (error) {
      console.error(`Error fetching posts for company ${companyNo}:`, error);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 호출

  const handleCompanyClick = (companyNo) => {
    navigate(`/company/${companyNo}`); // 클릭한 회사로 이동
  };

  console.log(companies)
  console.log(companyPosts)

  return (
    <div style={styles.boardContainer}>
      <h2 style={styles.heading}>게시판</h2>
      {companies.map((company) => (
        <div
          key={company.companyNo}
          style={styles.companyContainer}
          onClick={() => handleCompanyClick(company.companyNo)} // 회사 클릭 시 이동
        >
          <h3 style={styles.companyName}>{company.companyName}</h3>
          {/* 해당 회사의 게시글을 출력 */}
          {companyPosts[company.companyNo] ? (
            <ul style={styles.postList}>
              {companyPosts[company.companyNo].length > 0 ? (
                companyPosts[company.companyNo].map((post) => (
                  <li key={post.postNo} style={styles.post}>
                    <div style={styles.postTitle}>{post.title}</div>
                    <div style={styles.postTitle}>{post.content}</div>
                    <div style={styles.postDetails}>
                      <span>{post.createdAt}</span>
                      <span>{post.userName}</span>
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
    fontSize: "2rem",
    marginBottom: "50px",
  },
  companyContainer: {
    cursor: "pointer",
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
  companyName: {
    marginBottom: "5px",
    marginLeft: "30px",
    marginTop: "15px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "black",
    borderBottom: "2px solid #f0f0f0",
    marginRight: "30px",
  },
  postList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  post: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
  },
  postTitle: {
    marginLeft: "18px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  postDetails: { 
    color: "#555",
    display: "flex",
    gap: "10px",
    marginRight: "38px",
  },
};

export default Board;
