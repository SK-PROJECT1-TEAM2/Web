package org.example.demo_sc.service;

import org.example.demo_sc.dto.CommentDto;
import org.example.demo_sc.entity.Comment; // Comment 클래스 임포트 추가
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.entity.User;
import org.example.demo_sc.repository.CommentRepository;
import org.example.demo_sc.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    // 특정 게시글의 댓글 목록 조회 (DTO 반환)
    public List<CommentDto> getCommentsByPostId(Integer postId) {
        // 게시글 조회
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));

        // 댓글 목록 조회 후 DTO로 변환하여 반환
        return commentRepository.findAllByPost(post).stream()
                .map(CommentDto::new) // CommentDto의 생성자 사용
                .collect(Collectors.toList());
    }

    // 댓글 추가
    public void addComment(Integer postId, User user, String content) {
        // 게시글 조회
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with ID: " + postId));

        // 댓글 생성
        Comment comment = new Comment(null, post, user, content, LocalDateTime.now(), null);

        // 댓글 저장
        commentRepository.save(comment);
    }
}