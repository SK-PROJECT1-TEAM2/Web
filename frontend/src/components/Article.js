import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Article() {
  const { id } = useParams(); // URL 예: /Articles/75 → id = "75"
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [companyPosts, setCompanyPosts] = useState({});
  const [comments, setComments] = useState([]); // 초기 상태를 빈 배열로 설정
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null);     // 에러 상태 추가

  // 모든 회사 정보 + 해당 회사의 게시글들 가져오기
  useEffect(() => {
    getAllCompanies();
    fetchComments(id); // 댓글 데이터 가져오기
  }, [id]);

  const getAllCompanies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/companies");
      if (!response.ok) throw new Error(`Failed to fetch companies: ${response.statusText}`);
      const data = await response.json();
      setCompanies(data);

      // 각 회사별로 '모든 게시글'을 가져와서 companyPosts에 저장
      data.forEach((company) => {
        getPostsByCompany(company.companyNo);
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("회사를 불러오는 데 실패했습니다.");
      setLoading(false);
    }
  };

  const getPostsByCompany = async (companyNo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/companies/${companyNo}/all_posts`
      );
      if (!response.ok) throw new Error(`Failed to fetch posts for company ${companyNo}: ${response.statusText}`);
      const data = await response.json();
      setCompanyPosts((prev) => ({
        ...prev,
        [companyNo]: data,
      }));
    } catch (error) {
      console.error(`Error fetching posts for company ${companyNo}:`, error);
      setError("게시글을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  // 댓글 데이터 가져오기
  const fetchComments = async (id) => { 
    try { 
      const response = await fetch(`http://localhost:8080/api/articles/${id}/comments`); 
      if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`); 
      const data = await response.json(); 
      
      // 댓글을 시간의 역순으로 정렬 (최신 댓글이 먼저)
      const sortedComments = [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
      
      setComments(sortedComments); 
      console.log("Comments:", sortedComments); // 댓글 상태 업데이트 및 데이터 확인
    } catch (error) { 
      console.error(`Error fetching comments: ${error}`);
      setError("댓글을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

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

  console.log("Article Object:", article); // 추가된 로그
  console.log("Company Posts:", companyPosts);

  // 댓글 제출 핸들러 수정: 백엔드와 연동하여 댓글을 추가
  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      alert("댓글을 입력하세요.");
      return;
    }

    try {
      const token = localStorage.getItem('token'); // JWT 사용 시
      const response = await fetch(`http://localhost:8080/api/articles/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // JWT 포함
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!response.ok) throw new Error(`Failed to submit comment: ${response.statusText}`);

      const newCommentData = await response.json();
      setComments([newCommentData, ...comments]); // 새로운 댓글을 리스트의 맨 앞에 추가
      setNewComment("");
    } catch (error) {
      console.error(`Error submitting comment: ${error}`);
      alert("댓글을 등록하는 중 오류가 발생했습니다.");
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
          {loading ? (
            <div>댓글을 불러오는 중...</div>
          ) : error ? (
            <div>{error}</div>
          ) : comments.length === 0 ? (
            <div>댓글이 없습니다.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} style={styles.comment}>
                <p>{comment.comment}</p>
                <div style={styles.commentDetails}>
                  <span>{comment.username}</span>
                  <span>{formatTime(comment.time)}</span>
                </div>
              </div>
            ))
          )}
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
    paddingTop: "0px",
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
    marginBottom: "10px",
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
    paddingTop: "0",
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