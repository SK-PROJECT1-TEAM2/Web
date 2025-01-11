import React from "react";

function PostList({ company }) {
  return (
    <div style={styles.container}>
      {/* 회사 이름 */}
      <h3 style={styles.companyName}>{company.companyName}</h3>
      <ul style={styles.postList}>
        {/* 글 목록 */}
        {company.posts.map((post) => (
          <li key={post.postNo} style={styles.post}>
            <div style={styles.postTitle}>{post.title}</div>
            <div style={styles.postDetails}>
              <span>{post.createdAt}</span>
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
  companyName: {
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
    paddingBottom: "5px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  postList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  post: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #f0f0f0",
    padding: "10px 0",
  },
  postTitle: { fontWeight: "bold" },
  postDetails: { color: "#555" },
};

export default PostList;