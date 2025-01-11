// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function Company() {
//   const { id } = useParams(); // URL 파라미터 :id
//   const [company, setCompany] = useState(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     // /api/companies/{id} 로 단일 회사 정보 가져오기
//     axios
//       .get(`http://localhost:8080/api/companies/${id}`)
//       .then((res) => {
//         setCompany(res.data);
//       })
//       .catch((err) => {
//         console.error("회사 상세 불러오기 오류:", err);
//         setError(true);
//       });
//   }, [id]);

//   if (error) {
//     return <div>회사를 찾을 수 없습니다.</div>;
//   }

//   if (!company) {
//     return <div>로딩 중...</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.companyName}>{company.companyName}</h2>
//       {/* 회사의 기타 정보나 게시글 목록 표시 가능 */}
//       <p>회사 번호: {company.companyNo}</p>
//       <p>생성일: {company.createdAt}</p>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//     margin: "20px auto",
//     maxWidth: "1100px",
//     width: "95%",
//     boxSizing: "border-box",
//   },
//   companyName: {
//     marginTop: "10px",
//     fontSize: "2rem",
//     marginBottom: "20px",
//     textAlign: "left",
//     marginLeft: "15px",
//     fontWeight: "bold",
//   },
// };

// export default Company;


import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

function Company() {
  const { id } = useParams(); // URL 파라미터 :id
  const location = useLocation();
  const [company, setCompany] = useState(location.state?.company || null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!company) {
      // /api/companies/{id} 로 단일 회사 정보 가져오기
      axios
        .get(`http://localhost:8080/api/companies/${id}`)
        .then((res) => {
          setCompany(res.data);
        })
        .catch((err) => {
          console.error("회사 상세 불러오기 오류:", err);
          setError(true);
        });
    }
  }, [id, company]);

  if (error) {
    return <div>회사를 찾을 수 없습니다.</div>;
  }

  if (!company) {
    return <div>로딩 중...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.companyName}>{company.companyName}</h2>
      {/* 회사의 기타 정보나 게시글 목록 표시 가능 */}
      <p>회사 번호: {company.companyNo}</p>
      <p>생성일: {company.createdAt}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "1100px",
    width: "95%",
    boxSizing: "border-box",
  },
  companyName: {
    marginTop: "10px",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "left",
    marginLeft: "15px",
    fontWeight: "bold",
  },
};

export default Company;
