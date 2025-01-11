// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PostList from "./PostList";

// function Board() {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/companies")
//       .then((response) => {
//         console.log("받아온 데이터:", response.data);

//         if (Array.isArray(response.data)) {
//           const transformed = response.data.map((company) => ({
//             companyNo: company.companyNo,
//             companyName: company.companyName,
//             posts: company.posts?.map((post) => ({
//               postNo: post.postNo,
//               title: post.title || "제목 없음",
//               createdAt: post.createdAt || "날짜 없음",
//               user: post.user?.email || "작성자 없음",
//             })) || [],
//           }));

//           setCompanies(transformed);
//         } else {
//           console.error("응답 데이터가 배열이 아닙니다:", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("데이터 호출 오류:", error);
//       });
//   }, []);

//   if (!companies.length) {
//     return <div>데이터를 불러오는 중입니다...</div>;
//   }

//   return (
//     <div style={styles.boardContainer}>
//       <h2 style={styles.heading}>게시판</h2>
//       {companies.map((company) => (
//         <PostList key={company.companyNo} company={company} />
//       ))}
//     </div>
//   );
// }

// const styles = {
//   boardContainer: {
//     padding: "30px 20px",
//     margin: "20px auto",
//     maxWidth: "1100px",
//     width: "95%",
//     boxSizing: "border-box",
//   },
//   heading: {
//     textAlign: "center",
//     fontSize: "2rem",
//     marginBottom: "20px",
//   },
//   // 반응형 스타일링 추가
//   "@media (max-width: 768px)": {
//     boardContainer: {
//       padding: "20px 15px",
//       margin: "10px auto",
//       width: "100%",
//     },
//     heading: {
//       fontSize: "1.5rem",
//     },
//   },
// };

// export default Board;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostList from "./PostList";

function Board() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate(); // useNavigate 추가

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/companies")
      .then((response) => {
        console.log("받아온 데이터:", response.data);

        if (Array.isArray(response.data)) {
          const transformed = response.data.map((company) => ({
            companyNo: company.companyNo,
            companyName: company.companyName,
            posts: company.posts?.map((post) => ({
              postNo: post.postNo,
              title: post.title || "제목 없음",
              createdAt: post.createdAt || "날짜 없음",
              user: post.user?.email || "작성자 없음",
            })) || [],
          }));

          setCompanies(transformed);
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", response.data);
        }
      })
      .catch((error) => {
        console.error("데이터 호출 오류:", error);
      });
  }, []);

  if (!companies.length) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const handleCompanyClick = (companyNo) => {
    navigate(`/Company/${companyNo}`); // 클릭한 회사로 이동
  };

  return (
    <div style={styles.boardContainer}>
      <h2 style={styles.heading}>게시판</h2>
      {companies.map((company) => (
        <div
          key={company.companyNo}
          style={styles.companyContainer}
          onClick={() => handleCompanyClick(company.companyNo)} // 회사 클릭 시 이동
        >
          {/* <h3 style={styles.companyName}>{company.companyName}</h3> */}
          <PostList company={company} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  boardContainer: {
    padding: "30px 20px",
    margin: "20px auto",
    maxWidth: "1100px",
    width: "95%",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "left",
    marginLeft: "15px",
    fontSize: "2rem",
    marginBottom: "20px",
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
    marginBottom: "10px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#007bff",
    textDecoration: "underline",
  },
  // 반응형 스타일링 추가
  "@media (max-width: 768px)": {
    boardContainer: {
      padding: "20px 15px",
      margin: "10px auto",
      width: "100%",
    },
    heading: {
      fontSize: "1.5rem",
    },
    companyName: {
      fontSize: "1.2rem",
    },
  },
};

export default Board;
