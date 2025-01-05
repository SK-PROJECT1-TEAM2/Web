// 게시판 구성

import React, {useState, useEffect} from "react";
// import axios from "axios";
import PostList from "./PostList";

// 추후 벡엔드와 연결하여 동적으로 데이터를 받아옴
// useEffect, useState 훅 사용
// axios 라이브러리를 통한 통신
const companies = [
    { name: "회사1", posts: [{ title: "글1", time: "12:34", user: "username1" }, { title: "글2", time: "12:33", user: "username2" }, { title: "글3", time: "12:32", user: "username3" }] },
    { name: "회사2", posts: [{ title: "글1", time: "12:34", user: "username1" }, { title: "글2", time: "12:33", user: "username2" }, { title: "글3", time: "12:32", user: "username3" }] },
    { name: "회사3", posts: [{ title: "글1", time: "12:34", user: "username1" }, { title: "글2", time: "12:33", user: "username2" }, { title: "글3", time: "12:32", user: "username3" }] },
];

function Board() {
    /*
      const [companies, setCompanies] = useState([]);
      useEffect(() => {
        // 백엔드 호출
        axios.get("/api/companies")  
          .then((response) => {
            // 최신 글 3개 호출
            const recentThree = response.data.map((company) => ({
              ...company,
              posts: company.posts
                  .sort((a, b) => new Date(b.time) - new Date(a.time))
                  .slice(0, 3),              
            }));
            setCompanies(recentThree);
          })
          .catch((error) => {
            console.log("데이터 호출 오류 : ", error);
          });
      }, []);

    */

    return (
      <div style={styles.boardContainer}>
        <h2>게시판</h2>
        {companies.map((company, index) => (
          <PostList key={index} company={company} />
        ))}
      </div>
    );
  }

const styles = {
  boardContainer:{
      padding: "30px 50px",
      margin: "40px 350px",
      maxWidth: "1100px",
      width: "100%", 
  },
};

export default Board;