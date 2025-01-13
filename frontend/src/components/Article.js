import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ※ dummyArticles는 제거(또는 주석)하고, 이제 companyPosts로부터 게시글을 찾을 예정
// const dummyArticles = [ ... ];

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
  const { id } = useParams();       // URL 예: /Articles/75 → id = "75"
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [companyPosts, setCompanyPosts] = useState({});
  
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState("");

  // 모든 회사 정보 + 해당 회사의 게시글들 가져오기
  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/companies");
      const data = await response.json();
      setCompanies(data);

      // 각 회사별로 '모든 게시글'을 가져와서 companyPosts에 저장
      data.forEach((company) => {
        getPostsByCompany(company.companyNo);
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const getPostsByCompany = async (companyNo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/companies/${companyNo}/all_posts`
      );
      const data = await response.json();
      setCompanyPosts((prev) => ({
        ...prev,
        [companyNo]: data,
      }));
    } catch (error) {
      console.error(`Error fetching posts for company ${companyNo}:`, error);
    }
  };

  // companyPosts 갱신 시, 그 중에서 postNo가 URL의 :id와 같은 게시글을 찾는다
  useEffect(() => {
    // companyPosts 구조: { [companyNo]: [ { postNo, title, content, ...}, ... ], ... }
    let foundPost = null;

    // 모든 회사의 게시글 배열을 뒤져서 postNo === parseInt(id) 인 것 찾기
    Object.values(companyPosts).forEach((posts) => {
      if (!foundPost) {
        const match = posts.find((p) => p.postNo === parseInt(id));
        if (match) {
          foundPost = match;
        }
      }
    });

    // 찾았다면 setArticle, 못 찾으면 null
    if (foundPost) {
      setArticle(foundPost);
    } else {
      setArticle(null);
    }
  }, [companyPosts, id]);

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment) {
      const newCommentObj = {
        id: comments.length + 1,
        user: "currentUser",
        content: newComment,
        time: new Date().toISOString(),
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  
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
    <div style={styles.container}>
      {/* 게시글 내용 */}
      <div style={styles.main}>
        <h2 style={styles.articleTitle}>{article.title}</h2>
        <p style={styles.articleContent}>{article.content}</p>
        <div style={styles.footer}>
          {/* 
              서버에서 첨부파일 정보를 어떻게 넘기느냐에 따라 파일 필드가 다를 수 있음
              예: article.filePath, article.attachments[0]?.fileName 등 
          */}
          {article.filePath && (
            <div style={styles.file}>첨부파일: {article.filePath}</div>
          )}
          <div style={styles.details}>
            <span>{article.userName || "작성자"}</span>
            <span>{formatTime(article.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div style={styles.reply}>
        <h2>댓글</h2>
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
              <p>{comment.content}</p>
              <div style={styles.commentDetails}>
                <span>{comment.user}</span>
                <span>{comment.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 50px",
    margin: "40px auto",
    maxWidth: "1080px",
    width: "93%",
  },
  main: {
    position: "relative",
    paddingBottom: "30px",
    borderBottom: "3px solid #ddd",
  },
  articleTitle: {
    marginTop:"0",
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "30px",
    marginLeft: "10px",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  articleContent: {
    fontSize: "1.1rem",
    marginBottom: "30px",
    marginLeft: "10px",
    whiteSpace: "pre-line", // 여러 줄 content 시 줄바꿈 보이도록
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  footer: {
    fontSize: "0.9rem",
    color: "#888",
  },
  file: {
    marginRight: "10px",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "10px",
    marginRight: "10px",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  reply: {
    marginTop: "50px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  commentInput: {
    width: "98.5%",
    height: "70px",
    marginBottom: "20px",
    paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  commentButton: {
    padding: "10px 20px",
    marginBottom: "50px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
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
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  commentDetails: {
    marginTop: "10px",
    fontSize: "0.8rem",
    color: "#888",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Roboto, 'Noto Sans KR', sans-serif", 
  },
  "@media (max-width: 768px)": {
    container: {
      padding: "20px",
      margin: "20px auto",
      width: "90%",
    },
    articleTitle: {
      fontSize: "1.5rem",
    },
    articleContent: {
      fontSize: "1rem",
    },
    details: {
      flexDirection: "column",
      gap: "10px",
    },
  },
};

export default Article;