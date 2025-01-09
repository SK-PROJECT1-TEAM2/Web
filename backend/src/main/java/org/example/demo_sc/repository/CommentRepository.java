package org.example.demo_sc.repository;

import org.example.demo_sc.entity.Comment;
import org.example.demo_sc.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByPost(Post post); // Post 객체를 기반으로 댓글 조회
}




