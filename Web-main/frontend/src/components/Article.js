import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyArticles = [
  {
    id: 1,
    title: "글1-1",
    content: "내용1\n\n" + 
             "이것은 긴 글 예시입니다. \n" + 
             "여러 줄로 이루어진 내용입니다.\n" + 
             "여기에는 여러 문장이 있습니다.\n" +
             "내용이 길어짐에 따라 화면의 하단으로 넘어가게 됩니다.\n\n" +
             "추가적으로 더 많은 내용이 추가될 수 있습니다.\n" +
             "이제 페이지가 내려가게 되며, 긴 내용이 어떻게 처리되는지 확인할 수 있습니다.\n",
    user: "username1",
    time: "2025-01-06 12:34",
    file: "파일1.pdf",
  },
  {
    id: 2,
    title: "글2-1",
    content: "내용2",
    user: "username2",
    time: "2025-01-06 12:33",
    file: "파일2.docx",
  },
  {
    id: 3,
    title: "글3-1",
    content: "내용3",
    user: "username3",
    time: "2025-01-06 12:32",
    file: "파일3.jpg",
  },
];

const dummyComments = [
  {
    id: 1,
    user: "commenter1",
    content: "댓글 내용 1",
    time: "2025-01-06 12:35",
  },
  {
    id: 2,
    user: "commenter2",
    content: "댓글 내용 2",
    time: "2025-01-06 12:36",
  },
  {
    id: 3,
    user: "commenter3",
    content: "댓글 내용 3",
    time: "2025-01-06 12:37",
  },
];

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(dummyComments); // 댓글 상태 추가
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 입력 상태

  useEffect(() => {
    const foundArticle = dummyArticles.find(
      (article) => article.id === parseInt(id)
    );
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      navigate("/404");
    }
  }, [id, navigate]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment) {
      const newCommentObj = {
        id: comments.length + 1,
        user: "currentUser", // 예시: 실제로는 로그인한 사용자로 변경
        content: newComment,
        time: new Date().toISOString(),
      };
      setComments([newCommentObj, ...comments]); // 새로운 댓글을 맨 앞에 추가
      setNewComment(""); // 댓글 입력란 초기화
    }
  };

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={styles.boardContainer}>
      {/* 게시글 영역*/}
      <div style={styles.main}>
        <h2 style={styles.title}>{article.title}</h2>
        <div style={styles.articleDetails}>
          <span>{article.user}</span>
          <span>{article.time}</span>
        </div>
        <div style={styles.separator}></div>
        <p style={styles.articleContent}>{article.content}</p>
        <div style={styles.footer}>
          {article.file && (
            <div style={styles.file}>첨부파일: {article.file}</div>
          )}
        </div>
      </div>

      {/* 댓글 영역 */}
      <div style={styles.reply}>
        <h1>댓글</h1>
        <div>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
            style={styles.commentInput}
          ></textarea>
          <button onClick={handleCommentSubmit} style={styles.commentButton}>
            댓글 등록
          </button>
        </div>

        {/* 댓글 리스트 */}
        <div style={styles.commentList}>
            {comments.map((comment) => (
                <div key={comment.id} style={styles.comment}>
                    <div style={styles.commentDetails}>
                        <span style={styles.commentUser}>{comment.user}</span>
                         <span style={styles.commentTime}>{comment.time}</span>
                    </div>
                    <p style={styles.commentContent}>{comment.content}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );

}

const styles = {
  boardContainer: {
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "40px auto",
    maxWidth: "900px",
    width: "100%",
    border: "1.25px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "8px", 
    boxSizing: "border-box",
    marginTop: "90px",
  },
  title: {
    textAlign: "left",
    width: "100%",
    fontSize: "34px",
    fontWeight: "700",
    marginTop: "-10px",
    marginBottom: "5px",
  },
  articleDetails: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "0.9rem",
    color: "#888",
    marginTop: "10px",
    marginTop: "5px", 
  },
  separator: {
    width: "100%",
    borderBottom: "2px solid #ddd",
    margin: "10px 0",
  },
  articleContent: {
    fontSize: "1.1rem",
    marginBottom: "20px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem",
    color: "#888",
  },
  file: {
    marginRight: "10px",
  },
  reply: {
    marginTop: "50px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    width: "100%", 
  },
  commentInput: {
    width: "100%", 
    minHeight: "80px", 
    marginBottom: "20px",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box", 
  },
  commentButton: {
    padding: "10px 20px",
    marginBottom: "50px",
    backgroundColor: "#297BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  commentList: {
    marginTop: "20px",
  },
  comment: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  commentDetails: {
      marginBottom: "5px", 
      display: "flex",
      flexDirection: "column", 
  },
  commentUser: {
      fontSize: "1rem",  
      fontWeight: "bold", 
      color: "#000", 
  },
  commentTime: {
      fontSize: "0.8rem", 
      color: "#888", 
      marginTop: "2px", 
  },
  commentContent: {
      fontSize: "1rem",  
      color: "#333",     
      lineHeight: "1.5", 
      marginTop: "10px", 
  },    
};


export default Article;
