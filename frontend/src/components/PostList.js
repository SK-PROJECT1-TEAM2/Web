import React from "react";

function PostList({ company }) {
  return (
    <div style={styles.container}>
      <h3 style={{ borderBottom: "1px solid black", paddingBottom: "5px" }}>
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
    padding: "5px 0",
  },
  postTitle: {
    flex: 1, // title을 왼쪽에 배치하고 나머지 공간을 차지
  },
  postDetails: {
    display: "flex",
    gap: "10px", // time과 user 간의 간격
  },
  postTime: {
    marginRight: "30px", // time을 왼쪽으로 밀기
  },
};

export default PostList;
