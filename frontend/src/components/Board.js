// 게시판 구성

import React from "react";
import PostList from "./PostList";

// 추후 벡엔드와 연결하여 동적으로 데이터를 받아옴
const companies = [
    { name: "회사1", posts: [{ title: "글1", time: "12:34", user: "username1" }, { title: "글2", time: "12:33", user: "username2" }, { title: "글3", time: "12:32", user: "username3" }] },
    { name: "회사2", posts: [{ title: "글1", time: "12:34", user: "username1" }, { title: "글2", time: "12:33", user: "username2" }, { title: "글3", time: "12:32", user: "username3" }] },
    { name: "회사3", posts: [{ title: "글1", time: "12:34", user: "username1" }, { title: "글2", time: "12:33", user: "username2" }, { title: "글3", time: "12:32", user: "username3" }] },
];

function Board() {
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
    },
  };
  
  export default Board;